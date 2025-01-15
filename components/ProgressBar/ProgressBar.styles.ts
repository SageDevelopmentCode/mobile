import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    height: 30,
    padding: 3,
  },
  progress: {
    height: "100%",
    borderRadius: 20,
  },
  outerContainer: {
    width: "100%",
    borderRadius: 22, // Slightly larger than the inner container's radius
    borderWidth: 5,
    borderColor: colors.DarkPrimaryText,
    position: "relative",
  },
  circleResult: {
    position: "absolute",
    right: -5,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.DarkPurpleBackground,
    borderColor: colors.DarkPrimaryText,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    top: "50%", // Align vertically
    transform: [{ translateY: -25 }], // Adjust for half the height of the circle
  },
  circleImage: {
    width: "85%",
    height: "85%",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: -27,
    paddingRight: 50,
    paddingLeft: 5,
  },
});
