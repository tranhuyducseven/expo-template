import Constants from "expo-constants";

interface IRuntimeConfig {
  APP_NAME: string;
  API_URL: string;
  ACCESS_JWT_SECRET: string;
  PROVE_API_URL: string;
}

const publicRuntimeConfig = {
  APP_NAME: Constants?.expoConfig?.extra?.APP_NAME || "ZUNI_MOBILE",
  API_URL:
    Constants?.expoConfig?.extra?.API_URL ||
    "https://zuni-api-service.netlify.app/.netlify/functions",
  ACCESS_JWT_SECRET:
    Constants?.expoConfig?.extra?.ACCESS_JWT_SECRET ||
    "3ae642ecf7af10e0bfc322da76572c04ea70af3f55d4b32b60fedf4576ca53c4",
  PROVE_API_URL:
    Constants?.expoConfig?.extra?.ACCESS_JWT_SECRET ||
    "https://prove-zk.zuni-dv-lab.systems",
};

/**
 * True if running in production
 */
export const { PROVE_API_URL, APP_NAME, API_URL, ACCESS_JWT_SECRET } =
  publicRuntimeConfig as IRuntimeConfig;
