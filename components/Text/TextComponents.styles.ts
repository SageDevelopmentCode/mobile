import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.DarkPrimaryText,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.DarkPrimaryText,
  },
  heading: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.DarkPrimaryText,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.DarkPrimaryText,
  },
  paragraph: {
    fontSize: 14,
    color: colors.DarkPrimaryText,
  },
  buttonText: {
    fontSize: 13,
    color: colors.DarkPrimaryText,
  },
  statText: {
    fontSize: 13,
    color: colors.PrimaryWhite,
  },
});
