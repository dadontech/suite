import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BLUEPRINTS } from "./blueprints";
import {
  PAGE_STYLES,
  OPENING_STRATEGIES,
  SOCIAL_PROOF_STRATEGIES,
  CTA_STRATEGIES,
} from "./randomization";
import { LAYOUT_PERSONALITIES } from "./personalities";
import { pickImage } from "./image-pools";
import {
  detectNiche,
  pickRandom,
  selectPalette,
  generateWithRetry,
} from "./helpers";
import { PAGE_GOALS } from "./page-goals";
import { getPageInstructions } from "./page-instructions";
import { ProductInfo } from "./types";

// ─── Type definitions ────────────────────────────────────────────────────────

interface VideoData {
  title?: string;
  videoUrl?: string;
  embedUrl?: string;
  searchQuery?: string;
  searchUrl?: string;
}

interface Block {
  type: string;
  imageUrl?: string;
  [key: string]: unknown;
}

interface GeneratedPage {
  id?: string;
  label?: string;
  icon?: string;
  bg?: string;
  blocks?: Block[];
}

interface GeneratedFunnel {
  pages?: GeneratedPage[];
  emails?: unknown[];
  video?: VideoData;
}

const MODELS = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"];
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

// ─── Helper to validate a YouTube video via oEmbed ──────────────────────────
async function validateYouTubeVideo(url: string) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title,
      author: data.author_name,
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { funnelType, generatedContent, originalLink, productInfo } =
      (await req.json()) as {
        funnelType: string;
        generatedContent: { article: string; titles?: string[] };
        originalLink: string;
        productInfo?: ProductInfo;
      };

    if (!funnelType || !generatedContent?.article) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );

    const blueprint = BLUEPRINTS[funnelType] ?? BLUEPRINTS["Comparison Funnel"];
    const productTitle = generatedContent.titles?.[0] ?? "this product";
    const articleExcerpt = generatedContent.article.substring(0, 2000);
    const niche = detectNiche(productTitle);

    const seed = Math.floor(Date.now() / 1000) % 9973;
    const palette = selectPalette(funnelType, productTitle, seed);

    const personality =
      LAYOUT_PERSONALITIES[seed % LAYOUT_PERSONALITIES.length];

    const pageSignals = blueprint.pages.map((page, i) => {
      const pageSeed = (seed + i * 127 + 31) % 9973;
      return {
        ...page,
        style: pickRandom(PAGE_STYLES, pageSeed),
        opening: pickRandom(
          OPENING_STRATEGIES,
          (pageSeed + 17) % OPENING_STRATEGIES.length,
        ),
        socialProof: pickRandom(
          SOCIAL_PROOF_STRATEGIES,
          (pageSeed + 41) % SOCIAL_PROOF_STRATEGIES.length,
        ),
        ctaStrategy: pickRandom(
          CTA_STRATEGIES,
          (pageSeed + 67) % CTA_STRATEGIES.length,
        ),
        minBlocks: ["review-article", "blog"].includes(page.id)
          ? 18
          : [
                "vsl-optin",
                "bridge-optin",
                "quiz-optin",
                "flash-order",
                "flash-thankyou",
              ].includes(page.id)
            ? 6
            : ["vsl-watch", "flash-deal"].includes(page.id)
              ? 7
              : 9 + (pageSeed % 3),
        maxBlocks: ["review-article", "blog"].includes(page.id)
          ? 26
          : ["vsl-optin", "bridge-optin", "quiz-optin"].includes(page.id)
            ? 9
            : [
                  "flash-order",
                  "flash-thankyou",
                  "vsl-watch",
                  "flash-deal",
                ].includes(page.id)
              ? 11
              : 14 + (pageSeed % 3),
        heroVariant: personality.heroVariant,
        testimonialVariant: personality.testimonialVariant,
        featuresVariant: personality.featuresVariant,
        statsVariant: personality.statsVariant,
        buttonVariant: personality.buttonVariant,
        optinVariant: personality.optinVariant,
        articleVariant: personality.articleVariant,
        pullQuoteVariant: personality.pullQuoteVariant,
        personalityName: personality.name,
        visualMood: personality.visualMood,
        structureBias: personality.structureBias,
        blockOrderBias: personality.blockOrderBias,
      };
    });

    console.log(
      `Seed: ${seed} | Funnel: ${funnelType} | Palette: ${palette.name} | Niche: ${niche} | Personality: ${personality.name}`,
    );
    console.log(
      "Page styles:",
      pageSignals.map((p) => `${p.id}:${p.style}`).join(", "),
    );

    const textPrompt = `
You are a world-class conversion copywriter and landing page architect.
You MUST create completely unique, creative layouts every time — never repeat the same block order.

PRODUCT: "${productTitle}"
AFFILIATE LINK: ${originalLink}
FUNNEL TYPE: ${funnelType}
NICHE: ${niche}

═══════════════════════════════════════════════════════════════
LAYOUT PERSONALITY FOR THIS ENTIRE FUNNEL: ${personality.name}
VISUAL MOOD: ${personality.visualMood}
═══════════════════════════════════════════════════════════════

ARTICLE CONTEXT:
"""
${articleExcerpt}
"""

════════════════════════════════════════════════════════════════
ABSOLUTE WRITING RULES — NEVER BREAK THESE:
════════════════════════════════════════════════════════════════
1. ZERO EMOJI anywhere in the entire output — not in headlines, bullets, badges, or body.
2. NO exclamation marks. Write with authority and confidence.
3. Bullets: plain text, start with capital letter, no symbols at the start.
4. Badges: plain text only — "Secure Checkout" not "Secure Checkout ✓".
5. proItems / conItems: plain text, no tick marks or crosses.
6. Paragraph <p> tags: maximum 3 sentences each. One idea per paragraph.
7. Headlines: benefit-specific and confident. Never generic filler.
8. Stats: specific plausible numbers — "47,283" not "50,000+".
9. FAQ items EXACTLY: "Q: Full question | A: Full answer"
10. Every word must be specific to "${productTitle}" — no placeholder copy.

════════════════════════════════════════════════════════════════
AVAILABLE BLOCK TYPES — you may use any of these:
════════════════════════════════════════════════════════════════
CRITICAL: Every block that supports a "variant" field MUST include it exactly as specified
in each page's VARIANT FIELD INSTRUCTIONS. This controls visual rendering — omitting it
means the page looks generic. Always include "variant" on the blocks listed below.

• "image"             aspectRatio("21/9" or "16/9"), alt(descriptive text), imageUrl:""(leave empty)
• "hero"              headline, subheadline, badge(no emoji), cta, ctaLink, variant("centered"|"dark"|"split"|"minimal"|"magazine")
• "hero-dark"         eyebrow(ALL CAPS), headline, subheadline, body, cta, ctaLink, stats:[{value,label}]
• "attention-bar"     headline(one punchy sentence)
• "article"           headline, subheadline, author, authorTitle(e.g."March 2026 · 9 min read"), eyebrow, variant("classic"|"nyt"|"magazine"|"dark"|"minimal")
• "paragraph"         body(HTML: <p> max 3 sentences, <strong>, <h2> sub-sections, <ul><li>)
• "dropcap-paragraph" body(plain text — first character auto-becomes a large dropcap. Use as the OPENING paragraph of any blog/bridge page for maximum authority)
• "pull-quote"        body(one powerful pulled sentence from body copy), author(optional attribution), variant("accent"|"dark"|"minimal")
• "table-of-contents" headline("Table of Contents"), items[](5–8 section title strings)
• "author-bio"        author(full name), authorTitle(title/credentials), body(2–3 sentence bio)
• "article-verdict"   headline("Our Final Rating"), body(verdict summary 2 sentences), score(number 8.5–9.8 as JSON number not string)
• "article-end"       headline("Did This Review Help You?"), body(closing share-prompt line)
• "headline"          headline
• "subheading"        headline
• "bullets"           headline(optional), items[](plain text, capital start, no symbols)
• "comparison"        headline, subheadline, leftTitle, rightTitle, proItems[](5), conItems[](5)
• "features"          headline, subheadline, columns[{icon,title,body}](3 cols, icon:zap/target/users/award/clock/trending/heart/lightbulb/shield/check), variant("cards"|"list"|"numbered"|"dark")
• "stats"             stats[{value,label}](exactly 4, specific numbers), variant("dark"|"light"|"inline")
• "testimonial"       body(the quote), author, authorTitle
• "testimonial-grid"  headline, testimonials[{quote,author,title,stars}](exactly 3), variant("cards"|"dark"|"quotes"|"featured")
• "stars"             rating(4.7-5.0), ratingCount(e.g."2,847 verified reviews"), body(one sentence)
• "callout"           headline, body
• "guarantee"         headline, body
• "countdown"         headline, minutes(integer 15-45)
• "faq"               headline, items[]("Q: Full question | A: Full answer")
• "badge"             items[](plain text only)
• "button"            cta(no emoji), ctaLink("#" everywhere except final checkout buttons which use "${originalLink}"), subheadline(trust line), variant("primary"|"wide"|"ghost")
• "optin-form"        headline, subheadline, cta(button label), body(micro-trust line), badge(banner text), items[](3 bullet benefits), eyebrow(optional), variant("split"|"centered"|"dark")
• "video"             headline, body
• "divider"           (no fields)
• "spacer"            (no fields)

════════════════════════════════════════════════════════════════
BUILD ${blueprint.pages.length} PAGES — CREATIVE BRIEF PER PAGE:
════════════════════════════════════════════════════════════════

${pageSignals
  .map(
    (page) => `
