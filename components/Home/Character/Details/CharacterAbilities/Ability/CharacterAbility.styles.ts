import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 190,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#597C9F",
    overflow: "hidden",
    marginRight: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the overlay cover the entire card
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
  },
  content: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Ensure content stays above the overlay
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: colors.DarkSecondaryText,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    color: "#10b981",
    fontSize: 11,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statLabel: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
