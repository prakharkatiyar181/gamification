import React, { useState } from 'react';
import { useAppSelector } from './store';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GamificationCard } from './features/gamification/GamificationCard';
import { FeatureGrid } from './features/gamification/FeatureGrid';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Calendar,
  Lock
} from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeTab = useAppSelector((state) => state.gamification.activeTab);

  // Content switcher depending on selected sidebar item
  const renderContent = () => {
    switch (activeTab) {
      case 'Gamification':
        return (
          <div className="flex flex-col items-center gap-12 w-full max-w-[960px] mx-auto animate-fade-in">
            {/* Gamification Core Container */}
            <GamificationCard />
            {/* Promo / Control Cards Grid */}
            <FeatureGrid />
          </div>
        );

      case 'Home':
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

      case 'Insights':
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

      case 'Applications':
        return (
          <div className="flex flex-col gap-6 w-full max-w-[960px] mx-auto animate-fade-in text-[#303030]">
            <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-jakarta font-semibold text-[18px]">Pending Registrations</h2>
                  <p className="font-inter text-[13px] text-[#616161]">
                    Review candidate influencers applying to advocate for your brand.
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-amber-50 border border-amber-100 text-amber-600 font-jakarta text-[11px] font-semibold">
                  3 Pending
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { name: 'Chloe Vance', handle: '@chloee.vance', followers: '48.2K', location: 'Los Angeles, CA', bio: 'Fashion, lifestyle, & minimalist aesthetic creator.' },
                  { name: 'Devon Carter', handle: '@devon_carter', followers: '12.5K', location: 'Austin, TX', bio: 'Fitness coach and wellness content producer.' },
                  { name: 'Sarah Miller', handle: '@sarah.mill', followers: '94.0K', location: 'New York, NY', bio: 'Tech reviewer & digital workspace designer.' }
                ].map((app, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-all gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-jakarta font-bold text-[14px] text-slate-800">{app.name}</span>
                        <span className="text-primary font-inter text-[12px]">{app.handle}</span>
                      </div>
                      <p className="font-inter text-[12px] text-[#616161] max-w-[450px]">
                        {app.bio}
                      </p>
                      <span className="font-inter text-[10px] text-slate-400 mt-1">
                        Followers: {app.followers} • Location: {app.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-[#E3E3E3] font-jakarta text-[12px] hover:bg-slate-50 transition-colors">
                        Decline
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-[#C530C5] text-white font-jakarta text-[12px] hover:bg-[#561056] transition-colors">
                        Approve Advocate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Payments':
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

      case 'Settings':
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

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* 1. Reusable Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 2. Main content container */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-[188px]">
        {/* Reusable Navbar */}
        <Navbar onMenuOpen={() => setIsSidebarOpen(true)} />

        {/* Content Panel Area */}
        <main className="flex-1 px-4 lg:px-[146px] py-12 flex flex-col gap-16 relative overflow-hidden select-none bg-white">
          {renderContent()}

          {/* Infinite Horizontal Running Text Ticker */}
          <div className="w-full mt-auto pt-6 border-t border-[#F5F5F5] select-none pointer-events-none relative overflow-hidden bg-[#FBCFFB] rounded-xl py-3 px-6 h-[48px] flex items-center justify-center">
            <div className="animate-marquee whitespace-nowrap flex gap-8 font-inter font-semibold text-[14px] tracking-wider text-[#340634] uppercase">
              <span>★ Reward Your Ambassadors ★ Set Custom Milestones ★ Customize Incentives ★ Enable automatic billing integrations ★ track instagram referral sales ★</span>
              <span>★ Reward Your Ambassadors ★ Set Custom Milestones ★ Customize Incentives ★ Enable automatic billing integrations ★ track instagram referral sales ★</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
