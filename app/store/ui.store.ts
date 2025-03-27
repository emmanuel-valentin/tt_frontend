import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  isSideMenuOpen: boolean;
}

interface Actions {
  toggleSideMenu: VoidFunction;
  resetSideMenu: VoidFunction;
}

type UIStore = State & Actions;

export const useUIStore = create<UIStore>()(
  devtools((set) => ({
    isSideMenuOpen: false,

    toggleSideMenu: () =>
      set(
        (state) => ({ isSideMenuOpen: !state.isSideMenuOpen }),
        undefined,
        'ui-store/toggleSideMenu'
      ),

    resetSideMenu: () =>
      set(
        () => ({ isSideMenuOpen: false }),
        undefined,
        'ui-store/resetSideMenu'
      ),
  }))
);
