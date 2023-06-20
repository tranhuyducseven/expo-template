import { useTheme } from "react-native-paper";

/**
 * @description This is the default theme for the app.
 */

const ExtendedDefaultTheme = {
  colors: {},
};
export const lightTheme = ExtendedDefaultTheme;

export type AppTheme = typeof lightTheme;

export const useAppTheme = () => useTheme<AppTheme>();
