import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getQuestionOneScreenStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.CheckInGreen,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    header: {
      alignItems: "center",
      marginBottom: 60,
    },
    greeting: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
    },
    question: {
      fontSize: 18,
      textAlign: "center",
      lineHeight: 24,
    },
    emojiGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginBottom: 60,
    },
    emojiOption: {
      width: "30%",
      aspectRatio: 1,
      backgroundColor: "#33826A",
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      shadowColor: "#24604E",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
      padding: 12,
    },
    emojiOptionSelected: {
      backgroundColor: "#2A6B56",
      shadowColor: "#1F4A3D",
    },
    emojiImage: {
      width: 40,
      height: 40,
      marginBottom: 8,
    },
    emojiLabel: {
      color: colors.PrimaryWhite,
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
      lineHeight: 14,
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: "auto",
    },
    closeButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.PrimaryWhite,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    closeButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#666",
    },
    nextButton: {
      backgroundColor: colors.PrimaryWhite,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 25,
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
      minWidth: 100,
    },
    nextButtonDisabled: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.CheckInGreen,
      textAlign: "center",
    },
  });
};
