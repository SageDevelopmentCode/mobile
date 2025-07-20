import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: "#1C1C1C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area padding
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.PrimaryWhite,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  gridContainer: {
    gap: 20,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    minHeight: 100,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.PrimaryWhite,
    textAlign: "center",
    lineHeight: 18,
  },
  emptySpace: {
    flex: 1,
  },
  // Font Settings Styles
  fontSettingsContainer: {
    paddingVertical: 20,
  },
  fontSizeControl: {
    alignItems: "center",
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  fontSizeButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  fontButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  fontButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
  },
  currentFontSize: {
    fontSize: 16,
    fontWeight: "600",
    color: "#B5B5B5",
    minWidth: 30,
    textAlign: "center",
  },
  // Header Navigation Styles
  backButton: {
    padding: 4,
    width: 32,
  },
  headerSpacer: {
    width: 32,
  },
});
