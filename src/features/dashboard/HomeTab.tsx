import React from 'react';
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export const HomeTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[960px] mx-auto animate-fade-in text-[#303030]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2.5 rounded-lg bg-green-50 text-green-600">
              <TrendingUp size={20} />
            </span>
            <span className="flex items-center gap-0.5 text-green-600 text-xs font-semibold">
              +14.2% <ArrowUpRight size={14} />
            </span>
          </div>
          <h3 className="text-slate-500 font-inter text-[13px] font-medium">Campaign Conversion</h3>
          <p className="font-jakarta text-[24px] font-bold mt-1 text-[#303030]">4.82%</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <Users size={20} />
            </span>
            <span className="flex items-center gap-0.5 text-purple-600 text-xs font-semibold">
              +8.3% <ArrowUpRight size={14} />
            </span>
          </div>
          <h3 className="text-slate-500 font-inter text-[13px] font-medium">Active Advocates</h3>
          <p className="font-jakarta text-[24px] font-bold mt-1 text-[#303030]">1,482</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign size={20} />
            </span>
            <span className="flex items-center gap-0.5 text-blue-600 text-xs font-semibold">
              +21.4% <ArrowUpRight size={14} />
            </span>
          </div>
          <h3 className="text-slate-500 font-inter text-[13px] font-medium">Referral Revenue</h3>
          <p className="font-jakarta text-[24px] font-bold mt-1 text-[#303030]">$48,250</p>
        </div>
      </div>

      {/* Campaign Summary */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm">
        <h2 className="font-jakarta font-semibold text-[18px] mb-4">SaTHI Ambassador Hub</h2>
        <p className="font-inter text-[14px] text-[#616161] leading-relaxed mb-4">
          Welcome back to your Ambassador Management Dashboard. Real-time indicators represent brand engagement, product referral sales, and automatic pay out commission workflows.
        </p>
        <div className="flex gap-4">
          <div className="px-4 py-2.5 bg-primary-light text-primary font-jakarta font-medium text-[13px] rounded-lg">
            12 Active Campaigns
          </div>
          <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 text-slate-600 font-jakarta font-medium text-[13px] rounded-lg">
            8 Pending Integrations
          </div>
        </div>
      </div>
    </div>
  );
};
