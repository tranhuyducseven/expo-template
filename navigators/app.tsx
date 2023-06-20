import BottomBar from "@components/BottomBar";
import { NAVIGATION, TAppNavigation, TAppStack } from "@configs/navigate";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { HomeScreen } from "@screens/home";
import { ScanScreen } from "@screens/scan";
import { SettingsScreen } from "@screens/setting";
import { useAccountStore } from "@states/account";
import { useAppStore } from "@states/app";
import { getExpiredTimeFromAccessToken } from "@utils/auth";
import { checkExpiredToken } from "@utils/tools";
import { useCallback, useEffect } from "react";
import { useAppTheme } from "theme";

const Tab = createBottomTabNavigator<TAppNavigation>();

export default function AppTabs() {
  const { logged, setLogged } = useAppStore();
  // const [loading, setLoading] = useState(true);

  const { accessToken, handleLogout } = useAccountStore();
  const navigation = useNavigation();
  const preCheck = useCallback(async () => {
    if (!accessToken) {
      navigation.navigate(NAVIGATION.Auth.path as never);
      // setLoading(false);
      return;
    }

    try {
      const { expiredAt } = await getExpiredTimeFromAccessToken(accessToken);
      if (checkExpiredToken(expiredAt)) {
        handleLogout();
        navigation.navigate(NAVIGATION.Auth.path as never);
        // setLoading(false);
        return;
      }
    } catch (e) {
      navigation.navigate(NAVIGATION.Auth.path as never);
      // setLoading(false);
    }
    navigation.navigate(NAVIGATION.App.path as never);
    // setLoading(false);
  }, [accessToken, handleLogout, navigation]);

  useEffect(() => {
    preCheck();
  }, [preCheck]);
  useEffect(() => {
    if (!logged) {
      setLogged(true);
    }
  }, [logged, setLogged]);
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION.Home.path as TAppStack}
      backBehavior="initialRoute"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} theme={theme} />}
    >
      <Tab.Screen
        name={NAVIGATION.Home.path as TAppStack}
        component={HomeScreen}
      />
      <Tab.Screen
        name={NAVIGATION.Scans.path as TAppStack}
        component={ScanScreen}
      />
      <Tab.Screen
        name={NAVIGATION.Settings.path as TAppStack}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
