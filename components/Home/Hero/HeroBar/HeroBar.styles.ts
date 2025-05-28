import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heroBar: {
    backgroundColor: "#70CACA",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20, // Use paddingHorizontal instead of padding to avoid unnecessary vertical padding
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 5,
  },
  levelSection: {
    alignItems: "flex-end",
    minWidth: 120,
  },
  levelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  progressBarContainer: {
    width: 120,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 4,
  },
});
