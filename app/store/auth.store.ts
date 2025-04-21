import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserData } from "~/types/user/user.type";

interface State {
  userData?: UserData;
}

interface Actions {
  setUserData: (userData: UserData) => void;
  clearUserData: () => void;
}

type AuthStore = State & Actions;

const initialState: State = {
  userData: {} as UserData,
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    ...initialState,

    setUserData: (userData) => {
      set({ userData }, undefined, "auth/setUserData");
    },

    clearUserData: () => {
      set({ userData: {} as UserData }, undefined, "auth/clearUserData");
    },
  }))
);

export const setUserData = (userData: UserData) =>
  useAuthStore.getState().setUserData(userData);

export const getUserData = () => useAuthStore.getState().userData;

export const clearUserData = () => useAuthStore.getState().clearUserData();
