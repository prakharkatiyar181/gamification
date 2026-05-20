import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Ambassador {
  id: string;
  name: string;
  avatarUrl: string;
  posts: number;
  sales: number;
  xp: number;
  level: number;
  rewardEarned: number;
}

export interface GamificationState {
  isEnabled: boolean;
  activeTab: string;
  notificationsCount: number;
  ambassadors: Ambassador[];
  milestones: {
    id: string;
    title: string;
    target: number;
    current: number;
    unit: string;
    reward: string;
  }[];
  incentives: {
    id: string;
    type: string;
    value: string;
    status: boolean;
  }[];
}

const initialState: GamificationState = {
  isEnabled: false,
  activeTab: 'Gamification',
  notificationsCount: 5,
  ambassadors: [
    { id: '1', name: 'Sophia Martinez', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', posts: 42, sales: 18, xp: 840, level: 4, rewardEarned: 250 },
    { id: '2', name: 'Alex Johnson', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', posts: 31, sales: 12, xp: 620, level: 3, rewardEarned: 150 },
    { id: '3', name: 'Emily Davis', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', posts: 28, sales: 15, xp: 710, level: 3, rewardEarned: 200 },
    { id: '4', name: 'Marcus Wong', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', posts: 19, sales: 8, xp: 380, level: 2, rewardEarned: 80 },
  ],
  milestones: [
    { id: 'm1', title: 'Top Ambassador Sales Burst', target: 50, current: 35, unit: 'sales', reward: '$500 Flat Bonus' },
    { id: 'm2', title: 'Viral Post Extravaganza', target: 100, current: 82, unit: 'posts', reward: 'Free Brand Merchandise Pack' },
    { id: 'm3', title: 'Time-Based Loyalty Tier', target: 30, current: 30, unit: 'days active', reward: 'Extra 5% Lifetime Commission' },
  ],
  incentives: [
    { id: 'i1', type: 'Flat Fee per Referrals', value: '$10 per signup', status: true },
    { id: 'i2', type: 'Special Higher Commission Rate', value: '15% on products', status: true },
    { id: 'i3', type: 'Free Product Credits', value: '$100 monthly allocation', status: false },
  ],
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    toggleGamification: (state) => {
      state.isEnabled = !state.isEnabled;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    clearNotifications: (state) => {
      state.notificationsCount = 0;
    },
    addAmbassadorXP: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const amb = state.ambassadors.find(a => a.id === action.payload.id);
      if (amb) {
        amb.xp += action.payload.amount;
        amb.posts += 1;
        amb.level = Math.floor(amb.xp / 200) + 1;
      }
    },
    toggleIncentiveStatus: (state, action: PayloadAction<string>) => {
      const inc = state.incentives.find(i => i.id === action.payload);
      if (inc) {
        inc.status = !inc.status;
      }
    },
    updateMilestoneProgress: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const mile = state.milestones.find(m => m.id === action.payload.id);
      if (mile) {
        mile.current = Math.min(mile.target, mile.current + action.payload.amount);
      }
    }
  },
});

export const {
  toggleGamification,
  setActiveTab,
  clearNotifications,
  addAmbassadorXP,
  toggleIncentiveStatus,
  updateMilestoneProgress,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
