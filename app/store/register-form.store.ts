import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  RegisterFormStep1,
  RegisterFormStep2,
  RegisterFormStep3,
} from "~/types/auth/register-form.type";

type State = {
  registerForm: Partial<{
    step1: RegisterFormStep1 & { acceptTerms?: string };
    step2: RegisterFormStep2;
    step3: RegisterFormStep3;
  }>;
  // Store image in memory (not persisted)
  selectedImage: File | null;
};

type Actions = {
  setFormData: (data: Partial<State["registerForm"]>) => void;
  setSelectedImage: (image: File | null) => void;
  clear: VoidFunction;
};

const initialState: Pick<State, "registerForm" | "selectedImage"> = {
  registerForm: {},
  selectedImage: null,
};

type RegisterFormStore = State & Actions;

export const useRegisterFormStore = create<RegisterFormStore>()(
  devtools(
    persist(
      (set) => ({
        registerForm: initialState.registerForm,
        selectedImage: initialState.selectedImage,
        setFormData: (data) => {
          set(
            (state) => ({ registerForm: { ...state.registerForm, ...data } }),
            undefined,
            "register-form-store/setFormData"
          );
        },
        setSelectedImage: (image) => {
          set(
            () => ({ selectedImage: image }),
            undefined,
            "register-form-store/setSelectedImage"
          );
        },
        clear: () => {
          set(
            () => ({
              registerForm: initialState.registerForm,
              selectedImage: initialState.selectedImage,
            }),
            undefined,
            "register-form-store/clear"
          );
        },
      }),
      {
        name: "register-form-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ registerForm: state.registerForm }), // Only persist form data, not the image
      }
    )
  )
);

export const setFormData = (data: Partial<State["registerForm"]>) =>
  useRegisterFormStore.getState().setFormData(data);

export const setSelectedImage = (image: File | null) =>
  useRegisterFormStore.getState().setSelectedImage(image);

export const getSelectedImage = () =>
  useRegisterFormStore.getState().selectedImage;

export const loadFormData = () => useRegisterFormStore.getState().registerForm;

export const clearFormData = () => useRegisterFormStore.getState().clear();
