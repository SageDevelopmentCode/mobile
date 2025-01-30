import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statsHeader: {
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 5,
    position: "absolute",
    top: 50,
    paddingHorizontal: "4%",
    zIndex: 10,
  },
  statsContainer: {
    width: "68%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
  },
  statBox: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
