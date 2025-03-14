import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.ZoneOneBattleBackground,
    width: "100%",
    flexGrow: 1,
    paddingBottom: 100,
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
  tabContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  card: {
    width: 85,
    height: 110,
    borderRadius: 10,
    backgroundColor: colors.ZoneOneBattleCardBackground,
    overflow: "hidden",
    marginRight: 20,
  },
});
