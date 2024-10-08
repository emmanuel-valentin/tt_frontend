import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
}

interface Action {
  toggleSideMenu: () => void;
}

export const useUIStore = create<State & Action>((set) => ({
  isSideMenuOpen: false,

  toggleSideMenu: () =>
    set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}));
