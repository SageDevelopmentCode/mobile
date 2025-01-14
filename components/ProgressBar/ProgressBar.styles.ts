import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    height: 30,
    padding: 3,
  },
  progress: {
    height: "100%",
    borderRadius: 20,
  },
  outerContainer: {
    width: "100%",
    borderRadius: 22, // Slightly larger than the inner container's radius
    borderWidth: 5,
    borderColor: colors.DarkPrimaryText,
    position: relative,
  },
});
