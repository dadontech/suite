import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Models to try in order of capability (most advanced first)
const MODELS = ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash'];
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second
const CURRENT_YEAR = "2026"; // ← Force current year

// Type definitions for the expected content structure
interface SocialSnippet {
  platform: 'Twitter/X' | 'LinkedIn' | 'Facebook';
  content: string;
}

interface GeneratedContent {
  titles: string[];
  metaDescription: string;
  article: string;
  socialSnippets: SocialSnippet[];
}

interface ProductInfo {
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  benefits?: string[];
  summary?: string;
}

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
      // Check if it's a quota/rate limit error
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
    console.log('📥 Received request at /api/generate-content');
    const { keyword, tone, wordCount, contentType, productInfo } = await req.json();
    console.log('Request body:', { keyword, tone, wordCount, contentType, productInfo });

    if (!keyword || !tone || !wordCount || !contentType) {
      console.error('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key' },
        { status: 500 }
      );
    }

    // Build product context if productInfo is provided
    let productContext = '';
    if (productInfo) {
      productContext = `
Product Information:
- Title: ${productInfo.title || 'N/A'}
- Description: ${productInfo.description || 'N/A'}
- Key Features: ${Array.isArray(productInfo.features) ? productInfo.features.join(', ') : 'N/A'}
- Benefits: ${Array.isArray(productInfo.benefits) ? productInfo.benefits.join(', ') : 'N/A'}
- Price: ${productInfo.price || 'N/A'} ${productInfo.currency || ''}
- Rating: ${productInfo.rating || 'N/A'} (${productInfo.reviewCount || 'N/A'} reviews)
- Summary: ${productInfo.summary || 'N/A'}

The article must accurately represent this product, using its actual features and benefits. Do NOT use generic information that doesn't match the product.
`;
    } else {
      productContext = `Focus on the primary keyword: "${keyword}".`;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError: unknown = null;

    // Try each model in order
    for (const modelName of MODELS) {
      console.log(`🤖 Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      try {
        const prompt = `
You are a world‑class copywriter and SEO expert. Generate a high‑converting, detailed ${contentType} article for the product described below.

CURRENT YEAR: ${CURRENT_YEAR}

All writing must reflect ${CURRENT_YEAR}:
- No outdated references
- No past-year comparisons
- Use latest strategies, tools, and data

${productContext}

Tone: ${tone}
Length: approximately ${wordCount}

The article must be structured to drive affiliate sales. Include:
- An irresistible H1 headline different from the primary keyword.
- Subheadings (H2, H3) that guide the reader.
- Bullet points or numbered lists for benefits/features.
- A powerful call‑to‑action at the end.

Additionally, provide:
1. Five SEO‑optimized title variations (as a JSON array).
2. A compelling meta description (max 160 characters).
3. Three social media snippets (Twitter/X, LinkedIn, Facebook) ready to post.

Output **only a valid JSON object** with exactly this structure:
{
  "titles": ["title 1", "title 2", "title 3", "title 4", "title 5"],
  "metaDescription": "string",
  "article": "full article with Headline, paragraph, etc.",
  "socialSnippets": [
    { "platform": "Twitter/X", "content": "string" },
    { "platform": "LinkedIn", "content": "string" },
    { "platform": "Facebook", "content": "string" }
  ]
}
Do not include any other text or markdown.
        `;

        console.log('📤 Sending request to Gemini...');
        const text = await generateWithRetry(model, prompt);
        console.log('📥 Received response, length:', text.length);

        // Extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        const content = JSON.parse(jsonMatch[0]) as unknown;

        // Validate required fields
        if (
          !content ||
          typeof content !== 'object' ||
          !('titles' in content) ||
          !Array.isArray(content.titles) ||
          !('metaDescription' in content) ||
          typeof content.metaDescription !== 'string' ||
          !('article' in content) ||
          typeof content.article !== 'string' ||
          !('socialSnippets' in content) ||
          !Array.isArray(content.socialSnippets)
        ) {
          throw new Error('Missing or invalid required fields in JSON');
        }

        console.log('✅ JSON parsed successfully');
        return NextResponse.json(content);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Model ${modelName} failed:`, errorMessage);
        lastError = error;
        // Continue to next model
      }
    }

    // All models failed
    console.error('All models failed');
    const errorMessage = lastError instanceof Error ? lastError.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Content generation failed: ' + errorMessage },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error('❌ Fatal error in /api/generate-content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}