import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GoalCreatedBackground,
    flex: 1,
    paddingTop: "20%",
  },
  topContainer: {
    flex: 0.65,
    paddingHorizontal: "5%",
  },
  imageBackground: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    position: "relative",
  },
  character: {
    position: "absolute",
    bottom: 20,
    height: "70%",
    transform: [{ translateX: "4%" }],
  },
});
