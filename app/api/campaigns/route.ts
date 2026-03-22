// app/api/campaigns/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// --- Types (match frontend) ---
interface ProductInfo {
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  [key: string]: unknown;
}

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

interface FunnelStep {
  label: string;
  sublabel: string;
  headline?: string;
  body?: string;
  cta?: string;
  ctaLink?: string;
  type?: string;
}

interface EmailStep {
  subject: string;
  timing: string;
  purpose?: string;
  bodyPreview?: string;
}

interface VideoSuggestion {
  title: string;
  searchQuery: string;
  url?: string;
}

interface Campaign {
  id: string;
  link: string;
  keyword: string;
  tone: string;
  wordCount: string;
  contentType: string;
  funnelType: string;
  productInfo?: ProductInfo;
  generatedContent?: GeneratedContent | null;
  funnelSteps?: FunnelStep[];
  funnelEmails?: EmailStep[];
  funnelVideo?: VideoSuggestion | null;
  createdAt: string;
}

// Path to the JSON file (in project root)
const CAMPAIGNS_FILE = path.join(process.cwd(), 'campaigns.json');

async function readCampaigns(): Promise<Campaign[]> {
  try {
    const data = await fs.readFile(CAMPAIGNS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return []; // file doesn't exist or empty
  }
}

async function writeCampaigns(campaigns: Campaign[]) {
  await fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received campaign payload:', body); // log for debugging

    // Basic validation
    if (!body.link || !body.keyword) {
      return NextResponse.json(
        { error: 'Missing required fields: link and keyword' },
        { status: 400 }
      );
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      link: body.link,
      keyword: body.keyword,
      tone: body.tone || 'Professional',
      wordCount: body.wordCount || '1,500 words',
      contentType: body.contentType || 'Product Review',
      funnelType: body.funnelType || 'bridge',
      productInfo: body.productInfo,
      generatedContent: body.generatedContent,
      funnelSteps: body.funnelSteps,
      funnelEmails: body.funnelEmails,
      funnelVideo: body.funnelVideo,
      createdAt: new Date().toISOString(),
    };

    const campaigns = await readCampaigns();
    campaigns.unshift(newCampaign);
    await writeCampaigns(campaigns);

    return NextResponse.json({
      id: newCampaign.id,
      message: 'Campaign created successfully',
    });
  } catch (error: unknown) {
    console.error('Campaign creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const campaigns = await readCampaigns();
    return NextResponse.json(campaigns);
  } catch (error: unknown) {
    console.error('Campaign reading error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}