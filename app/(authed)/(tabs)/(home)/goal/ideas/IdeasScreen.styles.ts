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
    marginTop: "30%",
  },
  imageBackground: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  buttonRow: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
