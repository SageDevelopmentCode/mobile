import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  difficultyButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.ZoneOneBattleButtonBackground,
    shadowColor: colors.ZoneOneBattleButtonDropShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    borderRadius: 10,
    marginBottom: 20,
  },
});
