import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderWidth: 2,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  // Attack type card
  attackCard: {
    borderColor: "#FF6B6B",
    backgroundColor: "rgba(40, 10, 10, 0.95)",
    shadowColor: "#FF6B6B",
  },
  // Defense type card
  defenseCard: {
    borderColor: "#4ECDC4",
    backgroundColor: "rgba(10, 40, 40, 0.95)",
    shadowColor: "#4ECDC4",
  },
  // Special Attack type card
  specialAttackCard: {
    borderColor: "#FF9F1C",
    backgroundColor: "rgba(40, 30, 10, 0.95)",
    shadowColor: "#FF9F1C",
  },
  // Special Defense type card
  specialDefenseCard: {
    borderColor: "#2EC4B6",
    backgroundColor: "rgba(10, 40, 35, 0.95)",
    shadowColor: "#2EC4B6",
    borderStyle: "dashed",
  },
  // Speed type card
  speedCard: {
    borderColor: "#FFD166",
    backgroundColor: "rgba(40, 35, 10, 0.95)",
    shadowColor: "#FFD166",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
  },
  // Attack type styles
  attackIcon: {
    borderColor: "#FF6B6B",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  // Defense type styles
  defenseIcon: {
    borderColor: "#4ECDC4",
    backgroundColor: "rgba(78, 205, 196, 0.1)",
  },
  // Special Attack type styles
  specialAttackIcon: {
    borderColor: "#FF9F1C",
    backgroundColor: "rgba(255, 159, 28, 0.1)",
    transform: [{ rotate: "45deg" }],
  },
  specialAttackIconInner: {
    transform: [{ rotate: "-45deg" }],
  },
  // Special Defense type styles
  specialDefenseIcon: {
    borderColor: "#2EC4B6",
    backgroundColor: "rgba(46, 196, 182, 0.1)",
    borderStyle: "dashed",
  },
  // Speed type styles
  speedIcon: {
    borderColor: "#FFD166",
    backgroundColor: "rgba(255, 209, 102, 0.1)",
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  usesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
  usesText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    alignItems: "center",
  },
  additionalStatsIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  additionalStatsText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  // Compact stat pill for when there are multiple stats
  compactStatPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 65,
  },
  compactStatsRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
    paddingHorizontal: 2,
  },
  // Attack stat pill styles
  attackPill: {
    borderColor: "#FF6B6B",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  // Defense stat pill styles
  defensePill: {
    borderColor: "#4ECDC4",
    backgroundColor: "rgba(78, 205, 196, 0.1)",
  },
  // Special Attack stat pill styles
  specialAttackPill: {
    borderColor: "#FF9F1C",
    backgroundColor: "rgba(255, 159, 28, 0.1)",
  },
  // Special Defense stat pill styles
  specialDefensePill: {
    borderColor: "#2EC4B6",
    backgroundColor: "rgba(46, 196, 182, 0.1)",
    borderStyle: "dashed",
  },
  // Speed stat pill styles
  speedPill: {
    borderColor: "#FFD166",
    backgroundColor: "rgba(255, 209, 102, 0.1)",
  },
  statValue: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 2,
  },
  compactStatValue: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 1,
  },
  statLabel: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  compactStatLabel: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "rgba(15, 15, 20, 0.95)",
    borderRadius: 24,
    borderWidth: 2,
    overflow: "hidden",
  },
  modalHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 8,
  },
  modalIconWrapper: {
    borderRadius: 28,
    padding: 4,
    borderWidth: 2,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalType: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "left",
    fontWeight: "500",
  },
  modalStatsTitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  modalStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  modalStatItem: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  modalStatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statBarContainer: {
    marginTop: 8,
    width: "100%",
  },
  modalStatLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modalStatValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalUsesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  modalUsesText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalUsesCount: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
