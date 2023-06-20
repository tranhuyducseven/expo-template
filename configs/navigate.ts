export type TRootStack =
  /**
   * Root stack
   * @description Root stack for app
   * @typedef {string} TRootStack
   * @enum {string}
   * @readonly
   */
  "Onboarding" | "App" | "Auth";

export type TAuthStack = "Login" | "Forget" | "Verify";

export type TAppStack = "Home" | "Scans" | "DIDs" | "Settings";

export interface IAppNavigation {
  /**
   * Path of router
   */
  path: TRootStack | TAuthStack | TAppStack;
  /**
   * Name of router
   */
  name: string;
}

export type TRootNavigation = { [key in TRootStack]: IAppNavigation };
export type TLoginNavigation = { [key in TAuthStack]: IAppNavigation };
export type TAppNavigation = { [key in TAppStack]: IAppNavigation };

export const NAVIGATION: TRootNavigation & TLoginNavigation & TAppNavigation = {
  App: {
    path: "App",
    name: "App",
  },
  Auth: {
    path: "Auth",
    name: "Auth",
  },
  Onboarding: {
    path: "Onboarding",
    name: "Onboarding",
  },
  Home: {
    path: "Home",
    name: "Home",
  },
  Scans: {
    path: "Scans",
    name: "Scans",
  },
  DIDs: {
    path: "DIDs",
    name: "DIDs",
  },
  Settings: {
    path: "Settings",
    name: "Settings",
  },
  Login: {
    path: "Login",
    name: "Login",
  },
  Forget: {
    path: "Forget",
    name: "Forget",
  },
  Verify: {
    path: "Verify",
    name: "Verify",
  },
};
