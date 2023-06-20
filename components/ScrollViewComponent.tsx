import { ScrollView } from "react-native";

export const ScrollViewComponent: IComponent = ({ children }) => {
  return (
    <ScrollView
      style={{ paddingBottom: 200, marginBottom: 200 }}
      scrollIndicatorInsets={{ right: 10, bottom: 10, left: 10, top: 10 }}
    >
      {children}
    </ScrollView>
  );
};
