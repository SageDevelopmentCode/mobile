import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const getCheckInCompleteScreenStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.CheckInGreen,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 40,
      justifyContent: "space-between",
    },
    centeredContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emojiContainer: {
      marginBottom: 32,
    },
    celebratingEmoji: {
      alignSelf: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 48,
    },
    rewardsContainer: {
      width: "100%",
      gap: 16,
    },
    rewardItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      minHeight: 60,
    },
    rewardIconContainer: {
      marginRight: 16,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    rewardIcon: {
      width: 50,
      height: 50,
      resizeMode: "contain",
    },
    rewardText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.PrimaryWhite,
      flex: 1,
    },
  });
};
