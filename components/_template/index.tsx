import { Text } from "react-native";

export const TemplateComponent: IComponent<{
  color?: string;
  text: string;
}> = ({ color = "black", text }) => {
  return <Text style={{ color: color }}>{text}</Text>;
};
