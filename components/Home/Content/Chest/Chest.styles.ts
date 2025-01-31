import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chestContainer: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
  },
  chest: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DarkPurpleBackground,
    borderWidth: 3,
    borderColor: colors.PrimaryPurpleBackground,
    marginRight: 10,
  },
  chestImage: {
    width: "95%",
    height: "95%",
  },
});
