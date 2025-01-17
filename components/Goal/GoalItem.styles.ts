import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  goalContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.DarkPurpleButton,
    shadowColor: colors.DarkPurpleButtonDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  goalEmoji: {
    width: 40,
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: colors.EmojiGrayBackground,
  },
  goalLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  goalRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
