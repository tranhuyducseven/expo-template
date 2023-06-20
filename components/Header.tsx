import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, Text } from "react-native-paper";

export function CustomHeader(props: NativeStackHeaderProps) {
  return (
    <Appbar.Header mode="center-aligned" elevated>
      {props.options.headerBackVisible && (
        <Appbar.BackAction
          onPress={() => {
            props.navigation.canGoBack() ? props.navigation.goBack() : null;
          }}
        />
      )}
      <Appbar.Content
        title={
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", textAlignVertical: "center" }}
          >
            {props.options.title}
          </Text>
        }
      />
    </Appbar.Header>
  );
}
