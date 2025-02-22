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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    height: 700, // Adjust as needed
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden", // Ensures the image follows border radius
  },
  menuImageBackground: {
    flex: 1, // Fill the parent container
    position: "relative",
  },
  dialogOverlay: {
    position: "absolute",
    top: "25%", // Adjust as needed
    left: "50%",
    transform: [{ translateX: -155 }, { translateY: -50 }],
    backgroundColor: colors.DarkPurpleButton,
    borderRadius: 10,
    width: 310,
    zIndex: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  dialogImageContainer: {
    padding: 15,
    width: "40%",
    backgroundColor: colors.DarkPurpleButtonDropShadow,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dialogBox: {
    padding: 15,
    borderRadius: 10,
    width: "60%",
  },
  dialogClose: {
    position: "absolute",
    top: 15,
    right: 15,
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
  },
  character: {
    height: "100%",
  },
  menuCharacter: {
    height: "85%", // Adjust size as needed
    resizeMode: "contain",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  characterTypeContainer: {
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.DarkPurpleButtonDropShadow,
    shadowColor: colors.DarkPurpleButtonDropShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    width: 140,
    padding: 0,
    height: 40,
    overflow: "hidden",
  },
  typeImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DarkPurpleButtonDropShadow,
    paddingHorizontal: 5,
    width: "35%",
  },
  typeTextContainer: {
    backgroundColor: colors.DarkPurpleButton,
    width: "65%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  typeImageWrapper: {
    shadowColor: "rgba(0, 186, 205, 0.25)", // Matches the drop-shadow color
    shadowOffset: { width: 0, height: 4 }, // Mimics (0px, 4px)
    shadowOpacity: 0.25, // Matches the opacity
    shadowRadius: 20, // Matches the 20px blur
    elevation: 5, // Required for Android shadow
  },
  typeImage: {
    width: 37,
    height: 32,
  },
  dialogImage: {
    width: 107,
    height: 102,
  },
  menuContentContainer: {
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  chestRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.PrimaryWhite,
  },
  tabText: {
    fontSize: 14,

    fontWeight: "bold",
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
