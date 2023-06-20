import { ScrollViewComponent } from "@components/ScrollViewComponent";
import { baseStyles } from "@screens/baseStyle";
import { useAccountStore } from "@states/account";
import { useDegreesStore } from "@states/degrees";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, List, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { AppTheme, useAppTheme } from "theme";

export const HomeScreen: IComponent = () => {
  const theme = useAppTheme();
  const { accountId, role } = useAccountStore();
  const [expanded, setExpanded] = useState(false);
  const { accessToken } = useAccountStore();
  const { fetchAllDegrees, degrees } = useDegreesStore();
  const fetchData = useCallback(async () => {
    if (!accessToken) return;
    fetchAllDegrees(accessToken);
  }, [accessToken, fetchAllDegrees]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePress = () => setExpanded(!expanded);
  const renderDegree = useMemo<React.ReactNode>(
    () => (
      <View
        style={{
          paddingLeft: 0,
          paddingBottom: 12,
        }}
      >
        <List.Section style={{ padding: 0, margin: 0 }}>
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Student Id:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].holderId}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Name:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].holderName.en}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Date of birth:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {new Date(
                    degrees?.[0]?.dateOfBirth ?? ""
                  ).toLocaleDateString()}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Faculty:{" "}
                <Text
                  numberOfLines={2}
                  lineBreakMode="tail"
                  style={{ fontWeight: "bold" }}
                >
                  {degrees?.[0].faculty.en}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Major:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].major.en}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Degree classification:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].classification.en}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Mode of study:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].modeOfStudy.en}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Date of issue:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {new Date(
                    degrees?.[0]?.dateOfIssue ?? ""
                  ).toLocaleDateString()}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Number:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].serialNumber}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
          <List.Item
            style={{ marginLeft: -60 }}
            title={
              <Text>
                Registration number:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {degrees?.[0].referenceNumber}
                </Text>
              </Text>
            }
            left={() => (
              <List.Icon icon="check-circle" color={theme.colors.teal600} />
            )}
          />
        </List.Section>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <Image
              style={{ width: 75, height: 75 }}
              source={require("@assets/hcmut.png")}
            />
            <Image
              style={{ width: 50, height: 50, marginRight: 12 }}
              source={require("@assets/logo.png")}
            />
          </View>
          <View
            style={{
              borderWidth: 3,
              borderColor: theme.colors.teal600,
              width: "auto",
              marginLeft: 12,
              padding: 12,
            }}
          >
            <QRCode
              size={150}
              value={JSON.stringify(degrees?.[0])}
              logoSize={50}
              logoBackgroundColor="transparent"
            />
          </View>
        </View>
      </View>
    ),
    [degrees, theme.colors.teal600]
  );

  return (
    <View style={baseStyles(theme).homeContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button buttonColor={theme.colors.gray100}>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "bold",
              color: theme.colors.gray600,
            }}
          >
            Hello,{" "}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "bold",
              marginBottom: 12,
              color: theme.colors.teal600,
            }}
          >
            {accountId}
          </Text>
        </Button>
        <Image
          style={{
            width: 60,
            height: 60,
            borderWidth: 3,
            borderRadius: 100,
            borderColor: "black",
            marginHorizontal: 12,
          }}
          source={{
            uri: `https://pub-a3633e0d2fd446d7a5b3581d1f906c0f.r2.dev/${role?.toLowerCase()}/${"1911071"}.png`,
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          variant="titleLarge"
          style={{
            fontWeight: "bold",
            marginBottom: 12,
            color: theme.colors.gray600,
          }}
        >
          Your degrees
        </Text>
        <ScrollViewComponent>
          <List.Section style={{ padding: 0, margin: 0 }}>
            <List.Accordion
              style={{
                backgroundColor: theme.colors.teal50,
                borderWidth: 2,
                borderColor: theme.colors.teal600,
                borderRadius: 8,
              }}
              title={
                <Text
                  style={{
                    color: "black",
                  }}
                >
                  Bachelor of degree
                </Text>
              }
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="certificate"
                  theme={theme}
                  color={expanded ? theme.colors.teal600 : theme.colors.gray600}
                  style={{ marginLeft: 0 }}
                />
              )}
              expanded={expanded}
              onPress={handlePress}
            >
              <List.Item
                centered={false}
                style={{
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: theme.colors.teal600,
                  borderRadius: 8,
                  marginTop: 12,
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  padding: 0,
                }}
                theme={theme}
                title={
                  degrees && degrees?.length > 0
                    ? renderDegree
                    : "No degrees to show"
                }
                // title={"fsdf"}
              />
            </List.Accordion>
          </List.Section>
        </ScrollViewComponent>
      </View>
    </View>
    // </ScrollViewComponent>
  );
};

//eslint-disable-next-line
const styles = (theme: AppTheme) => StyleSheet.create({});
