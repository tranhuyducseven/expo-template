import classNames from "classnames";

/**
 * Mapping hotkey into className package for better usage
 */
export const cx = classNames;

export const checkExpiredToken = (expiredAt: number) => {
  // expiredAt is in seconds
  // return true if expiredAt is less than current time
  return Date.now() >= expiredAt * 1000;
};

export const capitalizeFirstLetter = (str: string) => {
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const formatAddress = (address: string): string => {
  if (address.length < 20) {
    return address;
  }
  const start = address.slice(0, 8);
  const end = address.slice(-8);
  const separator = "...";
  return start + separator + end;
};