─────────────────────────────────────────────────────────────
PAGE: "${page.label}" (id: "${page.id}")
Goal: ${PAGE_GOALS[page.id] || "Convert visitors to the next step."}
Page background: "${palette.bg}"
─────────────────────────────────────────────────────────────
LAYOUT PERSONALITY: ${page.personalityName}
VISUAL MOOD: ${page.visualMood}
STRUCTURE BIAS: ${page.structureBias}
SUGGESTED BLOCK ORDER (adapt freely but honour the spirit): ${page.blockOrderBias}

CREATIVE STYLE: ${page.style}
OPENING STRATEGY: ${page.opening}
SOCIAL PROOF STRATEGY: ${page.socialProof}
CTA STRATEGY: ${page.ctaStrategy}

BLOCK COUNT: Use between ${page.minBlocks} and ${page.maxBlocks} blocks total.

VARIANT FIELD INSTRUCTIONS — YOU MUST add "variant" to these block types:
• Any "hero" block → "variant": "${page.heroVariant}"
• Any "article" block → "variant": "${page.articleVariant}"
• Any "pull-quote" block → "variant": "${page.pullQuoteVariant}"
• Any "testimonial-grid" block → "variant": "${page.testimonialVariant}"
• Any "features" block → "variant": "${page.featuresVariant}"
• Any "stats" block → "variant": "${page.statsVariant}"
• Any "button" block → "variant": "${page.buttonVariant}"
• Any "optin-form" block → "variant": "${page.optinVariant}"

