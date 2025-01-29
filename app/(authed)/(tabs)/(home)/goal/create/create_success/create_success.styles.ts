import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GoalCreatedBackground,
    flex: 1,
    paddingTop: "30%",
  },
  topContainer: {
    flex: 0.65,
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black tint with some transparency
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: colors.GoalCreatedBackground,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 2,
    alignItems: "center",
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
  multipleActionContainer: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.PrimarySecondaryPurpleDropShadow,
    marginVertical: 6,
    borderColor: colors.PrimaryWhite,
    borderWidth: 2,
  },
});
