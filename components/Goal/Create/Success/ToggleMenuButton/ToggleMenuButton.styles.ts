import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
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
