import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getCharacterSwitchMenuStyles = (activeCharacter = "Deborah") => {
  const isDeborah = activeCharacter === "Deborah";
  const primaryColor = isDeborah
    ? colors.PrimaryPurpleBackground
    : colors.SolaraGreen;

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
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
      overflow: "hidden",
    },
    menuScrollViewContainer: {
      flexGrow: 1,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingBottom: 40,
    },
    characterSwitchMenuContentContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: "4%",
      paddingHorizontal: "6%",
      width: "100%",
    },
    headerContainer: {
      width: "100%",
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 15,
      zIndex: 5,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.PrimaryWhite,
      textAlign: "center",
      letterSpacing: 1.5,
      marginBottom: 12,
      textTransform: "uppercase",
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      marginBottom: 15,
    },
    divider: {
      flex: 1,
      height: 2,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    headerTypeImage: {
      width: 32,
      height: 32,
      marginHorizontal: 15,
    },
    cardsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    decorativeCircle: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: `${primaryColor}15`,
      top: -50,
      right: -50,
      zIndex: 1,
    },
    decorativeCircle2: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: `${primaryColor}10`,
      bottom: 100,
      left: -75,
      zIndex: 1,
    },
  });
};
