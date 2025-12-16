'use client';

import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  score: 0,
  lives: 3,
  paused: false,
  level: 1,
  size: 480,

  setSize: (size) => set({ size }),

  addScore: () => {
    const { score, level } = get();
    const nextScore = score + 1;

    set({
      score: nextScore,
      level: level + 1, // matches prior behavior: level becomes 2 after first score
    });
  },
  subtractLive: () => set((s) => ({ lives: s.lives - 1 })),
  onPause: () => set({ paused: true }),
  onResume: () => set({ paused: false }),
  resetGame: () => set({ score: 0, lives: 3, paused: false, level: 1 }),
}));