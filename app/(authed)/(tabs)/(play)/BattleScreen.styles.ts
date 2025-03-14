import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ZoneOneBattleBackground,
    width: "100%",
  },
  imageBackground: {
    height: height * 0.57, // Convert flex ratio to fixed height
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  characterImage: {
    height: "75%",
  },
  character: {
    height: "100%",
  },
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
