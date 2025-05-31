import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getStyles = (activeCharacter: string) => {
  const isDeborah = activeCharacter === "Deborah";

  return StyleSheet.create({
    goalContainer: {
      width: "100%",
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 25,
      backgroundColor: "rgba(75, 85, 99, 0.15)", // Neutral dark gray instead of character-specific colors
      shadowColor: "rgba(75, 85, 99, 0.3)", // Neutral shadow color
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
      backgroundColor: isDeborah
        ? "rgba(255, 255, 255, 0.2)" // Lighter background for Deborah's theme
        : "rgba(255, 255, 255, 0.25)", // Light background for other themes
      flexShrink: 0,
    },
    goalLeftContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexShrink: 1,
      flex: 1,
      marginRight: 10,
    },
    goalRightContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      flexShrink: 0,
    },
  });
};
