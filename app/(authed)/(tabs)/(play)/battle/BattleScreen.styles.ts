import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ZoneOneBattleBackground,
    width: "100%",
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageBackground: {
    height: height * 0.52, // Convert flex ratio to fixed height
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  charactersContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
  },
  characterImage: {
    height: height * 0.2,
    width: width * 0.4,
  },
  character: {
    height: "100%",
    width: "100%",
  },
  characterName: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 5,
    paddingHorizontal: 10, // Use paddingHorizontal instead of padding to avoid unnecessary vertical padding
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center", // Align items vertically in the center
    marginTop: 10,
    alignSelf: "center", // This will make the View only as wide as its content
  },
});
