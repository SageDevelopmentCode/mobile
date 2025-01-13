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
    flex: 0.57,
    alignItems: "center",
    width: "100%",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: "12%",
    paddingHorizontal: "4%",
  },
  statImage: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  goalImage: {
    height: 40,
    width: 40,
  },
  contentContainer: {
    flex: 0.43,
    alignItems: "center",
  },
  statsBar: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 0, // Use paddingHorizontal instead of padding to avoid unnecessary vertical padding
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 5,
  },
  statsContainer: {
    width: "63%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
  },
  statBox: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
    flexDirection: "row",
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
    marginBottom: 5,
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
  character: {
    height: "100%",
  },
});
