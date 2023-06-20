import { CustomHeader } from "@components/Header";
import { NAVIGATION, TRootNavigation, TRootStack } from "@configs/navigate";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "@screens/login";
import { OnBoardingScreen } from "@screens/onboarding";
import { useAppStore } from "@states/app";
import AppTabs from "navigators/app";

const Stack = createNativeStackNavigator<TRootNavigation>();

export const RootStack = () => {
  const { logged } = useAppStore();
  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
      { !logged && (
        <Stack.Screen
          name={NAVIGATION.Onboarding.path as TRootStack}
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name={NAVIGATION.App.path as TRootStack}
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.Auth.path as TRootStack}
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
