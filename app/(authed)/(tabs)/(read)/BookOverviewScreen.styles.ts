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
    height: height * 0.5,
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
    top: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 3,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    borderRadius: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.PrimaryWhite,
    textAlign: "center",
    flex: 1,
  },
  shareButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    borderRadius: 20,
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
    marginTop: 60,
  },
  bookImage: {
    width: 160,
    height: 250,
    borderRadius: 16,
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
