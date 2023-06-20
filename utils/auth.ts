import { ACCESS_JWT_SECRET } from "@env";
import JWT from "expo-jwt";

const ROLES: { [key in TRoleKey]: string } = {
  HOLDER: "HOLDER",
  ISSUER: "ISSUER",
  VERIFIER: "VERIFIER",
};

export const decodeAccessToken = (
  accessToken: string
): Promise<{
  payload: any;
}> => {
  let decodedData;

  try {
    decodedData = JWT.decode(accessToken, ACCESS_JWT_SECRET);
  } catch (error) {
    throw new Error("Unauthorized: unsuccessful verify JWT ");
  }

  if (!decodedData || typeof decodedData.payload === "string") {
    throw new Error(`Not have permission`);
  }
  return Promise.resolve({ payload: decodedData });
};

export const getRoleFromAccessToken = async (
  accessToken: string
): Promise<{
  isSuccessful: boolean;
  role: string;
}> => {
  let role;

  try {
    const { payload } = await decodeAccessToken(accessToken);

    if (payload && typeof payload !== "string") {
      role = payload.role;
      if (role !== ROLES.HOLDER) {
        throw new Error(`Invalid role`);
      }
    } else {
      throw new Error(`Invalid payload`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }

  return Promise.resolve({
    isSuccessful: true,
    role: role,
  });
};

export const getExpiredTimeFromAccessToken = async (
  accessToken: string
): Promise<{
  expiredAt: number;
}> => {
  let expiredAt;

  try {
    const { payload } = await decodeAccessToken(accessToken);

    if (payload && typeof payload !== "string") {
      expiredAt = payload?.exp;
      if (!expiredAt) {
        throw new Error(`ExpiredAt not found`);
      }
    } else {
      throw new Error(`Invalid payload`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }

  return Promise.resolve({
    expiredAt,
  });
};
