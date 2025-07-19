import { StyleSheet, Dimensions } from "react-native";
import colors from "@/constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#181818",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectedPill: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    overflow: "hidden",
  },
  bookChapterSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  translationSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  pillText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#B5B5B5",
  },
  settingsPanel: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  fontSizeControl: {
    alignItems: "center",
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 12,
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
  scrollView: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 16,
  },
  chapterHeader: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  chapterTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.PrimaryWhite,
    textAlign: "center",
  },
  versesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  verseContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 2,
  },
  verseNumber: {
    fontWeight: "600",
    color: "#888888",
    marginRight: 12,
    minWidth: 30,
    textAlign: "right",
    marginTop: 2,
  },
  verseText: {
    flex: 1,
    lineHeight: 28,
    color: colors.PrimaryWhite,
    fontWeight: "400",
  },
  floatingPrevButton: {
    position: "absolute",
    bottom: 120,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingNextButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
