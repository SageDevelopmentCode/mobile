import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heroBar: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20, // Use paddingHorizontal instead of padding to avoid unnecessary vertical padding
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Align items vertically in the center
  },
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
    backgroundColor: colors.ZoneOneBattleText,
    borderRadius: 5,
  },
  headingText: {
    marginHorizontal: 10,
  },
});
