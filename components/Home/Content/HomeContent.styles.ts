import { StyleSheet } from "react-native";

export const getHomeContentStyles = () => {
  return StyleSheet.create({
    contentContainer: {
      flex: 0.43,
      width: "100%",
      alignItems: "center",
      paddingHorizontal: "4%",
      backgroundColor: "transparent",
      paddingBottom: 20,
    },
    chestRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    sectionDivider: {
      width: "100%",
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      marginVertical: 20,
    },
  });
};