REQUIREMENTS FOR THIS PAGE:
${getPageInstructions(page.id, originalLink, productTitle)}
`,
  )
  .join("\n")}

════════════════════════════════════════════════════════════════
ALSO GENERATE:
════════════════════════════════════════════════════════════════
Emails: ${blueprint.emailCount} follow-up emails. Each: subject(no emoji), timing(Day 1/2/3/5/7), bodyPreview(1-2 specific sentences).

VIDEO: ${
      funnelType === "webinar" || funnelType === "vsl"
        ? `Provide ONLY a REAL, EXISTING YouTube video that is currently playable.

STRICT RULES:
- The video MUST exist and be publicly accessible
- The video MUST be a real published video (not guessed)
- Prefer videos with the highest views
- DO NOT fabricate or invent video IDs
- DO NOT return broken or unavailable videos

The URL MUST be in one of these formats:
- https://www.youtube.com/watch?v=XXXXXXXXXXX
- https://youtu.be/XXXXXXXXXXX

If you are not 100% sure the video exists, return this exact fallback:
https://www.youtube.com/watch?v=dQw4w9WgXcQ

Return:
- title: The real video title
- videoUrl: The exact YouTube watch URL`
        : `Suggest a YouTube search query that would find a relevant video for promoting this product. Return:
