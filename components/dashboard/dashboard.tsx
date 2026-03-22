// app/dashboard/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, DollarSign, Eye, MousePointer2, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';

interface Campaign {
  id: string;
  link: string;
  keyword: string;
  tone: string;
  wordCount: string;
  contentType: string;
  funnelType: string;
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
  createdAt: string;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load campaigns');
        setLoading(false);
      });
  }, []);

  // Calculate stats from campaigns (simple examples)
  const totalRevenue = 0; // would need actual conversion tracking
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.stats?.clicks || 0), 0);
  const conversions = campaigns.reduce((sum, c) => sum + (c.stats?.conversions || 0), 0);
  const conversionRate = totalClicks ? ((conversions / totalClicks) * 100).toFixed(2) : '0.00';

  const stats = [
    { label: 'Total Revenue', value: '$0.00', icon: DollarSign, color: 'text-[#F35D2C]', bg: 'bg-[#F35D2C]/10' },
    { label: 'Total Clicks', value: totalClicks.toString(), icon: Eye, color: 'text-[#006E74]', bg: 'bg-[#006E74]/10' },
    { label: 'Conversions', value: conversions.toString(), icon: MousePointer2, color: 'text-[#F35D2C]', bg: 'bg-[#F35D2C]/10' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-[#006E74]', bg: 'bg-[#006E74]/10' },
  ];

  return (
    <main className="flex-1 bg-white overflow-y-auto pb-20 md:pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-4 md:pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 md:mb-8 gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#6B5E5E] tracking-tight">Dashboard</h1>
            <p className="text-xs md:text-sm text-[#6B5E5E]/70 font-normal">
              Welcome back! Here&apos;s how your campaigns are performing.
            </p>
          </div>
          <Link href="/dashboard/campaign" className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-[#F35D2C] text-white font-semibold text-xs md:text-sm hover:bg-[#e04e1f] transition-colors w-full sm:w-auto justify-center">
            <Plus size={16} strokeWidth={2.5} />
            <span>New Campaign</span>
          </Link>
        </div>

        {/* AI Hero Banner (same as before) */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#006E74] p-6 md:p-10 text-white mb-8 md:mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 md:mb-4 text-white/80 justify-center md:justify-start">
                <Zap size={12} className="fill-current" />
                <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.1em]">AI-Powered</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight">
                Create Your Next Campaign in Minutes
              </h2>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-lg">
                Paste your affiliate link, and our AI will analyze the product, generate content, 
                and build a complete conversion funnel automatically.
              </p>
            </div>
            <Link href="/dashboard/campaign" className="bg-white/90 backdrop-blur-sm text-[#006E74] px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 hover:bg-white transition-colors shrink-0">
              <Zap size={14} className="text-[#F35D2C] fill-[#F35D2C]" />
              Start Now
              <ArrowUpRight size={14} className="text-[#6B5E5E]/40" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="group p-4 md:p-6 bg-white border border-[#006E74]/10 rounded-xl md:rounded-2xl flex justify-between items-start hover:border-[#006E74]/30 transition-all">
              <div>
                <p className="text-[10px] md:text-xs font-medium text-[#6B5E5E]/50 mb-1 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#6B5E5E]">{stat.value}</h3>
                <p className="text-[10px] md:text-xs text-[#6B5E5E]/40 mt-1 md:mt-2 font-medium">All time</p>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Your Campaigns Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#6B5E5E]">Your Campaigns</h3>
              <p className="text-xs md:text-sm text-[#6B5E5E]/60 font-medium">
                {campaigns.length} active {campaigns.length === 1 ? 'campaign' : 'campaigns'}
              </p>
            </div>
            <Link href="/dashboard/content" className="text-xs font-medium text-[#6B5E5E]/70 border border-[#006E74]/20 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[#006E74]/5 hover:border-[#006E74]/30 transition-all bg-white">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-[#6B5E5E]/50">Loading campaigns...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : campaigns.length === 0 ? (
            <div className="w-full h-auto min-h-[280px] md:h-[340px] border border-dashed border-[#006E74]/20 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white/50 hover:border-[#006E74]/30 transition-colors">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#006E74]/5 rounded-full flex items-center justify-center text-[#6B5E5E]/30 mb-4 md:mb-6 border border-[#006E74]/10">
                <Plus size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-base md:text-lg font-bold text-[#6B5E5E] mb-2">No campaigns yet</h4>
              <p className="text-xs md:text-sm text-[#6B5E5E]/60 max-w-[280px] md:max-w-[320px] mb-6 md:mb-8 leading-relaxed">
                Create your first campaign to start tracking your affiliate marketing.
              </p>
              <Link href="/dashboard/campaign" className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-[#F35D2C] text-white font-semibold text-xs md:text-sm hover:bg-[#e04e1f] transition-colors">
                <Plus size={16} strokeWidth={2.5} />
                Create Campaign
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {campaigns.map(campaign => (
                <Link key={campaign.id} href={`/dashboard/campaign/${campaign.id}`} className="block border border-[#006E74]/10 rounded-2xl overflow-hidden hover:shadow-md transition-all group">
                  <div className="bg-gradient-to-r from-[#F35D2C]/5 to-transparent p-4 border-b border-[#006E74]/10">
                    <h4 className="font-bold text-[#6B5E5E] truncate">
                      {campaign.productInfo?.title || campaign.keyword}
                    </h4>
                    <p className="text-xs text-[#6B5E5E]/50 mt-1">Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-xs font-medium bg-[#006E74]/10 text-[#006E74] px-2 py-1 rounded-full">
                      {campaign.funnelType} funnel
                    </span>
                    <span className="text-xs text-[#6B5E5E]/40 group-hover:text-[#F35D2C] transition-colors">View →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}