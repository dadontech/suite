import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // if using Prisma

// Define the shape of product information from the analyze API
interface ProductInfo {
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  [key: string]: unknown; // allow additional fields
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

interface CampaignRequestBody {
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
}

export async function POST(req: Request) {
  try {
    // 1. Parse and validate request body
    const body = (await req.json()) as CampaignRequestBody;

    // Basic required fields check
    if (!body.link || !body.keyword) {
      return NextResponse.json(
        { error: 'Missing required fields: link and keyword are required' },
        { status: 400 }
      );
    }

    // 2. (Optional) Add authentication here if needed
    // Example with NextAuth:
    // const session = await getServerSession();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // 3. Save to database (example with Prisma, replace with your ORM)
    // const campaign = await prisma.campaign.create({
    //   data: {
    //     link: body.link,
    //     keyword: body.keyword,
    //     tone: body.tone,
    //     wordCount: body.wordCount,
    //     contentType: body.contentType,
    //     funnelType: body.funnelType,
    //     productInfo: body.productInfo,
    //     generatedContent: body.generatedContent,
    //     funnelSteps: body.funnelSteps,
    //     funnelEmails: body.funnelEmails,
    //     funnelVideo: body.funnelVideo,
    //     // userId: session.user.id, // link to authenticated user if needed
    //   },
    // });

    // 4. Mock response (remove when using real DB)
    const mockCampaignId = `camp_${Date.now()}`;

    return NextResponse.json({
      id: mockCampaignId,
      message: 'Campaign created successfully',
    });
  } catch (error: unknown) {
    console.error('Campaign creation error:', error);

    // Type-safe error message extraction
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}