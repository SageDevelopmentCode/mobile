import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  DarkBrownButton: {
    backgroundColor: colors.DarkBrownBackground,
    shadowColor: colors.DarkBrownDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  LightBrownButton: {
    backgroundColor: colors.LightBrownBackground,
    shadowColor: colors.LightBrownDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  TransparentButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  PrimaryPurpleButton: {
    backgroundColor: colors.PrimaryPurpleBackground,
    shadowColor: colors.PrimaryPurpleDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  PrimaryGrayButton: {
    backgroundColor: colors.PrimaryGrayBackground,
    shadowColor: colors.PrimaryGrayDropShadow,
    shadowOffset: { width: 0, height: 4 },
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    color: colors.DisabledText,
  },
  DisabledText: {
    color: colors.DisabledText,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  WhiteText: {
    color: colors.PrimaryWhite,
  },
  DarkBrownText: {
    color: "#9E6329",
  },
  DarkNavyText: {
    color: colors.DarkPrimaryText,
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  dangerText: {
    color: "#FFFFFF",
  },
});
