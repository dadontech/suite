import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const MODELS = ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash'];
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

type PromptType = 'image-prompt' | 'video-queries';
interface RequestBody {
  type: PromptType;
  context: string;
}
interface ImagePromptResponse { prompt: string; }
interface VideoQueriesResponse { queries: string; }

async function generateWithRetry(
  model: GenerativeModel,
  prompt: string,
  retries = MAX_RETRIES
): Promise<string> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      const isQuotaError =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        (error.status === 429 || error.status === 503);
      if (isQuotaError && attempt < retries - 1) {
        const delay = INITIAL_DELAY * Math.pow(2, attempt);
        console.log(`⚠️ Model busy (attempt ${attempt + 1}), retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('All retries failed');
}

export async function POST(req: Request) {
  try {
    console.log('📥 Received request at /api/ai-prompt');
    const { type, context } = (await req.json()) as RequestBody;
    if (!type || !context) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError: unknown = null;
    const prompt = type === 'image-prompt'
      ? `Generate a concise, vivid image generation prompt (max 20 words) for a marketing funnel image block with this context: "${context}". Return only the prompt, nothing else.`
      : `Generate 3 specific YouTube search queries to find a great marketing/tutorial video for: "${context}". Return as a numbered list, nothing else.`;

    for (const modelName of MODELS) {
      console.log(`🤖 Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      try {
        const text = await generateWithRetry(model, prompt);
        const cleanText = text.trim();
        if (type === 'image-prompt') {
          return NextResponse.json({ prompt: cleanText } as ImagePromptResponse);
        } else {
          return NextResponse.json({ queries: cleanText } as VideoQueriesResponse);
        }
      } catch (error: unknown) {
        console.error(`❌ Model ${modelName} failed:`, error);
        lastError = error;
      }
    }
    const errorMessage = lastError instanceof Error ? lastError.message : 'Unknown error';
    return NextResponse.json({ error: 'AI prompt generation failed: ' + errorMessage }, { status: 500 });
  } catch (error: unknown) {
    console.error('❌ Fatal error in /api/ai-prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}