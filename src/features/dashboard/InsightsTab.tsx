import React from 'react';
import { TrendingUp } from 'lucide-react';

export const InsightsTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[960px] mx-auto animate-fade-in text-[#303030]">
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm">
        <h2 className="font-jakarta font-semibold text-[18px] mb-2">Advocate Performance Insights</h2>
        <p className="font-inter text-[13px] text-[#616161] mb-6">
          Monthly progression of ambassador reach and social impression statistics.
        </p>

        {/* Graphic Chart representation */}
        <div className="h-[200px] w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center relative overflow-hidden">
          {/* Simulated SVG Area Chart */}
          <svg className="absolute bottom-0 w-full h-[120px] text-primary/10 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C15,80 30,50 50,70 C70,90 85,20 100,10 L100,100 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-[120px] text-primary fill-none stroke-current stroke-2" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C15,80 30,50 50,70 C70,90 85,20 100,10" />
          </svg>
          <span className="font-jakarta text-[13px] text-[#616161] font-semibold flex items-center gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-100 relative z-10 shadow-sm">
            <TrendingUp size={16} className="text-primary" />
            Reach: +48% Growth in Q3
          </span>
        </div>

        {/* Data points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-slate-100 pt-6">
          <div>
            <span className="text-[11px] text-slate-400 font-inter uppercase tracking-wider block">Instagram Impressions</span>
            <span className="text-[18px] font-jakarta font-bold text-slate-800">142.5K</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-inter uppercase tracking-wider block">TikTok Video Views</span>
            <span className="text-[18px] font-jakarta font-bold text-slate-800">82.1K</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-inter uppercase tracking-wider block">Referral link Clicks</span>
            <span className="text-[18px] font-jakarta font-bold text-slate-800">18.4K</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-inter uppercase tracking-wider block">Promo Code Redemptions</span>
            <span className="text-[18px] font-jakarta font-bold text-slate-800">3,482</span>
          </div>
        </div>
      </div>
    </div>
  );
};
