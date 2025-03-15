import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
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
  },
  card: {
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.ZoneOneBattleCardBackground,
    overflow: "hidden",
    marginRight: 20,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
  },
  chestImage: {
    height: "45%",
    marginBottom: 15,
  },
  textContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.PrimaryWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
