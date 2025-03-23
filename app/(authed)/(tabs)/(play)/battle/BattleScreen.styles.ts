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
  progressContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    height: 10,
    padding: 2,
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
    paddingHorizontal: 10,
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
  healthBarContainer: {
    paddingHorizontal: 10,
  },
  progress: {
    height: "100%",
    borderRadius: 20,
  },
  typeImage: {
    width: 37,
    height: 32,
  },
  textRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerBox: {
    backgroundColor: colors.PrimaryWhite,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.BattleTimer,
  },
});
