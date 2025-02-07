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
  menuScrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    width: "100%",
  },
  imageContainer: {
    flex: 0.57,
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black tint with some transparency
    zIndex: 11,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
    backgroundColor: colors.DarkPurpleBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 25,
  },
  imageBackground: {
    height: height * 0.57, // Convert flex ratio to fixed height
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
    position: "relative",
  },
  menuImageContainer: {
    width: "100%",
    height: "70%", // Adjust as needed
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden", // Ensures the image follows border radius
  },
  menuImageBackground: {
    flex: 1, // Fill the parent container
    justifyContent: "center",
    alignItems: "center",
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
  menuCharacter: {
    width: "60%", // Adjust size as needed
    height: "60%", // Adjust size as needed
    resizeMode: "contain",
  },
  chestRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
