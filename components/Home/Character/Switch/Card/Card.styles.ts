import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  characterSwitchCard: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    position: "relative",
    marginBottom: 5,
    overflow: "hidden",
  },
  characterSwitchCardImage: {
    height: "80%", // Adjust size as needed
    resizeMode: "contain",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
});
