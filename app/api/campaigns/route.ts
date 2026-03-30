// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";   // ← NextAuth v5 correct import

export async function POST(req: Request) {
  try {
    const session = await auth();   // ← v5 way

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const campaign = await prisma.campaign.create({
      data: {
        link: body.link,
        keyword: body.keyword,
        tone: body.tone || "Professional",
        wordCount: body.wordCount || "1,500 words",
        contentType: body.contentType || "Product Review",
        funnelType: body.funnelType || "bridge",
        userId: session.user.id,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("[CAMPAIGN_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json([], { status: 401 }); 
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(campaigns); 
  } catch (error) {
    console.error("[CAMPAIGN_FETCH_ERROR]", error);
    return NextResponse.json([], { status: 500 }); 
  }
}