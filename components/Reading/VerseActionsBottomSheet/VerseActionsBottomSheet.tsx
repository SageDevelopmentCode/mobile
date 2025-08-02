import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { useToast } from "@/components/UI/Toast/Toast";
import { styles } from "./VerseActionsBottomSheet.styles";

const { height } = Dimensions.get("window");

interface VerseAction {
  id: string;
  label: string;
  emoji: string;
  onPress: () => void;
}

interface UserInteraction {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface VerseActionsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  themeColor?: string;
  selectedVerse?: {
    id: string;
    verseId: string;
    verse: string;
  };
  onHighlightVerse?: (verseId: string, color: string) => void;
  onSaveVerse?: (verseId: string, shouldSave: boolean) => void;
  bookName?: string;
  currentChapter?: number;
  currentHighlightColor?: string | null;
  currentSavedStatus?: boolean;
  userInteractions?: UserInteraction[];
}

export default function VerseActionsBottomSheet({
  visible,
  onClose,
  themeColor,
  selectedVerse,
  onHighlightVerse,
  onSaveVerse,
  bookName,
  currentChapter,
  currentHighlightColor,
  currentSavedStatus,
  userInteractions: propUserInteractions,
}: VerseActionsBottomSheetProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current;
  const [modalVisible, setModalVisible] = React.useState(false);
  const { showToast, ToastComponent } = useToast();

  const handleClose = () => {
    // Start slide down animation
    Animated.timing(slideAnim, {
      toValue: height * 0.4,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      // After animation completes, hide modal and call onClose
      setModalVisible(false);
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      // Show modal first, then slide up
      setModalVisible(true);
      // Small delay to ensure modal is rendered before animation
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 50);
    } else {
      // Reset animation position for next open
      slideAnim.setValue(height * 0.4);
    }
  }, [visible, slideAnim]);

  // Highlight colors
  const highlightColors = [
    "#FFE066", // Yellow
    "#FF6B9D", // Pink
    "#4ECDC4", // Teal
    "#95E1D3", // Mint
    "#F38BA8", // Rose
    "#A8DADC", // Light Blue
    "#C77DFF", // Purple
    "#FFB347", // Orange
  ];

  // Verse actions
  const verseActions: VerseAction[] = [
    {
      id: "save",
      label: currentSavedStatus ? "Saved" : "Save",
      emoji: "1f516", // 🔖 bookmark
      onPress: () => {
        if (selectedVerse) {
          // Toggle save state - if currently saved, unsave it; if not saved, save it
          onSaveVerse?.(selectedVerse.verseId, !currentSavedStatus);
        }
        handleClose();
      },
    },
    {
      id: "note",
      label: "Note",
      emoji: "270d", // ✍️ writing hand
      onPress: () => {
        if (selectedVerse && bookName && currentChapter) {
          router.push({
            pathname: `/(authed)/(tabs)/(read)/[bookName]/note`,
            params: {
              bookName: bookName,
              chapter: currentChapter.toString(),
              verseId: selectedVerse.verseId,
              verseText: selectedVerse.verse,
              ...(themeColor && { themeColor: themeColor }),
            },
          });
        }
        handleClose();
      },
    },
    {
      id: "collection",
      label: "Collection",
      emoji: "1f4da", // 📚 books
      onPress: () => {
        console.log("Add to collection:", selectedVerse?.verseId);
        // TODO: Implement add to collection functionality
        showToast("Added to collection", { type: "success" });
        handleClose();
      },
    },
    {
      id: "cross-ref",
      label: "Cross Ref",
      emoji: "1f9e9", // 🧩 puzzle piece
      onPress: () => {
        if (selectedVerse && bookName && currentChapter) {
          router.push({
            pathname: `/(authed)/(tabs)/(read)/[bookName]/crossreferences`,
            params: {
              bookName: bookName,
              chapter: currentChapter.toString(),
              verseId: selectedVerse.verseId,
              verseText: selectedVerse.verse,
              ...(themeColor && { themeColor: themeColor }),
            },
          });
        }
        handleClose();
      },
    },
    {
      id: "copy",
      label: "Copy",
      emoji: "1f4cb", // 📋 clipboard
      onPress: async () => {
        if (selectedVerse && bookName && currentChapter) {
          try {
            // Format the verse text with reference
            const formattedVerse = `${selectedVerse.verse} - ${bookName} ${currentChapter}:${selectedVerse.verseId}`;

            // Copy to clipboard
            await Clipboard.setStringAsync(formattedVerse);

            // Close bottom sheet first
            handleClose();

            // Show toast after a short delay to ensure bottom sheet is closed
            setTimeout(() => {
              showToast("Verse copied to clipboard");
            }, 300);
          } catch (error) {
            console.error("Error copying verse:", error);
            Alert.alert("Error", "Failed to copy verse", [{ text: "OK" }]);
            handleClose();
          }
        } else {
          handleClose();
        }
      },
    },
    {
      id: "compare",
      label: "Compare",
      emoji: "2696", // ⚖️ balance scale
      onPress: () => {
        console.log("Compare translations for verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "share",
      label: "Share",
      emoji: "1f517", // 🔗 link
      onPress: () => {
        console.log("Share verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "image",
      label: "Image",
      emoji: "1f5bc", // 🖼️ framed picture
      onPress: () => {
        console.log("Create image for verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "pray",
      label: "Pray",
      emoji: "1f64f", // 🙏 folded hands
      onPress: () => {
        console.log("Pray about verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
  ];

  const handleHighlightSelect = (color: string) => {
    if (selectedVerse) {
      onHighlightVerse?.(selectedVerse.id, color);
      handleClose();
    }
  };

  // User interaction data - use prop if provided, otherwise mock data
  const defaultUserInteractions: UserInteraction[] = [
    { id: "1", name: "Sarah", initials: "S", color: "#FF6B6B" },
    { id: "2", name: "Mike", initials: "M", color: "#4ECDC4" },
    { id: "3", name: "Emma", initials: "E", color: "#45B7D1" },
    { id: "4", name: "David", initials: "D", color: "#96CEB4" },
    { id: "5", name: "Lisa", initials: "L", color: "#FFEAA7" },
    { id: "6", name: "Alex", initials: "A", color: "#DDA0DD" },
    { id: "7", name: "John", initials: "J", color: "#98D8C8" },
  ];

  const userInteractions = propUserInteractions || defaultUserInteractions;

  const maxVisibleAvatars = 4;
  const visibleUsers = userInteractions.slice(0, maxVisibleAvatars);
  const remainingCount = Math.max(
    0,
    userInteractions.length - maxVisibleAvatars
  );

  const renderActionButton = (action: VerseAction) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionButton}
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.actionIconContainer,
          // Add colored border for saved state
          action.id === "save" &&
            currentSavedStatus && {
              borderWidth: 2,
              borderColor: themeColor || "#FFFFFF",
            },
        ]}
      >
        <Twemoji hex={action.emoji} size={24} />
        <ButtonText
          style={[
            styles.actionLabel,
            // Change text color to theme color when saved
            action.id === "save" &&
              currentSavedStatus && {
                color: themeColor || "#FFFFFF",
                fontWeight: "600",
              },
          ]}
        >
          {action.label}
        </ButtonText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            style={styles.backdropTouchable}
            onPress={handleClose}
          />
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                height: height * 0.45,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <Heading style={styles.headerTitle}>
                {selectedVerse && bookName && currentChapter
                  ? `${bookName} ${currentChapter}:${selectedVerse.verseId}`
                  : "Verse Actions"}
              </Heading>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Highlight Colors */}
              <View style={styles.highlightSection}>
                <ButtonText style={styles.sectionTitle}>Highlight</ButtonText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.colorsContainer}
                >
                  {highlightColors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color },
                        currentHighlightColor === color && {
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 3,
                          borderColor: "#FFFFFF",
                        },
                      ]}
                      onPress={() => handleHighlightSelect(color)}
                      activeOpacity={0.8}
                    >
                      {currentHighlightColor === color && (
                        <Ionicons name="checkmark" size={24} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsSection}>
                <ButtonText style={styles.sectionTitle}>Actions</ButtonText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.actionsContainer}
                >
                  {verseActions.map(renderActionButton)}
                </ScrollView>
              </View>

              {/* User interactions and tap for more */}
              <TouchableOpacity
                style={styles.interactionContainer}
                onPress={() => {
                  console.log(
                    "Tap for more pressed for verse:",
                    selectedVerse?.verseId
                  );
                  // TODO: Implement expanded verse actions
                }}
              >
                {/* User avatars - only show if there are interactions */}
                {userInteractions.length > 0 && (
                  <View style={styles.avatarsContainer}>
                    {visibleUsers.map((user, index) => (
                      <View
                        key={user.id}
                        style={[
                          styles.avatar,
                          {
                            backgroundColor: user.color,
                            zIndex: maxVisibleAvatars - index,
                          },
                        ]}
                      >
                        <Text style={styles.avatarText}>{user.initials}</Text>
                      </View>
                    ))}
                    {remainingCount > 0 && (
                      <View style={styles.moreAvatarsIndicator}>
                        <Text style={styles.moreAvatarsText}>
                          +{remainingCount}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Tap for more text */}
                <ButtonText style={styles.tapForMoreText}>
                  See Reactions
                </ButtonText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Toast Component */}
      <ToastComponent />
    </>
  );
}
