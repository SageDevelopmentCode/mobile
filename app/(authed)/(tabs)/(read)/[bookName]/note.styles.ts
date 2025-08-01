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
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    paddingHorizontal: 16,
  },
  verseContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
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
    backgroundColor: "transparent",
    borderRadius: 12,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    minHeight: 120,
    maxHeight: 200,
  },
  characterCount: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
    marginTop: 8,
  },

  categoriesWrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  categoryPill: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "transparent",
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addCategoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 110,
  },
  addCategoryInputPill: {
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#666666",
    minWidth: 120,
  },
  inlineCategoryInput: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    padding: 0,
    margin: 0,
    minWidth: 80,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  bottomContainer: {
    backgroundColor: "#1A1A1A",
    borderTopWidth: 1,
    borderTopColor: "#333333",
    paddingBottom: 10,
  },
  categoryScrollView: {
    maxHeight: 70,
    paddingVertical: 8,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
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
