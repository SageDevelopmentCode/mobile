import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#1A1A1A",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "#CCCCCC",
    marginTop: 16,
    fontSize: 16,
  },
  referenceContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    alignItems: "center",
  },
  verseReference: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  referenceDescription: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  translationsContainer: {
    padding: 20,
    gap: 16,
  },
  translationCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  translationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  translationName: {
    fontSize: 16,
    fontWeight: "700",
  },
  translationVersion: {
    fontSize: 12,
    color: "#CCCCCC",
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  verseText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  errorText: {
    fontSize: 14,
    color: "#FF6B6B",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
});
