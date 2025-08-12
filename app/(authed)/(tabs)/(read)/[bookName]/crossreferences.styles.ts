import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Same as reading screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.PrimaryWhite,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#AAAAAA",
    marginTop: 2,
  },
  originalVerseContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  originalVerseLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  originalVerseCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  originalVerseReference: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  originalVerseText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PrimaryWhite,
  },
  content: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  referencesContainer: {
    gap: 12,
  },
  verseCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  verseReference: {
    fontSize: 14,
    fontWeight: "600",
  },
  chevronIcon: {
    opacity: 0.7,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PrimaryWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: "#AAAAAA",
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B9D",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    lineHeight: 20,
  },
});
