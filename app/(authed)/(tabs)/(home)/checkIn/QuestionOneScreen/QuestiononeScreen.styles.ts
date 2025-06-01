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
      paddingTop: 20,
      paddingBottom: 40,
    },
    backButtonContainer: {
      width: "100%",
      alignItems: "flex-start",
      marginBottom: 30,
    },
    backButton: {
      padding: 8,
    },
    header: {
      alignItems: "flex-start",
      marginBottom: 60,
      width: "100%",
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "left",
    },
    question: {
      fontSize: 18,
      textAlign: "left",
      lineHeight: 24,
    },
    emojiGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 60,
    },
    emojiOption: {
      width: "31%",
      aspectRatio: 0.85,
      backgroundColor: "#33826A",
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      shadowColor: "#24604E",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 6,
      padding: 16,
    },
    emojiOptionSelected: {
      backgroundColor: "#2A6B56",
      shadowColor: "#1F4A3D",
    },
    emojiImage: {
      marginBottom: 12,
    },
    emojiLabel: {
      color: colors.PrimaryWhite,
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
      lineHeight: 16,
    },
    actionContainer: {
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: "auto",
    },
    nextButton: {
      backgroundColor: colors.PrimaryWhite,
      paddingHorizontal: 48,
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
      minWidth: 140,
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
