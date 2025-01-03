import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  BrightGreenButton: {
    backgroundColor: colors.BrightGreen,
    shadowColor: colors.BrightGreenBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  LightBrownButton: {
    backgroundColor: colors.LightBrown,
    shadowColor: colors.LightBrownBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  PrimaryGreenButton: {
    backgroundColor: colors.GreenPrimary,
    shadowColor: colors.GreenBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  PrimaryBlueButton: {
    backgroundColor: colors.BluePrimary,
    shadowColor: colors.BluePrimaryBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  TransparentButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  PrimaryPurpleButton: {
    backgroundColor: colors.PurplePrimary,
    shadowColor: colors.PurpleBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  PrimaryGrayButton: {
    backgroundColor: colors.GrayButtonPrimary,
    shadowColor: colors.GrayButtonBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  dangerButton: {
    backgroundColor: "#DC3545",
  },
  disabled: {
    backgroundColor: colors.Disabled,
    shadowColor: colors.DisabledBacking,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    color: colors.DisabledText,
  },
  DisabledText: {
    color: colors.DisabledText,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  WhiteText: {
    color: colors.WhiteText,
  },
  BlueText: {
    color: colors.BlueText,
  },
  DarkBrownText: {
    color: "#9E6329",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  dangerText: {
    color: "#FFFFFF",
  },
});
