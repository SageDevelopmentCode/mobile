import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: colors.DarkPurpleBackground,
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
    alignItems: "center",
    width: "100%",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: "15%",
    paddingHorizontal: "4%",
  },
  contentContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  heroBar: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 20, // Use paddingHorizontal instead of padding to avoid unnecessary vertical padding
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 25,
  },
  actions: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  characterImage: {
    height: "70%",
    alignSelf: "center",
  },
});
