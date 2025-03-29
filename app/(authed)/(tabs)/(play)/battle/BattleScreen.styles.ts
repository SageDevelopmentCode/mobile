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
    height: height * 0.48, // Convert flex ratio to fixed height
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
  quitButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.GabrielGoalBackground,
    borderRadius: 12,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.BattleCharacterSwitch,
  },
  confirmButton: {
    backgroundColor: colors.ZoneOneBattleButtonBackground,
  },
});
