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
    paddingTop: 16,
  },
  translationsContainer: {
    gap: 12,
  },
  translationButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#444444",
  },
  translationInfo: {
    flex: 1,
  },
  translationAbbreviation: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 2,
  },
  translationDescription: {
    fontSize: 14,
    color: "#AAAAAA",
  },
});
