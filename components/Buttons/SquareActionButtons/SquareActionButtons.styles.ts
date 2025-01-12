import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  squareButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  PrimaryGrayButton: {
    backgroundColor: colors.PrimaryGrayBackground,
    shadowColor: colors.PrimaryGrayDropShadow,
    shadowOffset: { width: 0, height: 3 },
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
    fontSize: 18,
    fontWeight: "600",
  },
  WhiteText: {
    color: colors.PrimaryWhite,
  },
  DarkBrownText: {
    color: "#9E6329",
  },
  DarkNavyText: {
    color: "#4B5563",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  dangerText: {
    color: "#FFFFFF",
  },
});
