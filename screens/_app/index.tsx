import { RootStack } from "@navigators/app";
import { NavigationContainer } from "@react-navigation/native";
import { useAppStore } from "@states/app";
import { Provider as PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "theme";

export default function App() {
  const { darkMode } = useAppStore();
  return (
    <PaperProvider theme={darkMode === "dark" ? darkTheme : lightTheme}>
      <NavigationContainer theme={darkMode === "dark" ? darkTheme : lightTheme}>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
