import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dialogOverlay: {
    position: "absolute",
    top: "25%", // Adjust as needed
    left: "50%",
    transform: [{ translateX: -155 }, { translateY: -50 }],
    backgroundColor: colors.DarkPurpleButton,
    borderRadius: 10,
    width: 310,
    zIndex: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  dialogImageContainer: {
    padding: 15,
    width: "40%",
    backgroundColor: colors.DarkPurpleButtonDropShadow,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dialogBox: {
    padding: 15,
    borderRadius: 10,
    width: "60%",
  },
  dialogClose: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  dialogImage: {
    width: 107,
    height: 102,
  },
});
