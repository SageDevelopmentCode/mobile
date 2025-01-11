import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: colors.DarkPurpleBackground,
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
  },
  contentContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
});
