import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleIncentiveStatus } from '../../store/gamificationSlice';
import { Target, CheckCircle2, CheckSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeatureGrid: React.FC = () => {
  const isEnabled = useAppSelector((state) => state.gamification.isEnabled);
  const milestones = useAppSelector((state) => state.gamification.milestones);
  const incentives = useAppSelector((state) => state.gamification.incentives);
  const dispatch = useAppDispatch();

  // Custom states for interactive dashboard cards
  const [activeRewards, setActiveRewards] = useState([
    { id: 'r1', name: 'Sophia Martinez', reward: '$250 Sales Tier', claimed: false },
    { id: 'r2', name: 'Emily Davis', reward: '$150 Viral Tier', claimed: false }
  ]);


  const handleClaimReward = (id: string) => {
    setActiveRewards(prev => 
      prev.map(r => r.id === id ? { ...r, claimed: true } : r)
    );

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#C530C5', '#FBCFFB'],
    });
  };

  // If enabled, display active interactive panels
  if (isEnabled) {
    return (
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full max-w-[960px] select-none animate-scale-in">
        {/* Card 1: Reward approvals */}
        <div className="flex-1 min-h-[220px] bg-white border border-[#FEE7FE] rounded-xl p-5 shadow-sticky-bar flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-2">
            <h3 className="font-jakarta font-semibold text-[15px] text-[#303030] flex items-center gap-1.5">
              <span className="p-1 rounded bg-purple-50 text-[#C530C5]">
                <CheckCircle2 size={16} />
              </span>
              Reward Approvals
            </h3>
            <p className="font-inter text-[12px] text-[#616161] mb-2">
              Approve pending reward payouts for top tier performance.
            </p>

            <div className="flex flex-col gap-2">
              {activeRewards.map(r => (
                <div key={r.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100/60 text-[12px]">
                  <div>
                    <span className="font-semibold block text-[#303030]">{r.name}</span>
                    <span className="text-[#616161] text-[11px]">{r.reward}</span>
                  </div>
                  {r.claimed ? (
                    <span className="text-green-500 font-medium flex items-center gap-0.5 text-[11px]">
                      Approved
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleClaimReward(r.id)}
                      className="px-2 py-1 rounded bg-[#C530C5] text-white hover:bg-[#561056] text-[11px] transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Live Milestones list */}
        <div className="flex-1 min-h-[220px] bg-white border border-[#FEE7FE] rounded-xl p-5 shadow-sticky-bar flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-2">
            <h3 className="font-jakarta font-semibold text-[15px] text-[#303030] flex items-center gap-1.5">
              <span className="p-1 rounded bg-purple-50 text-[#C530C5]">
                <Target size={16} />
              </span>
              Live Milestones
            </h3>
            
            <div className="flex flex-col gap-3 mt-1 max-h-[140px] overflow-y-auto pr-1">
              {milestones.map(m => {
                const percent = Math.floor((m.current / m.target) * 100);
                return (
                  <div key={m.id} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] font-inter">
                      <span className="font-medium text-[#303030] truncate max-w-[160px]">{m.title}</span>
                      <span className="text-primary font-bold">{m.current}/{m.target} {m.unit}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-[#C530C5] h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 3: Live Incentives policy toggle */}
        <div className="flex-1 min-h-[220px] bg-white border border-[#FEE7FE] rounded-xl p-5 shadow-sticky-bar flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-2">
            <h3 className="font-jakarta font-semibold text-[15px] text-[#303030] flex items-center gap-1.5">
              <span className="p-1 rounded bg-purple-50 text-[#C530C5]">
                <CheckSquare size={16} />
              </span>
              Active Policies
            </h3>
            <p className="font-inter text-[12px] text-[#616161] mb-2">
              Toggle customized payouts & referral tiers.
            </p>

            <div className="flex flex-col gap-2">
              {incentives.map(inc => (
                <label 
                  key={inc.id} 
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100/60 cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                  <div>
                    <span className="text-[12px] font-semibold text-[#303030] block leading-tight">{inc.type}</span>
                    <span className="text-[10px] text-[#616161]">{inc.value}</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={inc.status}
                    onChange={() => dispatch(toggleIncentiveStatus(inc.id))}
                    className="w-4 h-4 text-[#C530C5] border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pre-enabled: exact pixel perfect representation of Figma
  const promoCards = [
    {
      title: 'Reward Your Ambassadors',
      desc: 'Boost campaign performance by setting up rewards for ambassadors',
      icon: '/assets/reward_ambassador.svg'
    },
    {
      title: 'Set Milestones',
      desc: 'Set up custom goals for sales, posts, or time-based achievements',
      icon: '/assets/set_milestone.svg'
    },
    {
      title: 'Customise Incentives',
      desc: 'Create custom incentives like flat fees, free products, or special commissions.',
      icon: '/assets/customise_incentive.svg'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[960px] select-none justify-items-center">
      {promoCards.map((card, idx) => (
        <div
          key={idx}
          className="relative w-full max-w-[292px] h-[200px] bg-white border border-[#FEE7FE] rounded-lg p-4 flex flex-col justify-end items-center text-center shadow-sticky-bar hover:shadow-md hover:scale-[1.01] transition-all duration-300 group overflow-hidden"
        >
          {/* Card background vector pattern */}
          <div className="absolute inset-0 z-0 bg-slate-50/50 pointer-events-none opacity-40" />

          {/* Centered Illustration Icon */}
          <div className="absolute top-[24px] z-10 w-[70px] h-[70px] flex items-center justify-center pointer-events-none select-none">
            <img
              src={card.icon}
              alt={`${card.title} Illustration`}
              className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Texts Section */}
          <div className="flex flex-col gap-2 w-full max-w-[260px] h-auto relative z-10">
            <h3 className="font-jakarta font-medium text-[16px] leading-[140%] text-[#303030] tracking-wide">
              {card.title}
            </h3>
            <p className="font-inter font-normal text-[14px] leading-[140%] text-[#616161]">
              {card.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
