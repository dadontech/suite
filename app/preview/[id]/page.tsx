"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Campaign {
  id: string;
  keyword: string;
  contentType: string;
  generatedContent?: {
    titles: string[];
    metaDescription: string;
    article: string;
    socialSnippets: any[];
  };
  productInfo?: {
    title?: string;
    description?: string;
    price?: string;
    currency?: string;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
  };
  funnelType: string;
  createdAt: string;
}

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/campaigns/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Campaign not found');
        return res.json();
      })
      .then(data => {
        setCampaign(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-[#6B5E5E]/50">Loading preview...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-[#6B5E5E]/50">Content not found</div>
      </div>
    );
  }

  const title = campaign.generatedContent?.titles?.[0] || campaign.productInfo?.title || campaign.keyword;
  const article = campaign.generatedContent?.article || "<p>No content generated yet.</p>";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose prose-lg prose-slate max-w-none">
          <h1 className="text-3xl font-bold text-[#6B5E5E] mb-4">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: article }} />
        </article>
      </div>
    </div>
  );
}