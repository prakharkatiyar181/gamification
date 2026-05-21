import React from 'react';
import { Calendar } from 'lucide-react';

export const PaymentsTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[960px] mx-auto animate-fade-in text-[#303030]">
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-100 pb-6">
          <div>
            <h2 className="font-jakarta font-semibold text-[18px]">Connected Payout Account</h2>
            <p className="font-inter text-[13px] text-[#616161]">
              Manage brand billing bank accounts & scheduled ledger payouts.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-100 text-green-700 text-[12px] font-jakarta font-semibold">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            Stripe Connected
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-inter">Next Payout</span>
            <span className="text-[20px] font-jakarta font-bold block mt-1">$4,850.00</span>
            <span className="text-[10px] text-slate-500 font-inter mt-1 block flex items-center gap-1">
              <Calendar size={12} /> Auto-disburses June 1st
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-inter">Total Paid</span>
            <span className="text-[20px] font-jakarta font-bold block mt-1">$142,520.00</span>
            <span className="text-[10px] text-green-600 font-inter mt-1 block font-medium">
              148 successfully finished transfers
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-inter">Ledger Account</span>
            <span className="text-[20px] font-jakarta font-bold block mt-1">USD (xxxx-8214)</span>
            <span className="text-[10px] text-slate-500 font-inter mt-1 block">
              Checking Account • Chase Bank
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
