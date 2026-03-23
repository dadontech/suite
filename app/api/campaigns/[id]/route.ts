import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

// ─── Types (copy from the main route for consistency) ───────────────────────
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

// ─── File path (same as main route) ─────────────────────────────────────────
const CAMPAIGNS_FILE = path.join(process.cwd(), 'campaigns.json');

async function readCampaigns(): Promise<Campaign[]> {
  try {
    const data = await fs.readFile(CAMPAIGNS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCampaigns(campaigns: Campaign[]) {
  await fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2));
}

// ─── GET /api/campaigns/[id] ────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Missing campaign ID" }, { status: 400 });
    }

    const campaigns = await readCampaigns();
    const campaign = campaigns.find(c => c.id === id);

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("GET /api/campaigns/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/campaigns/[id] ─────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Missing campaign ID" }, { status: 400 });
    }

    let campaigns = await readCampaigns();
    const existing = campaigns.find(c => c.id === id);

    if (!existing) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    campaigns = campaigns.filter(c => c.id !== id);
    await writeCampaigns(campaigns);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/campaigns/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/campaigns/[id] ──────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const id = params?.id;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing campaign ID" }, { status: 400 });
    }

    const campaigns = await readCampaigns();
    const index = campaigns.findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Merge the existing campaign with the updates (partial)
    campaigns[index] = { ...campaigns[index], ...body };
    await writeCampaigns(campaigns);

    return NextResponse.json(campaigns[index]);
  } catch (error) {
    console.error("PATCH /api/campaigns/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}