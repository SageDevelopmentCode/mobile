import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getCharacterSwitchMenuStyles = (activeCharacter = "Deborah") => {
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
    },
    menuScrollViewContainer: {
      flexGrow: 1,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingBottom: 40,
    },
    characterSwitchMenuContentContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: "8%",
      paddingHorizontal: "4%",
    },
  });
};
