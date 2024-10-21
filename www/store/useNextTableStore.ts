import { create } from "zustand";

type State = {
  count: number;
  setCount: (count: number) => void;
};

export const useNextTableStore = create<State>(set => ({
  count: 0,
  setCount: count => set({ count }),
}));
