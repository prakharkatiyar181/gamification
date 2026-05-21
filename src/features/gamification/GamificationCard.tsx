import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleGamification, addAmbassadorXP, updateMilestoneProgress } from '../../store/gamificationSlice';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, UserCheck, Flame, Plus } from 'lucide-react';
import { CreateRewardModal } from './CreateRewardModal';

export const GamificationCard: React.FC = () => {
  const isEnabled = useAppSelector((state) => state.gamification.isEnabled);
  const ambassadors = useAppSelector((state) => state.gamification.ambassadors);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnableClick = () => {
    setIsModalOpen(true);
  };

  const handleSimulateXP = (id: string) => {
    const randomAmount = Math.floor(Math.random() * 50) + 30; // 30-80 XP
    dispatch(addAmbassadorXP({ id, amount: randomAmount }));

    // Add progress to corresponding milestone
    const progressAmount = Math.random() > 0.5 ? 1 : 2;
    dispatch(updateMilestoneProgress({ id: 'm1', amount: progressAmount }));
    dispatch(updateMilestoneProgress({ id: 'm2', amount: progressAmount * 2 }));

    // Small burst of confetti at element
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.4, x: 0.7 },
      colors: ['#C530C5', '#FBCFFB'],
    });
  };

  if (isEnabled) {
    return (
      <div className="w-full max-w-[960px] min-h-[322px] bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-sm animate-scale-in select-none relative overflow-hidden">
        {/* Background mesh decoration */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url(/assets/background_mesh.svg)', backgroundSize: 'cover' }}
        />

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10 border-b border-[#F5F5F5] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-jakarta font-semibold text-[20px] text-[#303030]">
                Gamification Dashboard: Active
              </h2>
            </div>
            <p className="font-inter text-[13px] text-[#616161]">
              Ambassador campaigns are actively tracked and rewarded in real-time.
            </p>
          </div>

          <button
            onClick={() => dispatch(toggleGamification())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 font-jakarta text-[13px] font-medium bg-red-50/50 hover:bg-red-50 transition-all duration-300 cursor-pointer"
          >
            Deactivate System
          </button>
        </div>

        {/* Real-time Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Ambassador scoreboard */}
          <div className="flex flex-col gap-3">
            <h3 className="font-jakarta font-medium text-[14px] text-[#303030] flex items-center gap-1.5">
              <Trophy size={16} className="text-[#C530C5]" />
              Top Brand Ambassadors
            </h3>

            <div className="flex flex-col gap-2 max-h-[190px] overflow-y-auto pr-1">
              {ambassadors.map((amb) => (
                <div
                  key={amb.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 bg-[#FFFDFF]/80 hover:bg-[#FFFDFF] hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={amb.avatarUrl}
                      alt={amb.name}
                      className="w-9 h-9 rounded-full object-cover border border-primary/20 pointer-events-none select-none"
                    />
                    <div>
                      <h4 className="font-jakarta font-semibold text-[13px] text-[#303030]">
                        {amb.name}
                      </h4>
                      <p className="font-inter text-[11px] text-[#616161]">
                        Level {amb.level} • {amb.posts} posts • {amb.sales} sales
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* XP Meter */}
                    <div className="text-right">
                      <p className="font-jakarta font-bold text-[12px] text-[#C530C5] flex items-center gap-0.5">
                        <Flame size={12} className="inline text-[#C530C5]" />
                        {amb.xp} XP
                      </p>
                      <span className="font-inter text-[9px] text-[#616161] block">
                        Rewards: ${amb.rewardEarned}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSimulateXP(amb.id)}
                      className="p-1 rounded-md bg-primary-light text-[#C530C5] hover:bg-[#C530C5] hover:text-white transition-colors duration-300 cursor-pointer"
                      title="Simulate Event"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-col gap-4 bg-[#FDEFFD]/30 border border-primary-border/40 rounded-xl p-4">
            <h3 className="font-jakarta font-medium text-[14px] text-[#303030] flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#C530C5]" />
              Campaign Progress Overview
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-50 shadow-sm">
                <span className="text-[11px] font-inter text-[#616161] block mb-0.5">Total Rewards</span>
                <span className="text-[18px] font-jakarta font-bold text-[#303030]">
                  ${ambassadors.reduce((acc, curr) => acc + curr.rewardEarned, 0)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-50 shadow-sm">
                <span className="text-[11px] font-inter text-[#616161] block mb-0.5">Total XP Gathered</span>
                <span className="text-[18px] font-jakarta font-bold text-[#C530C5]">
                  {ambassadors.reduce((acc, curr) => acc + curr.xp, 0)} XP
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-50 shadow-sm">
                <span className="text-[11px] font-inter text-[#616161] block mb-0.5">Active Ambassadors</span>
                <span className="text-[18px] font-jakarta font-bold text-[#303030]">
                  {ambassadors.length} members
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-50 shadow-sm">
                <span className="text-[11px] font-inter text-[#616161] block mb-0.5">Total Generated Sales</span>
                <span className="text-[18px] font-jakarta font-bold text-[#303030]">
                  {ambassadors.reduce((acc, curr) => acc + curr.sales, 0)} units
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#616161] font-inter text-center mt-1 border-t border-slate-100 pt-2 flex items-center justify-center gap-1">
              <UserCheck size={12} className="text-[#C530C5]" />
              Real-time calculations synced directly with Shopify & Instagram
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pre-enabled state
  return (
    <>
      <div className="w-full max-w-[960px] h-[322px] bg-white border-[0.6px] border-[#E3E3E3] rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden select-none">
        {/* Mesh background */}
        <img
          src="/assets/background_mesh.svg"
          alt="Background Mesh"
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none z-0"
        />

        {/* Main card contents */}
        <div className="flex flex-col items-center gap-6 relative z-10 max-w-[354px] text-center mt-[-50px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-jakarta font-semibold text-[28px] leading-[140%] text-[#561056]">
              Gamify your Campaign
            </h2>
            <p className="font-inter font-normal text-[16px] leading-[140%] text-[#616161]">
              Enable gamification to start crafting your custom reward system.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleEnableClick}
            className="flex items-center justify-center gap-2 w-full max-w-[310px] h-[40px] rounded-[10px] bg-[#C530C5] text-white font-inter font-normal text-[16px] leading-[140%] shadow-md hover:bg-[#561056] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
          >
            Enable Gamification
          </button>
        </div>
      </div>

      <CreateRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
