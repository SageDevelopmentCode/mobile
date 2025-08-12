import { StyleSheet, Dimensions } from "react-native";
import colors from "@/constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#181818",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 70,
  },
  backButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#B5B5B5",
  },

  // Verse Pills Navigation
  versePillsContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
  },
  versePillsList: {
    paddingHorizontal: 12,
    gap: 12,
    alignItems: "center",
  },
  versePill: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  versePillText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    textAlign: "center",
  },
  versePillTextSelected: {
    color: "#181818",
  },

  // Current Verse Display
  currentVerseContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  verseReference: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PrimaryWhite,
    fontWeight: "400",
  },

  // Interactions List
  interactionsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100, // Space for comment input
  },

  // Interaction Card
  interactionCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  interactionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userInitials: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  interactionMeta: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PrimaryWhite,
  },
  interactionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  interactionType: {
    fontSize: 12,
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    color: "#888888",
  },

  // Interaction Content
  interactionContent: {
    marginBottom: 12,
  },
  interactionText: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.PrimaryWhite,
  },

  // Interaction Footer
  interactionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  likeCount: {
    fontSize: 14,
    color: "#888888",
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  replyText: {
    fontSize: 14,
    color: "#888888",
  },

  // Replies
  repliesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    gap: 12,
  },
  replyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  replyInitials: {
    fontSize: 12,
  },
  replyContent: {
    flex: 1,
  },
  replyUserName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    marginBottom: 4,
  },
  replyText: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.PrimaryWhite,
    marginBottom: 6,
  },
  replyFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  replyTimestamp: {
    fontSize: 11,
    color: "#666666",
  },
  replyLikeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  replyLikeCount: {
    fontSize: 12,
    color: "#666666",
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },

  // Comment Input
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E1E1E",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34, // Account for safe area
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.PrimaryWhite,
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
