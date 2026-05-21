import React from 'react';
import { Lock } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[960px] mx-auto animate-fade-in text-[#303030]">
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm">
        <h2 className="font-jakarta font-semibold text-[18px] mb-2">Campaign Settings</h2>
        <p className="font-inter text-[13px] text-[#616161] mb-6">
          Configure brand customizations, integration keys, and referral variables.
        </p>

        <div className="flex flex-col gap-6">
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta font-medium text-[13px]">Shopify API Integration Key</label>
              <div className="relative">
                <input
                  type="password"
                  value="••••••••••••••••••••••••••••••••"
                  disabled
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-[13px] font-mono"
                />
                <Lock size={14} className="absolute right-3 top-3 text-slate-400" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-jakarta font-medium text-[13px]">Default Ambassador Commission</label>
              <div className="relative">
                <input
                  type="text"
                  value="10% flat commission rate"
                  disabled
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-[13px]"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-jakarta font-semibold text-[14px] mb-2">Advocate Notification Flow</h3>
            <p className="font-inter text-[12px] text-[#616161] mb-4">
              Send automated notification alerts to advocates upon successful milestones.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#C530C5] border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-[13px] font-inter text-[#303030]">Enable automated email reward templates</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
