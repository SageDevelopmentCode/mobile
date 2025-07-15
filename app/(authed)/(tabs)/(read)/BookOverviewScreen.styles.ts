import { StyleSheet, Dimensions } from "react-native";
import colors from "@/constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    height: height * 0.45,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    marginBottom: 30,
  },
  backgroundImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  },
  heroHeader: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 3,
  },
  backButton: {
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    borderRadius: 100,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.PrimaryWhite,
    textAlign: "center",
    flex: 1,
  },
  shareButton: {
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    borderRadius: 100,
  },
  bookImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 3,
    marginTop: 80,
  },
  bookImage: {
    width: 150,
    height: 240,
    borderRadius: 16,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsTitle: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#B5B5B5",
    marginLeft: 6,
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  summaryTitle: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#B5B5B5",
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: "600",
  },
  hashtagsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  hashtagsContainer: {
    paddingRight: 20,
    gap: 12,
  },
  hashtagText: {
    fontWeight: "500",
  },
  themesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  themesTitle: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  themesContainer: {
    paddingRight: 20,
    gap: 12,
  },
  themeItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  themeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  keyVerseSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  keyVerseTitle: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  keyVerseContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
  },
  keyVerseReference: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  keyVerseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#B5B5B5",
    fontStyle: "italic",
  },
  charactersSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  charactersTitle: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },
  charactersContainer: {
    paddingRight: 20,
    gap: 12,
  },
  characterItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
  },
  characterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  bookInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.PrimaryWhite,
    opacity: 0.7,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: colors.PrimaryWhite,
    fontWeight: "500",
  },
  actionButtonsSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.PrimaryWhite,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryPurpleBackground,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: colors.PrimaryWhite,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
  },
});
