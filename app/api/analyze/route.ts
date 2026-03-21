import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define the expected structure from Gemini
interface GeminiProductInfo {
  title?: string;
  description?: string;
  price?: string | null;
  currency?: string | null;
  imageUrl?: string | null;           // main image
  imageUrls?: string[];                // additional product images
  rating?: number | null;
  reviewCount?: number | null;
  features?: string[];
  benefits?: string[];
  summary?: string | null;
}

export async function POST(req: Request) {
  try {
    const { link } = await req.json();
    if (!link) {
      return NextResponse.json({ error: 'Link is required' }, { status: 400 });
    }

    // 1. Fetch the HTML
    const { data } = await axios.get(link, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000,
    });
    const $ = cheerio.load(data);

    // 2. Basic meta information
    const title = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || '';
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';
    const h1 = $('h1').first().text().trim();

    // 3. Clean visible text for AI (remove scripts, styles, nav, footer)
    $('script, style, nav, footer, header').remove();
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 5000);

    // 4. Optionally scrape additional images from the page (simple heuristic)
    const scrapedImages: string[] = [];
    $('img[src*="product"], img[class*="product"], .gallery img, [data-image]').each((_, el) => {
      const src = $(el).attr('src');
      if (src && src.startsWith('http') && !scrapedImages.includes(src)) {
        scrapedImages.push(src);
      }
    });

    // 5. Use Gemini to extract rich product info (including multiple images)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // fallback if no API key
      return NextResponse.json({
        title: title || h1,
        description,
        imageUrl: ogImage,
        imageUrls: scrapedImages.length ? scrapedImages : [ogImage].filter(Boolean),
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are an expert at extracting product information from web page content.
Given the following text extracted from a product page, provide a structured JSON object.

Text content:
"""
${bodyText}
"""

Output a valid JSON object with:
{
  "title": "string",
  "description": "string (1-2 sentences)",
  "price": "string (e.g., '$49.99')",
  "currency": "string (USD, EUR, etc.)",
  "imageUrl": "string (main product image URL)",
  "imageUrls": ["string", ...] (max 5, additional product image URLs from the page),
  "rating": number (0-5),
  "reviewCount": number,
  "features": ["string", ...] (max 10),
  "benefits": ["string", ...] (max 10),
  "summary": "string (2-3 sentences about what the product does)"
}
Use null or [] if not available. Only output the JSON.
    `;

    let geminiInfo: GeminiProductInfo = {};
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as GeminiProductInfo;
        geminiInfo = {
          ...parsed,
          features: parsed.features || [],
          benefits: parsed.benefits || [],
          imageUrls: parsed.imageUrls || [],
        };
      }
    } catch (aiError) {
      console.error('Gemini extraction failed:', aiError);
    }

    // 6. Merge AI data with basic meta + scraped images
    const finalInfo = {
      title: geminiInfo.title || title || h1,
      description: geminiInfo.description || description,
      price: geminiInfo.price || null,
      currency: geminiInfo.currency || null,
      imageUrl: geminiInfo.imageUrl || ogImage,
      // Use AI imageUrls if available; otherwise scraped; otherwise single image as array
      imageUrls: geminiInfo.imageUrls && geminiInfo.imageUrls.length
        ? geminiInfo.imageUrls
        : scrapedImages.length
        ? scrapedImages.slice(0, 5)
        : (geminiInfo.imageUrl ? [geminiInfo.imageUrl] : []),
      rating: geminiInfo.rating || null,
      reviewCount: geminiInfo.reviewCount || null,
      features: geminiInfo.features || [],
      benefits: geminiInfo.benefits || [],
      summary: geminiInfo.summary || null,
    };

    return NextResponse.json(finalInfo);
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: 'Failed to analyze link' }, { status: 500 });
  }
}