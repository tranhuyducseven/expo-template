import { View } from "react-native";

/**
 * 
 * @description use this layout to wrap your screen
 * @returns 
 */

export const DefaultLayout: IComponent = ({ children }) => {

  return (
    <View>
      <>{children}</>
    </View>
  );
};
