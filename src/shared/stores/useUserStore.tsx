import { create } from "zustand";

interface IUseUserStore {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
  id: number;
  setId: (value: number) => void;
  isGroup: boolean;
  setIsGroup: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  isLogined: false,
  isGroup: false,
  id: 0,
  name: "",
  setName: (value: string) => set({ name: value }),
  setId: (value: number) => set({ id: value }),
  setIsGroup: (value: boolean) => set({ isGroup: value }),
  setIsLogined: (value: boolean) => set({ isLogined: value }),
}));
