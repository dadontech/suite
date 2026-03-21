'use client'

import React, { useState } from 'react';
import {
  DollarSign, Eye, MousePointer2, TrendingUp,
  Calendar, ChevronDown,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const areaData = [
  { name: 'Jan', revenue: 1200 }, { name: 'Feb', revenue: 1800 },
  { name: 'Mar', revenue: 2400 }, { name: 'Apr', revenue: 2100 },
  { name: 'May', revenue: 3200 }, { name: 'Jun', revenue: 4100 },
  { name: 'Jul', revenue: 4800 },
];

const barData = [
  { name: 'Jan', clicks: 4000, conv: 100 }, { name: 'Feb', clicks: 5200, conv: 120 },
  { name: 'Mar', clicks: 6800, conv: 150 }, { name: 'Apr', clicks: 6100, conv: 110 },
  { name: 'May', clicks: 8400, conv: 180 }, { name: 'Jun', clicks: 9800, conv: 200 },
  { name: 'Jul', clicks: 11200, conv: 250 },
];

const DATE_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 12 months'];

const campaigns = [
  { rank: 1, name: 'Wireless Headphones',      revenue: '$1,847.50', trend: '12.5%' },
  { rank: 2, name: 'Fitness Equipment Bundle',  revenue: '$1,420.00', trend: '9.1%'  },
  { rank: 3, name: 'Online Course Platform',    revenue: '$986.25',   trend: '6.3%'  },
  { rank: 4, name: 'Wealthy Affiliate',          revenue: '$712.00',   trend: '4.8%'  },
  { rank: 5, name: 'Software Tools Bundle',      revenue: '$445.75',   trend: '2.2%'  },
];

/* ── Tooltips ── */
const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#006E74]/20 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-[#6B5E5E] mb-0.5">{label}</p>
      <p className="text-[#F35D2C] font-semibold">Revenue: ${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#006E74]/20 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-[#6B5E5E] mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} className="font-semibold" style={{ color: p.color }}>
          {p.dataKey === 'clicks' ? 'Clicks' : 'Conversions'}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ── Stat Card ── */
const StatCard = ({ title, value, trend, icon, iconBg }) => (
  <div className="bg-white p-3 xs:p-4 sm:p-5 rounded-2xl border border-[#006E74]/10 hover:border-[#F35D2C]/30 transition-colors">
    <div className="flex justify-between items-start mb-2 sm:mb-3">
      <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#6B5E5E]/50 tracking-tight uppercase leading-snug pr-2">
        {title}
      </span>
      <div className={`p-1.5 xs:p-2 sm:p-2.5 rounded-xl flex-shrink-0 ${iconBg}`}>
        {React.cloneElement(icon, { size: 14 })}
      </div>
    </div>
    <h4 className="text-lg xs:text-xl sm:text-3xl font-bold tracking-tight text-[#6B5E5E]">{value}</h4>
    <p className="text-[#006E74] text-[9px] xs:text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1 flex-wrap">
      {trend} <span className="text-[#6B5E5E]/40 font-medium">from last period</span>
    </p>
  </div>
);

/* ── Main ── */
const AnalyticsDashboard = () => {
  const [dateLabel, setDateLabel]   = useState('Last 7 days');
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto px-3 xs:px-4 md:px-8 py-3 xs:py-4 md:py-8 pb-24 md:pb-8 space-y-3 xs:space-y-4 sm:space-y-5">
        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-[#6B5E5E]">Analytics</h1>
            <p className="text-[#6B5E5E]/50 mt-1 font-medium text-xs sm:text-sm">
              Track your campaign performance and revenue
            </p>
          </div>

          {/* Date picker */}
          <div className="relative self-start sm:self-auto w-full sm:w-auto">
            <button
              onClick={() => setShowPicker(v => !v)}
              className="flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-white border border-[#006E74]/20 rounded-xl text-xs xs:text-sm font-semibold text-[#6B5E5E] hover:bg-[#006E74]/5 transition-colors shadow-sm whitespace-nowrap w-full xs:w-auto"
            >
              <Calendar size={14} />
              {dateLabel}
              <ChevronDown size={14} className="text-[#6B5E5E]/40" />
            </button>
            {showPicker && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-30 bg-white border border-[#006E74]/20 rounded-xl shadow-xl overflow-hidden w-full xs:w-44">
                {DATE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setDateLabel(opt); setShowPicker(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs xs:text-sm font-semibold transition-colors
                      ${dateLabel === opt ? 'bg-[#F35D2C] text-white' : 'text-[#6B5E5E] hover:bg-[#006E74]/5'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
          <StatCard title="Total Revenue"    value="$19,720" trend="+23.5%" icon={<DollarSign />}    iconBg="bg-[#F35D2C]/10 text-[#F35D2C]" />
          <StatCard title="Total Clicks"     value="51,600"  trend="+18.2%" icon={<Eye />}           iconBg="bg-[#006E74]/10 text-[#006E74]"   />
          <StatCard title="Conversions"      value="591"     trend="+25.3%" icon={<MousePointer2 />} iconBg="bg-[#F35D2C]/10 text-[#F35D2C]" />
          <StatCard title="Avg. CVR"         value="1.15%"   trend="+0.12%" icon={<TrendingUp />}   iconBg="bg-[#006E74]/10 text-[#006E74]" />
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">

          {/* Revenue Area Chart */}
          <div className="bg-white p-3 xs:p-4 sm:p-5 rounded-2xl border border-[#006E74]/10 overflow-x-auto">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-sm xs:text-base sm:text-lg text-[#6B5E5E]">Revenue Over Time</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-[#6B5E5E]/50 font-medium">Monthly trend</p>
              </div>
              <span className="text-[#006E74] font-bold text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
                <TrendingUp size={12} /> +23.5%
              </span>
            </div>
            <div className="h-36 xs:h-44 sm:h-60 lg:h-72 w-full min-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#F35D2C" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#F35D2C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#006E74" strokeOpacity={0.1} />
                  <XAxis
                    dataKey="name" axisLine={false} tickLine={false}
                    tick={{ fill: '#6B5E5E', fontSize: 9 }} dy={6}
                  />
                  <YAxis
                    axisLine={false} tickLine={false} width={30}
                    tick={{ fill: '#6B5E5E', fontSize: 9 }}
                  />
                  <Tooltip content={<RevenueTooltip />} />
                  <Area
                    type="monotone" dataKey="revenue"
                    stroke="#F35D2C" strokeWidth={2}
                    fillOpacity={1} fill="url(#colorRev)"
                    dot={false} activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clicks & Conversions Bar Chart */}
          <div className="bg-white p-3 xs:p-4 sm:p-5 rounded-2xl border border-[#006E74]/10 overflow-x-auto">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-sm xs:text-base sm:text-lg text-[#6B5E5E]">Clicks & Conversions</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-[#6B5E5E]/50 font-medium">Performance</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="flex items-center gap-1 text-[9px] xs:text-[10px] font-bold text-[#6B5E5E]/70">
                  <span className="w-2 h-2 rounded-full bg-[#F35D2C] inline-block"/>Clicks
                </span>
                <span className="flex items-center gap-1 text-[9px] xs:text-[10px] font-bold text-[#6B5E5E]/70">
                  <span className="w-2 h-2 rounded-full bg-[#006E74] inline-block"/>Conv.
                </span>
              </div>
            </div>
            <div className="h-36 xs:h-44 sm:h-60 lg:h-72 w-full min-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#006E74" strokeOpacity={0.1} />
                  <XAxis
                    dataKey="name" axisLine={false} tickLine={false}
                    tick={{ fill: '#6B5E5E', fontSize: 9 }} dy={6}
                  />
                  <YAxis
                    axisLine={false} tickLine={false} width={30}
                    tick={{ fill: '#6B5E5E', fontSize: 9 }}
                  />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="clicks" fill="#F35D2C" radius={[4,4,0,0]} maxBarSize={18} />
                  <Bar dataKey="conv"   fill="#006E74" radius={[4,4,0,0]} maxBarSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Top Campaigns ── */}
        <section className="bg-white border border-[#006E74]/10 rounded-2xl overflow-hidden">
          <div className="p-3 xs:p-4 sm:p-5 border-b border-[#006E74]/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-sm xs:text-base sm:text-lg text-[#6B5E5E]">Top Performing Campaigns</h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-[#6B5E5E]/50 font-medium mt-0.5">By revenue this period</p>
            </div>
            <button className="flex-shrink-0 px-3 py-1.5 text-xs font-bold border border-[#006E74]/20 rounded-xl hover:bg-[#006E74]/5 transition-colors text-[#6B5E5E] w-full sm:w-auto">
              View All
            </button>
          </div>

          <div className="divide-y divide-[#006E74]/10">
            {campaigns.map(c => (
              <div
                key={c.rank}
                className="flex flex-col xs:flex-row xs:items-center justify-between px-3 xs:px-4 sm:px-5 py-3 hover:bg-[#006E74]/5 transition-colors cursor-pointer gap-2"
              >
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center bg-[#F35D2C]/10 text-[#F35D2C] rounded-xl font-bold text-xs xs:text-sm">
                    {c.rank}
                  </span>
                  <span className="font-bold text-[#6B5E5E] text-xs xs:text-sm sm:text-base truncate">{c.name}</span>
                </div>

                {/* Right */}
                <div className="flex items-center justify-between xs:justify-end gap-2 xs:gap-4 sm:gap-5 ml-10 sm:ml-13.5">
                  <p className="font-bold text-[#6B5E5E] text-xs xs:text-sm sm:text-base">{c.revenue}</p>
                  <span className="text-[#006E74] font-bold text-[9px] xs:text-[10px] sm:text-sm bg-[#006E74]/10 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    <TrendingUp size={10} /> {c.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;