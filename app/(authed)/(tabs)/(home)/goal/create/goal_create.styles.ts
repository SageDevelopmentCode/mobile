import { Dimensions, StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryGreenBackground,
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: "5%",
  },
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  emojiSelector: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GreenBackdrop,
    borderRadius: 5,
  },
  goalInput: {
    flex: 1,
    height: 50,
    backgroundColor: colors.GreenBackdrop,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 20,
    fontWeight: "600",
  },
});
