import React, { useState, useEffect, useRef } from "react";
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

import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { styles } from "./ReadingActionsBottomSheet.styles";

const { height } = Dimensions.get("window");

type BottomSheetScreen = "actions" | "fontSettings";

interface ReadingAction {
  id: string;
  label: string;
  emoji: string;
  onPress: () => void;
}

interface ReadingActionsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  themeColor?: string;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export default function ReadingActionsBottomSheet({
  visible,
  onClose,
  themeColor,
  fontSize,
  onFontSizeChange,
}: ReadingActionsBottomSheetProps) {
  const [currentScreen, setCurrentScreen] =
    useState<BottomSheetScreen>("actions");

  // Slide animation for bottom sheet
  const slideAnim = useRef(new Animated.Value(height * 0.6)).current;

  // Reset to actions screen when modal opens and handle slide animation
  useEffect(() => {
    if (visible) {
      setCurrentScreen("actions");
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: height * 0.6,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const navigateToFontSettings = () => {
    setCurrentScreen("fontSettings");
  };

  const navigateBackToActions = () => {
    setCurrentScreen("actions");
  };

  const adjustFontSize = (increase: boolean) => {
    const newSize = increase ? fontSize + 2 : fontSize - 2;
    const clampedSize = Math.max(14, Math.min(24, newSize));
    onFontSizeChange(clampedSize);
  };
  const actions: ReadingAction[] = [
    {
      id: "about",
      label: "About this book",
      emoji: "1f4d6", // 📖 open book
      onPress: () => {
        console.log("About this book pressed");
        onClose();
      },
    },
    {
      id: "annotations",
      label: "Your Annotations",
      emoji: "1f4dd", // 📝 memo
      onPress: () => {
        console.log("Your annotations pressed");
        onClose();
      },
    },
    {
      id: "highlights",
      label: "Popular Highlights",
      emoji: "1f31f", // ⭐ star
      onPress: () => {
        console.log("Popular highlights pressed");
        onClose();
      },
    },
    {
      id: "fonts",
      label: "Fonts & Settings",
      emoji: "1f524", // 🔤 abc
      onPress: () => {
        navigateToFontSettings();
      },
    },
    {
      id: "references",
      label: "Cross References",
      emoji: "1f517", // 🔗 link
      onPress: () => {
        console.log("Cross references pressed");
        onClose();
      },
    },
  ];

  const renderActionButton = (action: ReadingAction) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionButton}
      onPress={action.onPress}
      activeOpacity={0.7}
    >
      <Twemoji hex={action.emoji} size={32} />
      <ButtonText style={styles.actionLabel}>{action.label}</ButtonText>
    </TouchableOpacity>
  );

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < actions.length; i += 2) {
      const rowActions = actions.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.gridRow}>
          {rowActions.map(renderActionButton)}
          {/* Add empty space if odd number of items */}
          {rowActions.length === 1 && <View style={styles.emptySpace} />}
        </View>
      );
    }
    return rows;
  };

  const renderFontSettings = () => (
    <View style={styles.fontSettingsContainer}>
      <View style={styles.fontSizeControl}>
        <ButtonText style={styles.settingsLabel}>Font Size</ButtonText>
        <View style={styles.fontSizeButtons}>
          <TouchableOpacity
            style={styles.fontButton}
            onPress={() => adjustFontSize(false)}
          >
            <ButtonText style={styles.fontButtonText}>A-</ButtonText>
          </TouchableOpacity>
          <ButtonText style={styles.currentFontSize}>{fontSize}</ButtonText>
          <TouchableOpacity
            style={styles.fontButton}
            onPress={() => adjustFontSize(true)}
          >
            <ButtonText style={styles.fontButtonText}>A+</ButtonText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case "fontSettings":
        return "Fonts & Settings";
      default:
        return "Reading Tools";
    }
  };

  const getLeftHeaderButton = () => {
    if (currentScreen === "fontSettings") {
      return (
        <TouchableOpacity
          onPress={navigateBackToActions}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      );
    }
    return <View style={styles.headerSpacer} />;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.backdropTouchable} onPress={onClose} />
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              height: height * 0.55,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            {getLeftHeaderButton()}
            <Heading style={styles.headerTitle}>{getHeaderTitle()}</Heading>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {currentScreen === "actions" && (
              <View style={styles.gridContainer}>{renderGrid()}</View>
            )}
            {currentScreen === "fontSettings" && renderFontSettings()}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
