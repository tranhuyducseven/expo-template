import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { AppTheme } from "theme";

interface CustomProps {
  theme: AppTheme;
}
const BottomBar: React.FC<BottomTabBarProps & CustomProps> = ({
  state,
  descriptors,
  navigation,
  theme,
}) => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level1);
  }, [theme]);
  const getIcon = (icon: string, solid = false) => {
    return ({
      Home: solid ? "home" : "home-outline",
      Scans: "qrcode-scan",
      DIDs: "link-variant",
      Settings: solid ? "account" : "account-outline",
    }[icon] || "run") as
      | "account-group"
      | "account-group-outline"
      | "text-box-check"
      | "text-box-check-outline"
      | "run"
      | "file-document-edit"
      | "file-document-edit-outline"
      | "account"
      | "account-outline"
      | "plus-circle"
      | "plus-circle-outline";
  };
  const getIconSize = () => {
    return 30;
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderTopColor: theme.colors.onTertiary,
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        overflow: "hidden",
        backgroundColor: theme.colors.surface,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const labelStr = label as string;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={{
              flex: 1,
              overflow: "hidden",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <TouchableRipple
              rippleColor={theme.colors.teal100}
              onPress={onPress}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                borderRadius: 70,
                width: "100%",
              }}
              key={index}
              borderless
            >
              <MaterialCommunityIcons
                size={getIconSize()}
                name={getIcon(labelStr, isFocused)}
                color={!isFocused ? theme.colors.outline : theme.colors.teal600}
              />
            </TouchableRipple>
          </View>
        );
      })}
    </View>
  );
};

export default BottomBar;
