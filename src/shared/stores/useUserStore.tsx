import { create } from "zustand";

interface IUseUserStore {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
  isGroup: boolean;
  setIsGroup: (value: boolean) => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  isLogined: true,
  isGroup: false,
  setIsGroup: (value: boolean) => set({ isGroup: value }),
  setIsLogined: (value: boolean) => set({ isLogined: value }),
}));
