import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const getHeroSectionStyles = () => {
  return StyleSheet.create({
    imageBackground: {
      height: height * 0.57, // Match the original proportional height
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    heroContent: {
      flex: 1,
      width: "100%",
      paddingTop: "25%",
      paddingHorizontal: "4%",
      alignItems: "center",
    },
    characterImage: {
      height: "75%",
    },
    character: {
      height: "100%",
      resizeMode: "contain",
    },
  });
};
