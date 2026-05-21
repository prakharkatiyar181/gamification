import React from 'react';

export const ApplicationsTab: React.FC = () => {
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
                <button className="px-3 py-1.5 rounded-lg border border-[#E3E3E3] font-jakarta text-[12px] hover:bg-slate-50 transition-colors cursor-pointer">
                  Decline
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#C530C5] text-white font-jakarta text-[12px] hover:bg-[#561056] transition-colors cursor-pointer">
                  Approve Advocate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
