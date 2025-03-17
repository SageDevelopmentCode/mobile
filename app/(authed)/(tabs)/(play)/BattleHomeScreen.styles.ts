import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ZoneOneBattleHomeBackground,
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
  characterImage: {
    height: "65%",
  },
  character: {
    height: "100%",
  },
  tabContainer: {
    padding: 0,
    paddingHorizontal: "5%",
    paddingVertical: 0,
    height: 140,
    alignItems: "center",
    margin: 0,
  },
  startBattleButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: colors.ZoneOneBattleButtonBackground,
    shadowColor: colors.ZoneOneBattleButtonDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 10,
    marginTop: 10,
  },
});
