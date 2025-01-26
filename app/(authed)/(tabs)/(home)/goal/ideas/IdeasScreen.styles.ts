import { ImageBackground, StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.IdeasPrimaryBackground,
    flex: 1,
    paddingTop: "20%",
  },
  topContainer: {
    paddingHorizontal: "5%",
    flex: 0.65,
  },
  contentContainer: {
    width: "100%",
  },
  imageBackground: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  buttonContainer: {},
});
