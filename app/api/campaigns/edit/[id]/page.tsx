"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for the data shape
interface GeneratedContent {
  article: string;
  titles: string[];
  metaDescription: string;
}

interface Campaign {
  id: string;
  keyword: string;
  contentType: string;
  funnelType: string;
  generatedContent: GeneratedContent;
}

interface FormData {
  keyword: string;
  contentType: string;
  funnelType: string;
  generatedContent: GeneratedContent;
}

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    keyword: "",
    contentType: "",
    funnelType: "",
    generatedContent: { article: "", titles: [], metaDescription: "" }
  });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/campaigns/${id}`)
      .then(res => res.json())
      .then((data: Campaign) => {  // Explicitly type the fetched data
        setCampaign(data);
        setFormData({
          keyword: data.keyword,
          contentType: data.contentType,
          funnelType: data.funnelType,
          generatedContent: {
            article: data.generatedContent?.article || "",
            titles: data.generatedContent?.titles || [],
            metaDescription: data.generatedContent?.metaDescription || ""
          }
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("generatedContent.")) {
      const field = name.split(".")[1] as keyof GeneratedContent;
      setFormData(prev => ({
        ...prev,
        generatedContent: {
          ...prev.generatedContent,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/dashboard/content');
    } catch (error) {
      console.error(error);
      alert('Failed to save campaign');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!campaign) return <div className="p-8 text-center">Campaign not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#6B5E5E] mb-6">Edit Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#6B5E5E] mb-1">Keyword</label>
          <input
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            className="w-full border border-[#006E74]/20 rounded-lg px-4 py-2 text-[#6B5E5E]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#6B5E5E] mb-1">Content Type</label>
          <select
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="w-full border border-[#006E74]/20 rounded-lg px-4 py-2 text-[#6B5E5E]"
          >
            <option value="review">Review</option>
            <option value="howto">How-To Guide</option>
            <option value="comparison">Comparison</option>
            <option value="listicle">Listicle</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#6B5E5E] mb-1">Funnel Type</label>
          <input
            type="text"
            name="funnelType"
            value={formData.funnelType}
            onChange={handleChange}
            className="w-full border border-[#006E74]/20 rounded-lg px-4 py-2 text-[#6B5E5E]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#6B5E5E] mb-1">Article (HTML)</label>
          <textarea
            name="generatedContent.article"
            value={formData.generatedContent.article}
            onChange={handleChange}
            rows={12}
            className="w-full border border-[#006E74]/20 rounded-lg px-4 py-2 text-[#6B5E5E] font-mono"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 rounded-lg border border-[#006E74]/20 text-[#6B5E5E]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-[#F35D2C] text-white font-semibold disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}