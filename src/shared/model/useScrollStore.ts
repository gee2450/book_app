import { create } from "zustand";

type ScrollStore = {
  positions: Record<string, number>;
  restoreFlags: Record<string, boolean>;

  setPosition: (key: string, top: number) => void;
  getPosition: (key: string) => number;

  markForRestore: (key: string) => void;
  consumeRestoreFlag: (key: string) => boolean;

  clearPosition: (key: string) => void;
  clearRestoreFlag: (key: string) => void;
};

export const useScrollStore = create<ScrollStore>((set, get) => ({
  positions: {},
  restoreFlags: {},

  setPosition: (key, top) =>
    set((state) => ({
      positions: {
        ...state.positions,
        [key]: top,
      },
    })),

  getPosition: (key) => {
    return get().positions[key] ?? 0;
  },

  markForRestore: (key) =>
    set((state) => ({
      restoreFlags: {
        ...state.restoreFlags,
        [key]: true,
      },
    })),

  consumeRestoreFlag: (key) => {
    const flag = get().restoreFlags[key] ?? false;

    if (flag) {
      set((state) => ({
        restoreFlags: {
          ...state.restoreFlags,
          [key]: false,
        },
      }));
    }

    return flag;
  },

  clearPosition: (key) =>
    set((state) => {
      const next = { ...state.positions };
      delete next[key];
      return { positions: next };
    }),

  clearRestoreFlag: (key) =>
    set((state) => {
      const next = { ...state.restoreFlags };
      delete next[key];
      return { restoreFlags: next };
    }),
}));