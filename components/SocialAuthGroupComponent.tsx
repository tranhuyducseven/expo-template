import { View } from "react-native";

import { AppleSVGComponent } from "./icons/AppleSVG";
import { FacebookSVGComponent } from "./icons/FacebookSVG";
import { GoogleSVGComponent } from "./icons/GoogleSVG";

export const SocialAuthGroupComponent: IComponent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 148,
      }}
    >
      <FacebookSVGComponent />
      <GoogleSVGComponent />
      <AppleSVGComponent />
    </View>
  );
};
