import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  saveButton: {
    padding: 4,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  verseContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  verseReference: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  noteInputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  noteInput: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    minHeight: 120,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#333333",
  },
  characterCount: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
    marginTop: 8,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  addCategoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  customCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  customCategoryInput: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#333333",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    backgroundColor: "#1A1A1A",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 4,
    textAlign: "center",
  },
});
