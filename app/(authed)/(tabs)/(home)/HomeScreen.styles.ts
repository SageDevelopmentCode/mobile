import { Dimensions, StyleSheet } from "react-native";
import colors from "@/constants/colors";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DarkPurpleBackground,
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageContainer: {
    flex: 0.57,
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  imageBackground: {
    height: height * 0.57, // Convert flex ratio to fixed height
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
    position: "relative",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: "12%",
    paddingHorizontal: "4%",
  },
  contentContainer: {
    flex: 0.43,
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  scrollableContainer: {
    marginTop: 60,
  },
  characterImage: {
    height: "75%",
    alignSelf: "center",
  },
  character: {
    height: "100%",
  },
  chestRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chestContainer: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
  },
  chest: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DarkPurpleBackground,
    borderWidth: 3,
    borderColor: colors.PrimaryPurpleBackground,
    marginRight: 10,
  },
  weeklyChest: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DarkPurpleBackground,
    borderWidth: 3,
    borderColor: colors.PrimaryBlue,
    marginRight: 10,
  },
  chestImage: {
    width: "95%",
    height: "95%",
  },
  goalContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.DarkPurpleButton,
    shadowColor: colors.DarkPurpleButtonDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  goalEmoji: {
    width: 40,
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: colors.EmojiGrayBackground,
  },
  goalLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  goalRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
