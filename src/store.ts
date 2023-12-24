import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthData = {
  token: string;
  username: string;
  id: string;
};

type AppState = {
  authData: AuthData;
  setAuthData: (params: Partial<AuthData>) => void;
  logout: () => void;
};

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      authData: {
        token: "",
        username: "",
        id: "",
      },
      setAuthData: (params) =>
        set((state) => ({
          authData: {
            ...state.authData,
            ...params,
          },
        })),
      logout: () => {
        set({
          authData: {
            token: "",
            username: "",
            id: "",
          },
        });
      },
    }),
    {
      name: "cache-storage",
    }
  )
);

export default useAppStore;
