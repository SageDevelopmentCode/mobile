import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { styles } from "./VerseActionsBottomSheet.styles";

const { height } = Dimensions.get("window");

interface VerseAction {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  iconType: "ionicons" | "material";
  onPress: () => void;
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
  bookName?: string;
  currentChapter?: number;
}

export default function VerseActionsBottomSheet({
  visible,
  onClose,
  themeColor,
  selectedVerse,
  onHighlightVerse,
  bookName,
  currentChapter,
}: VerseActionsBottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current;
  const [modalVisible, setModalVisible] = React.useState(false);

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
      label: "Save",
      icon: "bookmark-outline",
      iconType: "ionicons",
      onPress: () => {
        console.log("Save verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "note",
      label: "Note",
      icon: "create-outline",
      iconType: "ionicons",
      onPress: () => {
        console.log("Add note to verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "copy",
      label: "Copy",
      icon: "copy-outline",
      iconType: "ionicons",
      onPress: () => {
        console.log("Copy verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "share",
      label: "Share",
      icon: "share-outline",
      iconType: "ionicons",
      onPress: () => {
        console.log("Share verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "image",
      label: "Image",
      icon: "image-outline",
      iconType: "ionicons",
      onPress: () => {
        console.log("Create image for verse:", selectedVerse?.verseId);
        handleClose();
      },
    },
    {
      id: "pray",
      label: "Pray",
      icon: "favorite-outline",
      iconType: "ionicons",
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

  const renderActionButton = (action: VerseAction) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionButton}
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionIconContainer}>
        {action.iconType === "ionicons" ? (
          <Ionicons
            name={action.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color="#FFFFFF"
          />
        ) : (
          <MaterialIcons
            name={action.icon as keyof typeof MaterialIcons.glyphMap}
            size={24}
            color="#FFFFFF"
          />
        )}
      </View>
      <ButtonText style={styles.actionLabel}>{action.label}</ButtonText>
    </TouchableOpacity>
  );

  return (
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
              height: height * 0.43,
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
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
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
                    style={[styles.colorCircle, { backgroundColor: color }]}
                    onPress={() => handleHighlightSelect(color)}
                    activeOpacity={0.8}
                  />
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

            {/* Tap for more button */}
            <TouchableOpacity
              style={styles.tapForMoreContainer}
              onPress={() => {
                console.log(
                  "Tap for more pressed for verse:",
                  selectedVerse?.verseId
                );
                // TODO: Implement expanded verse actions
              }}
            >
              <ButtonText style={styles.tapForMoreText}>
                Tap for more
              </ButtonText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
