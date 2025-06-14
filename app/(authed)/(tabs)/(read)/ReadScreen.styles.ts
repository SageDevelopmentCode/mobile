import colors from "@/constants/colors";
import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F33", // Set the base background color
    width: "100%",
  },

  // Search Icon in top left
  searchIconContainer: {
    position: "absolute",
    top: 60, // Account for status bar
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2C2E4B", // Light gray circle background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Translation Dropdown Styles
  translationDropdownContainer: {
    position: "absolute",
    top: 60, // Account for status bar
    right: 20,
    height: 50, // Same height as search icon
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#2C2E4B", // Same as search icon background
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  translationDropdownText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },

  translationDropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 14,
  },

  translationDropdownMenu: {
    position: "absolute",
    top: 120, // Below the dropdown button
    right: 20,
    backgroundColor: "#2C2E4B",
    borderRadius: 12,
    minWidth: 200,
    maxHeight: 300,
    zIndex: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  translationDropdownList: {
    flex: 1,
  },

  translationDropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  translationDropdownItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },

  translationDropdownItemDesc: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "400",
  },

  // ScrollView that contains everything
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 120, // Add padding to account for search icon
    paddingBottom: 100, // Extra padding for tab bar
  },

  // Content Section
  contentSection: {
    backgroundColor: "#1E1F33",
    padding: 20,
    minHeight: height * 0.8, // Fill most of the screen
  },

  contentText: {
    color: colors.PrimaryWhite,
    fontSize: 16,
  },

  // Quick Read Section Styles
  quickReadSection: {
    marginBottom: 30,
    marginTop: 10,
  },

  quickReadTitle: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  quickReadList: {
    paddingHorizontal: 20,
  },

  quickReadCard: {
    marginRight: 12,
    alignItems: "center",
    width: 100,
    justifyContent: "flex-start",
  },

  quickReadCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
    padding: 3,
  },

  quickReadBookName: {
    color: colors.PrimaryWhite,
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: 4,
    zIndex: 2,
    textAlign: "center",
  },

  quickReadImageBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 36.5,
    overflow: "hidden",
  },

  quickReadImage: {
    borderRadius: 36.5,
  },

  quickReadImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 165, 0, 0.3)",
    borderRadius: 47,
  },

  quickReadVerse: {
    color: colors.PrimaryWhite,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    textAlign: "center",
  },

  quickReadCategory: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001123",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  quickReadCategoryText: {
    color: colors.PrimaryWhite,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },

  // Categories Section Styles
  categoriesSection: {
    marginBottom: 30,
  },

  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  categoriesTitle: {
    color: colors.PrimaryWhite,
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    color: colors.PrimaryPurpleBackground,
    fontSize: 14,
    marginRight: 4,
  },

  categoriesScrollContainer: {
    paddingHorizontal: 20,
  },

  categoriesRows: {
    // Container for both rows
  },

  categoryRow: {
    marginBottom: 8,
  },

  categoryCard: {
    borderRadius: 100,
    paddingLeft: 6,
    paddingRight: 10,
    paddingVertical: 5,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
  },

  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#001123",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  categoryText: {
    color: colors.PrimaryWhite,
    fontWeight: "500",
    textAlign: "left",
    marginRight: 10,
    flexShrink: 1,
  },

  // Continue Reading Section Styles
  continueReadingSection: {
    marginBottom: 30,
  },

  continueReadingTitle: {
    color: colors.PrimaryWhite,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  continueReadingList: {
    paddingHorizontal: 20,
  },

  continueReadingCard: {
    marginRight: 16,
    alignItems: "flex-start",
    width: 140,
  },

  continueReadingBookCoverShadow: {
    marginBottom: 16,
    shadowColor: "#171717",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    borderRadius: 10,
  },

  continueReadingBookCover: {
    width: 140,
    height: 200,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },

  continueReadingBookInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },

  continueReadingTextContainer: {
    flex: 1,
    marginRight: 8,
  },

  continueReadingBookTitle: {
    color: colors.PrimaryWhite,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 18,
    marginBottom: 2, // Small gap between title and progress
  },

  bookmarkButton: {
    padding: 2,
    marginTop: -2, // Slight adjustment to align with text
  },

  continueReadingProgress: {
    color: colors.GrayText,
    fontSize: 12,
    fontWeight: "400",
  },

  hero: {
    flex: 0.15,
    width: "100%",
    backgroundColor: colors.LightBrownBackground,
    padding: 30,
    paddingTop: 70,
  },
  version: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButton: {
    backgroundColor: colors.PrimaryWhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    color: colors.BrownPrimaryText,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "40%",
    maxHeight: 150, // Limits dropdown height
    position: "absolute",
    bottom: "-350%",
    right: 0,
    zIndex: 3,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    position: "absolute",
    top: "24%",
    height: "60%",
    width: "90%",
    backgroundColor: colors.PrimaryWhite,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    borderRadius: 10,
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
    left: "5%", // Move to the center of the screen
    transform: [{ translateX: -"5%" }], // Adjust to center by half its width
  },
  scrollSearch: {
    flex: 0.9,
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  verse: {
    fontWeight: "bold",
    fontSize: 16,
  },
  verseText: {
    fontSize: 14,
    marginTop: 5,
  },
});
