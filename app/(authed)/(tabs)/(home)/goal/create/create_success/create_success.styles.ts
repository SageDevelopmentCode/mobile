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
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  character: {
    position: "absolute",
    bottom: 20,
    height: "70%",
    transform: [{ translateX: "4%" }],
  },
  actionContainer: {
    width: "100%",
    paddingHorizontal: 23,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.PrimarySecondaryPurpleDropShadow,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    borderColor: colors.PrimaryWhite,
    borderWidth: 2,
  },
});
