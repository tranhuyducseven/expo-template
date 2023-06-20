import { proveProofApi, sendProofApi } from "@apis/zksnark";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { baseStyles } from "@screens/baseStyle";
import { useAccountStore } from "@states/account";
import { useDegreesStore } from "@states/degrees";
import { useStudentStore } from "@states/students";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Button, Text } from "react-native-paper";
import { AppTheme, useAppTheme } from "theme";

export const ScanScreen: IComponent = () => {
  const { accessToken, accountId } = useAccountStore();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSent, setSent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [verifiedDegreePayload, setVerifiedDegreePayload] =
    useState<ISendProofBody | null>(null);
  const { degrees } = useDegreesStore();
  const { handleGetInfo, student } = useStudentStore();
  const theme = useAppTheme();

  useEffect(() => {
    if (!accessToken || !accountId) return;
    handleGetInfo(accessToken);
  }, [accessToken, accountId, handleGetInfo]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      if (!hasPermission) {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    };

    getBarCodeScannerPermissions();
  }, [hasPermission]);

  const handleSubmitCredentials = async () => {
    if (scanned && data && accessToken && degrees && degrees.length > 0) {
      setLoading(true);

      const provedRes = await proveProofApi(accessToken, degrees[0].id);
      try {
        if (provedRes.status === 200) {
          if (provedRes.data && student && data && data.endpoint) {
            setLoading(false);
            setIsSubmitted(true);
            setVerifiedDegreePayload({
              holderDID: student.DID,
              proof: provedRes.data.proof,
              publicSignals: provedRes.data.publicSignals,
            });
            setMessage("Your proof has been created");
            setShowMessage(true);
          }
        }
      } catch (e) {
        alert("Verification failed");
        setLoading(false);
      }
      setLoading(false);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleSendProofToVerifier = async () => {
    setLoading(true);
    const verifierDID = data?.endpoint.split("/").pop();
    if (verifiedDegreePayload && data && accessToken && verifierDID) {
      const res = await sendProofApi(
        accessToken,
        verifiedDegreePayload,
        verifierDID
      );
      try {
        if (res.status === 200) {
          setLoading(false);
          setSent(true);
          setMessage("Verification success");
          setShowMessage(true);
        }
      } catch (e) {
        alert("Send proofs failed");
        setLoading(false);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClearVerification = () => {
    setData(null);
    setScanned(false);
    setIsSubmitted(false);
    setSent(false);
    setLoading(false);
  };

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setData(JSON.parse(data));
    setIsSubmitted(false);
    setSent(false);
  };

  if (hasPermission === null) {
    return (
      <View style={baseStyles(theme).homeContainer}>
        <Text variant="displaySmall">Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={baseStyles(theme).homeContainer}>
        <Text variant="displaySmall">No access to camera</Text>{" "}
      </View>
    );
  }
  return (
    <View style={baseStyles(theme).homeContainer}>
      {!scanned && (
        <>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              marginVertical: 20,
              color: theme.colors.gray600,
            }}
          >
            Scan QR code to verify your proofs
          </Text>
          <View
            style={{
              height: "80%",
              borderRadius: 40,
              overflow: "hidden",
              paddingVertical: 40,
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject]}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
        </>
      )}

      {scanned && (
        <View>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              marginVertical: 20,
              color: theme.colors.gray600,
            }}
          >
            Accept to verify your proofs
          </Text>
          {data && (
            <View>
              <View style={styles(theme).cardRequest}>
                <Text variant="titleLarge">
                  Verified request&lsquo;s metadata
                </Text>
                {
                  <View
                    style={{
                      marginTop: 12,
                    }}
                  >
                    <Text variant="titleSmall">
                      Name: {data?.name ?? "FPT Software"}
                    </Text>
                    <Text variant="titleSmall">
                      DID: {data?.endpoint.split("/").pop()}
                    </Text>
                    <Text variant="titleSmall">
                      Type: {"Bachelor of degree"}
                    </Text>
                  </View>
                }
              </View>
              <View style={styles(theme).cardDegree}>
                <Text variant="titleLarge">Bachelor of degree</Text>
                <Text variant="titleSmall">
                  Bachelor&lsquo;s Id: {degrees?.[0].id}
                </Text>
                <Text variant="titleSmall">
                  Student ID: {degrees?.[0].holderId}
                </Text>
                <Text variant="titleSmall">
                  Issuer : {degrees?.[0].issuer.en}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text variant="titleSmall">
                      {new Date("12-02-2001").toDateString()}
                    </Text>
                    <Avatar.Icon
                      size={24}
                      icon="check"
                      color={"white"}
                      style={{
                        backgroundColor: theme.colors.teal600,
                        marginLeft: 8,
                      }}
                    />
                    <Text variant="titleSmall" style={{ marginLeft: 8 }}>
                      Valid
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Image
                      style={{ width: 75, height: 75 }}
                      source={require("@assets/hcmut.png")}
                    />
                    <Image
                      style={{
                        width: 55,
                        height: 55,
                        marginLeft: 12,
                        marginBottom: 10,
                      }}
                      source={require("@assets/logo.png")}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 12,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => handleClearVerification()}
                  buttonColor={theme.colors.gray500}
                  style={{ flexGrow: 1, marginRight: 8 }}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={
                    !isSubmitted
                      ? () => handleSubmitCredentials()
                      : () => handleSendProofToVerifier()
                  }
                  buttonColor={
                    !isSubmitted ? theme.colors.teal600 : theme.colors.indigo800
                  }
                  style={{
                    flexGrow: 1,
                  }}
                  disabled={isSubmitted && isSent}
                >
                  {loading ? (
                    <ActivityIndicator animating={true} color="white" />
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <Text style={{ color: "white", marginRight: 5 }}>
                        {!isSubmitted
                          ? "Create your proof"
                          : "Continue to send to verifier"}
                      </Text>
                      <MaterialCommunityIcons
                        color={"white"}
                        name={!isSubmitted ? "plus-circle" : "send"}
                        size={20}
                      />
                    </View>
                  )}
                </Button>
              </View>
            </View>
          )}
          <View style={{ marginTop: 12, alignItems: "center" }}>
            {isSubmitted && !loading && showMessage && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar.Icon
                  size={50}
                  icon="check"
                  color={theme.colors.teal600}
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 8,
                  }}
                />
                <Text variant="titleMedium">{message}</Text>
              </View>
            )}
          </View>
          <View style={{ marginTop: 4 }}>
            <Button
              onPress={() => setScanned(false)}
              textColor={theme.colors.teal600}
            >
              {" "}
              Tap to Scan Again
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    cardRequest: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 8,
      marginTop: 12,
      padding: 12,
    },
    cardDegree: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: theme.colors.teal600,
      borderRadius: 8,
      marginTop: 12,
      padding: 12,
    },
  });
