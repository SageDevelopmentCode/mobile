import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getCharacterMenuStyles = (activeCharacter: string) => {
  const isDeborah = activeCharacter === "Deborah";

  return StyleSheet.create({
    menu: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "85%",
      backgroundColor: isDeborah
        ? colors.DarkPurpleBackground
        : colors.GabrielBackground,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      zIndex: 25,
      overflow: "hidden",
    },
    menuScrollViewContainer: {
      flexGrow: 1,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingBottom: 40,
    },
    menuImageContainer: {
      width: "100%",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      overflow: "hidden", // Ensures the image follows border radius
    },
    menuImageBackground: {
      height: 300,
      position: "relative",
    },
    menuCharacter: {
      width: "60%",
      height: "85%",
      resizeMode: "contain",
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
    },
    menuContentContainer: {
      width: "100%",
      paddingHorizontal: "4%",
      paddingTop: 10,
      alignItems: "center",
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
    typeImage: {
      width: 37,
      height: 32,
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
      backgroundColor: "#353547",
    },
    activeTab: {
      backgroundColor: isDeborah
        ? colors.PrimaryPurpleBackground
        : colors.SolaraGreen,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });
};
