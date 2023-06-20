import { loginApi } from "@apis/auth";
import { NAVIGATION } from "@configs/navigate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRoleFromAccessToken } from "@utils/auth";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IAccountState {
  loading: boolean;
  accessToken?: string;
  refreshToken?: string;
  accountId?: string;
  role?: string;
  // setLogged: (logged: boolean) => void;
  handleLogin: (
    accountId: string,
    password: string,
    navigation: any
  ) => Promise<void>;

  handleLogout: () => void;
}

export const useAccountStore = create<IAccountState>()(
  devtools(
    persist(
      (set) => ({
        loading: false,
        handleLogin: async (accountId, password, navigation) => {
          set({ loading: true });
          try {
            const res = await loginApi({ accountId, password });
            if (res.status !== 200) {
              alert("Login failed");
            } else if (res.status === 200) {
              if (res.data?.accessToken && res.data?.refreshToken) {
                try {
                  const authData = await getRoleFromAccessToken(
                    res.data.accessToken
                  );
                  if (authData.isSuccessful) {
                    set({
                      accessToken: res.data.accessToken,
                      refreshToken: res.data.refreshToken,
                      role: authData.role,
                      accountId,
                    });
                    // alert("Login successfully");
                    navigation.navigate(NAVIGATION.App.path as never);
                    set({ loading: false });
                    return;
                  }
                } catch (e) {
                  set({ loading: false });
                  return;
                }
              }
            }
          } catch (e) {
            set({ loading: false });
          }
          set({ loading: false });
        },
        handleLogout: () => {
          set({ loading: true });
          set({
            accessToken: undefined,
            refreshToken: undefined,
            role: undefined,
            accountId: undefined,
          });
          set({ loading: false });
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