- title: A suggested video title
- searchQuery: A precise YouTube search query (e.g., "${productTitle} review 2026")`
    }

════════════════════════════════════════════════════════════════
OUTPUT: Return ONLY valid JSON. NO markdown fences. NO commentary before or after.
════════════════════════════════════════════════════════════════
{
  "pages": [
    {
      "id": "page-id-here",
      "label": "Page Label Here",
      "icon": "fileText",
      "bg": "${palette.bg}",
      "blocks": [
        { "type": "image", "imageUrl": "", "aspectRatio": "21/9", "alt": "descriptive alt text" },
        ... all blocks in the creative order YOU decide based on the brief above
      ]
    }
  ],
  "emails": [{ "subject": "...", "timing": "Day 1", "bodyPreview": "..." }],
  "video": {
    "title": "...",
    ${funnelType === "webinar" || funnelType === "vsl" ? '"videoUrl": "https://www.youtube.com/watch?v=XXXXX"' : '"searchQuery": "..."'}
  }
}
`;

    const genAI = new GoogleGenerativeAI(apiKey);
    let funnelJson: GeneratedFunnel | null = null;
    let lastError: unknown = null;

    for (const modelName of MODELS) {
      console.log(`Text: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      try {
        const text = await generateWithRetry(model, textPrompt);
        const cleaned = text
          .replace(/```json\s*/gi, "")
          .replace(/```\s*/g, "")
          .trim();
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("No JSON");
        const parsed = JSON.parse(match[0]) as GeneratedFunnel;
        if (!Array.isArray(parsed.pages) || !parsed.pages.length)
          throw new Error("No pages");
        funnelJson = parsed;
        break;
      } catch (e) {
        console.error(`${modelName}:`, e instanceof Error ? e.message : e);
        lastError = e;
      }
    }

    if (!funnelJson) {
      return NextResponse.json(
        {
          error:
            "Generation failed: " +
            (lastError instanceof Error ? lastError.message : "unknown"),
        },
        { status: 500 },
      );
    }

    // Merge blueprint metadata
    const pages = funnelJson.pages!.map((p, i) => ({
      ...blueprint.pages[i],
      ...p,
      id: p.id || blueprint.pages[i]?.id || `page-${i}`,
      bg: p.bg || palette.bg,
    }));

    // ─── Process video object – REAL VALIDATION SYSTEM ──────────────────────
    const video = funnelJson.video;

    if (video) {
      if (funnelType === "webinar" || funnelType === "vsl") {
        let validUrl = false;

        if (video.videoUrl) {
          const isFormatValid =
            /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/.test(
              video.videoUrl
            );

          if (isFormatValid) {
            const validation = await validateYouTubeVideo(video.videoUrl);

            if (validation) {
              validUrl = true;

              let embedUrl = video.videoUrl;

              if (embedUrl.includes("youtube.com/watch?v=")) {
                const videoId = embedUrl.split("v=")[1]?.split("&")[0];
                if (videoId) {
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              } else if (embedUrl.includes("youtu.be/")) {
                const videoId = embedUrl.split("youtu.be/")[1]?.split("?")[0];
                if (videoId) {
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              }

              video.embedUrl = embedUrl;

              // ✅ Use REAL YouTube title
              video.title = validation.title;
            }
          }
        }

        // 🔥 SMART FALLBACK (NO FAKE VIDEO)
        if (!validUrl) {
          const searchQuery = `${productTitle} review`;

          video.videoUrl = undefined;
          video.embedUrl = undefined;
          video.searchQuery = searchQuery;
          video.searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            searchQuery
          )}`;

          video.title = `Watch ${productTitle} Training`;
        }

        console.log(
          validUrl
            ? `Valid video: ${video.title}`
            : `Fallback search used: ${video.searchQuery}`
        );
      } else {
        if (video.searchQuery) {
          video.searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            video.searchQuery
          )}`;
        }
      }
    }

    // Use real product images
    const productImages =
      productInfo?.imageUrls ||
      (productInfo?.imageUrl ? [productInfo.imageUrl] : []);
    let imageIndex = 0;

    console.log(
      `Generating images for ${pages.length} pages using ${productImages.length} real product images...`,
    );

    const imageResults = await Promise.all(
      pages.map(async (page, i) => {
        const pageId = page.id as string;
        const imgSeed = (seed + i * 179 + 53) % 9973;
        let url: string | null = null;

        if (productImages.length > 0) {
          url = productImages[imageIndex % productImages.length];
          imageIndex++;
        } else {
          url = pickImage(pageId, funnelType, niche, imgSeed);
        }
        return { pageId, url: url || "" };
      }),
    );

    const imageMap = new Map(imageResults.map((r) => [r.pageId, r.url]));

    let extraImageCounter = 0;
    const enrichedPages = pages.map((page, pi) => {
      const primary = imageMap.get(page.id as string) ?? null;
      extraImageCounter = 0;
      const blocks = (page.blocks || []).map((block) => {
        if (block.type === "image" && !block.imageUrl) {
          let url: string | null = null;
          if (extraImageCounter === 0 && primary) {
            url = primary;
          } else if (productImages.length > 0) {
            url =
              productImages[
                (imageIndex + extraImageCounter) % productImages.length
              ];
          } else {
            const extraSeed = (seed + pi * 179 + extraImageCounter * 37) % 9973;
            url = pickImage(page.id as string, funnelType, niche, extraSeed);
          }
          extraImageCounter++;
          return { ...block, imageUrl: url || "" };
        }
        return block;
      });
      return { ...page, blocks };
    });

    const steps = enrichedPages.flatMap((p) =>
      (p.blocks || []).map((b) => ({ ...b, label: p.label, sublabel: p.id })),
    );

    return NextResponse.json({
      pages: enrichedPages,
      emails: funnelJson.emails || [],
      video: video || null,
      palette,
      steps,
    });
  } catch (e: unknown) {
    console.error("Fatal error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 },
    );
  }
}