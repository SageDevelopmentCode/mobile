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
  },
  testamentSection: {
    marginBottom: 24,
  },
  testamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
    marginTop: 16,
  },
  testamentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.PrimaryWhite,
  },
  expandCollapseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
  },
  booksContainer: {
    paddingLeft: 8,
    overflow: "hidden",
  },
  bookSection: {
    marginBottom: 8,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    marginBottom: 4,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 2,
  },
  chapterCount: {
    fontSize: 12,
    color: "#888888",
  },
  chaptersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 0,
    paddingVertical: 8,
    gap: 10,
  },
  chapterButton: {
    width: 64,
    height: 64,
    backgroundColor: "#333333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chapterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.PrimaryWhite,
  },
});
