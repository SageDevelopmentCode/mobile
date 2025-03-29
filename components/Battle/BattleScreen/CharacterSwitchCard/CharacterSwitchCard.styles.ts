import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    height: 10,
    padding: 2,
  },
  switchCharacter: {
    height: 40,
    width: undefined,
    aspectRatio: 1,
    marginRight: 10,
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
  progress: {
    height: "100%",
    borderRadius: 20,
  },
  characterSwitch: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 150, // Added specific width
    backgroundColor: colors.BattleCharacterSwitch,
    shadowColor: colors.BattleCharacterSwitchDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 10,
  },
  characterTextContainer: {
    justifyContent: "center", // Centers children vertically
  },
});
