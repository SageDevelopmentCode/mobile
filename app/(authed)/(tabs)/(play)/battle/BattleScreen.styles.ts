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
  textRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  menuScrollViewContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    backgroundColor: colors.ZoneOneBattleQuestionMenuBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 25,
  },
  categoryImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: colors.PrimaryWhite,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Adjust based on your needs
    borderRadius: 10, // Optional for rounded corners
  },
});
