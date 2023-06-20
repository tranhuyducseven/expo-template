import { SocialAuthGroupComponent } from "@components/SocialAuthGroupComponent";
import { useNavigation } from "@react-navigation/native";
import { useAccountStore } from "@states/account";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAppTheme } from "theme";

export const AuthScreen: IComponent = () => {
  const navigation = useNavigation();
  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAccountStore();
  const theme = useAppTheme();

  const handlePressLogin = () => {
    handleLogin(accountID, password, navigation);
  };
  return (
    <View>
      <View style={styles().logoWrapper}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("@assets/logo.png")}
        />
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Text
          variant="displaySmall"
          style={{ color: "black", fontWeight: "500" }}
        >
          ZUNI CLIENT
        </Text>
        <Text
          variant="headlineSmall"
          style={{
            fontWeight: "500",
            marginTop: 12,
            marginBottom: 12,
            color: "black",
          }}
        >
          Login
        </Text>

        <View>
          <TextInput
            mode="outlined"
            label="Account ID"
            value={accountID}
            onChangeText={(text) => setAccountID(text)}
            right={<TextInput.Icon icon="account-circle-outline" />}
          />
          <TextInput
            secureTextEntry={!showPassword}
            style={{ marginTop: 12 }}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            right={
              <TextInput.Icon
                icon="eye-outline"
                onPress={() => setShowPassword((prev) => !prev)}
              />
            }
          />
          <Text
            variant="bodyMedium"
            style={{
              marginTop: 12,
              color: "blue",
              fontWeight: "400",
              textAlign: "right",
            }}
          >
            Forgot password?
          </Text>
        </View>

        <View>
          <View style={{ marginTop: 12, flexDirection: "row" }}>
            <Button
              mode="contained"
              onPress={() => handlePressLogin()}
              style={{ backgroundColor: theme.colors.teal600, marginRight: 12 }}
            >
              <Text
                variant="titleSmall"
                style={{ fontWeight: "bold", color: "white" }}
              >
                Login
              </Text>
            </Button>
          </View>

          <Text style={{ marginTop: 24, color: "black", fontWeight: "400" }}>
            or login by
          </Text>

          <View style={{ marginTop: 12 }}>
            <SocialAuthGroupComponent />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    logoWrapper: {
      paddingHorizontal: 40,
      paddingBottom: 40,
      paddingTop: 60,
    },
  });
