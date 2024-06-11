import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthStore = {
  userId: string | null;
  token: string | null;
  doLogin: (userId: string, token: string) => void;
  doLogout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userId: null,
      token: null,

      doLogin: (userId, token) => set({ userId, token }),
      doLogout: () => set({ userId: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
