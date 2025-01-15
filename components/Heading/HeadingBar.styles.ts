import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.PrimaryGrayDropShadow,
    borderRadius: 5,
  },
  headingText: {
    marginHorizontal: 10,
  },
});
