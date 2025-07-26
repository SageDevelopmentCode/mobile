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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.PrimaryWhite,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  pillSelector: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 4,
  },
  pillButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pillButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  testamentSection: {
    marginBottom: 24,
  },
  searchResultsTestamentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.PrimaryWhite,
    marginBottom: 12,
    marginTop: 8,
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
  noResultsContainer: {
    paddingVertical: 32,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
  },
});
