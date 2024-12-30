import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.PrimaryWhite,
    width: "100%",
  },
  hero: {
    flex: 0.2,
    width: "100%",
    backgroundColor: colors.LightBrownBackground,
  },
  version: {
    justifyContent: "space-between",
  },
});
