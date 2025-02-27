import { create } from "zustand";

interface IUseUserStore {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
  id: number;
  setId: (value: number) => void;
  isGroup: boolean;
  setIsGroup: (value: boolean) => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  isLogined: false,
  isGroup: false,
  id: 0,
  setId: (value: number) => set({ id: value }),
  setIsGroup: (value: boolean) => set({ isGroup: value }),
  setIsLogined: (value: boolean) => set({ isLogined: value }),
}));
