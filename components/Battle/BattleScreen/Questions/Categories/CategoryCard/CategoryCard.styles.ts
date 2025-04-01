import colors from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  categoryImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: colors.PrimaryWhite,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Adjust based on your needs
    borderRadius: 10, // Optional for rounded corners
  },
});
