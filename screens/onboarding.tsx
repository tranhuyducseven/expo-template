import { NAVIGATION } from "@configs/navigate";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "@states/app";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Button, Text } from "react-native-paper";
import { useAppTheme } from "theme";

export const OnBoardingScreen: IComponent = () => {
  // const theme = useAppTheme();
  const navigation = useNavigation();
  const { darkMode } = useAppStore();
  const theme = useAppTheme();
  const Done = () => (
    <Button
      mode="contained-tonal"
      style={{ backgroundColor: theme.colors.teal600, marginRight: 12 }}
      onPress={() => navigation.navigate(NAVIGATION.App.path as never)}
    >
      <Text variant="titleSmall" style={{ color: "white", fontWeight: "bold" }}>
        Start
      </Text>
    </Button>
  );

  return (
    <Onboarding
      DoneButtonComponent={Done}
      bottomBarColor="#fff"
      onSkip={() => navigation.navigate(NAVIGATION.App.path as never)}
      bottomBarHeight={80}
      transitionAnimationDuration={500}
      skipLabel={<Text style={{ color: theme.colors.teal600 }}>Skip</Text>}
      nextLabel={<Text style={{ color: theme.colors.teal600 }}>Next</Text>}
      pages={[
        {
          backgroundColor: darkMode === "dark" ? "#000" : "#fff",
          image: (
            <Image
              style={{ width: 150, height: 150 }}
              source={require("@assets/logo.png")}
            />
          ),
          title: "Welcome to Zuni!",
          subtitle:
            "A Blockchain-Enabled Platform for Privacy-Preserving Electronic Certification",
        },

        {
          backgroundColor: darkMode === "dark" ? "#000" : "#fff",
          image: (
            <Image
              style={{ width: 150, height: 150 }}
              source={require("@assets/img/onboarding/1.png")}
            />
          ),
          title: "The future of electronic credentials",
          subtitle:
            "Zuni creates a tamper-proof, decentralized ledger of verified credentials that can be accessed securely and conveniently by both students and employers",
        },
        {
          backgroundColor: darkMode === "dark" ? "#000" : "#fff",
          image: (
            <Image
              style={{ width: 150, height: 150 }}
              source={require("@assets/img/onboarding/2.png")}
            />
          ),
          title: "How Zuni helps employers \nmake confident hiring decisions",
          subtitle:
            "Employers can quickly and confidently verify the credentials of potential hires",
        },

        {
          backgroundColor: darkMode === "dark" ? "#000" : "#fff",
          image: (
            <Image
              style={{ width: 150, height: 150 }}
              source={require("@assets/img/onboarding/3.png")}
            />
          ),
          title: "The power of ZKPs in \nprotecting student data",
          subtitle:
            "The Zero-Knowledge Proofs ensures that sensitive information is never disclosed unnecessarily, preserving the privacy and security of students personal data",
        },
      ]}
    />
  );
};
