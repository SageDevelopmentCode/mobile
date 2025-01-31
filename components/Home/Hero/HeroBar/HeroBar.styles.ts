import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heroBar: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: "100%",
    paddingVertical: 10,
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
});
