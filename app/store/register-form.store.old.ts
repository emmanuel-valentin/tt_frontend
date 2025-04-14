import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { RegisterForm } from "~/types/auth/register-form.type";

type State = {
  registerForm: Partial<RegisterForm>;
};

type Actions = {
  setFormData: (data: Partial<RegisterForm>) => void;
  clear: VoidFunction;
};

const initialState: State["registerForm"] = {};

type RegisterFormStore = State & Actions;

export const useRegisterFormStore = create<RegisterFormStore>()(
  devtools(
    persist(
      (set) => ({
        registerForm: initialState,
        setFormData: (data) => {
          set(
            (state) => ({ registerForm: { ...state.registerForm, ...data } }),
            undefined,
            "register-form-store/setFormData"
          );
        },
        clear: () => {
          set(
            () => ({ registerForm: initialState }),
            undefined,
            "register-form-store/clear"
          );
        },
      }),
      {
        name: "register-form-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export const setFormData = (data: Partial<State["registerForm"]>) =>
  useRegisterFormStore.getState().setFormData(data);

export const loadFormData = () => useRegisterFormStore.getState().registerForm;

export const clearFormData = () => useRegisterFormStore.getState().clear();
