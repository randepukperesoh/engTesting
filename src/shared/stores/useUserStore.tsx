import { create } from "zustand";

interface IUseUserStore {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  isLogined: false,
  setIsLogined: (value: boolean) => set({ isLogined: value }),
}));
