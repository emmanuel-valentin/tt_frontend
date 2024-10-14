import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  isSideMenuOpen: boolean;
}

interface Action {
  toggleSideMenu: () => void;
}

type UIStore = State & Action;

export const useUIStore = create<UIStore>()(
  devtools((set) => ({
    isSideMenuOpen: false,

    toggleSideMenu: () =>
      set(
        (state) => ({ isSideMenuOpen: !state.isSideMenuOpen }),
        undefined,
        'ui-store/toggleSideMenu',
      ),
  })),
);
