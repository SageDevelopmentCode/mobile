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
  fontFamily?: string;
  onFontFamilyChange?: (fontFamily: string) => void;
  lineHeightMode?: string;
  onLineHeightModeChange?: (mode: string) => void;
  bookName?: string;
  onNavigateToOverview?: () => void;
}

export default function ReadingActionsBottomSheet({
  visible,
  onClose,
  themeColor,
  fontSize,
  onFontSizeChange,
  fontFamily = "System",
  onFontFamilyChange,
  lineHeightMode = "Standard",
  onLineHeightModeChange,
  bookName,
  onNavigateToOverview,
}: ReadingActionsBottomSheetProps) {
  const [currentScreen, setCurrentScreen] =
    useState<BottomSheetScreen>("actions");

  // Slide animation for bottom sheet
  const slideAnim = useRef(new Animated.Value(height * 0.6)).current;

  // Utility function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Utility function to calculate perceived brightness
  const getPerceivedBrightness = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    // Using the standard luminance formula
    return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
  };

  // Utility function to darken a color
  const darkenColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const darken = (value: number) => Math.floor(value * (1 - percent / 100));

    const newR = darken(rgb.r);
    const newG = darken(rgb.g);
    const newB = darken(rgb.b);

    return `#${[newR, newG, newB]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")}`;
  };

  // Get appropriate background color for selection
  const getSelectionBackgroundColor = (color: string) => {
    if (!color) return "#888888";

    const brightness = getPerceivedBrightness(color);
    // If brightness is above 180 (out of 255), darken it
    if (brightness > 180) {
      return darkenColor(color, 40); // Darken by 40%
    }
    return color;
  };

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

  // Line height mode options
  const lineHeightModes = [
    { name: "Compact", value: "Compact", lineHeight: 1.2 },
    { name: "Standard", value: "Standard", lineHeight: 1.5 },
    { name: "Comfortable", value: "Comfortable", lineHeight: 1.8 },
    { name: "Large", value: "Large", lineHeight: 2.1 },
  ];

  const handleLineHeightModeSelect = (mode: string) => {
    onLineHeightModeChange?.(mode);
  };

  // Reading-friendly font options
  const fontOptions = [
    { name: "System", label: "System Default", family: "System" },
    { name: "Georgia", label: "Georgia", family: "Georgia" },
    { name: "Times", label: "Times New Roman", family: "Times" },
    { name: "Palatino", label: "Palatino", family: "Palatino" },
    { name: "Helvetica", label: "Helvetica", family: "Helvetica" },
    { name: "Arial", label: "Arial", family: "Arial" },
    { name: "Courier", label: "Courier New", family: "Courier New" },
    { name: "Verdana", label: "Verdana", family: "Verdana" },
  ];

  const handleFontFamilySelect = (family: string) => {
    onFontFamilyChange?.(family);
  };

  const actions: ReadingAction[] = [
    {
      id: "about",
      label: "About this book",
      emoji: "1f4d6", // 📖 open book
      onPress: () => {
        onNavigateToOverview?.();
        onClose();
      },
    },
    {
      id: "annotations",
      label: "Your annotations",
      emoji: "1f4dd", // 📝 memo
      onPress: () => {
        console.log("Your annotations pressed");
        onClose();
      },
    },
    {
      id: "highlights",
      label: "Popular highlights",
      emoji: "1f31f", // ⭐ star
      onPress: () => {
        console.log("Popular highlights pressed");
        onClose();
      },
    },
    {
      id: "fonts",
      label: "Fonts & settings",
      emoji: "1f524", // 🔤 abc
      onPress: () => {
        navigateToFontSettings();
      },
    },
    // {
    //   id: "references",
    //   label: "Cross references",
    //   emoji: "1f517", // 🔗 link
    //   onPress: () => {
    //     console.log("Cross references pressed");
    //     onClose();
    //   },
    // },
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
      {/* Font Size Control */}
      <View style={styles.fontSizeControl}>
        <ButtonText style={styles.settingsLabel}>Font Size</ButtonText>
        <View style={styles.fontSizeButtons}>
          <TouchableOpacity
            style={styles.fontButton}
            onPress={() => adjustFontSize(false)}
          >
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <ButtonText style={styles.currentFontSize}>{fontSize}</ButtonText>
          <TouchableOpacity
            style={styles.fontButton}
            onPress={() => adjustFontSize(true)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Line Height Control */}
      <View style={styles.lineHeightControl}>
        <ButtonText style={styles.settingsLabel}>Line Height</ButtonText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lineHeightPillsContainer}
        >
          {lineHeightModes.map((mode) => (
            <TouchableOpacity
              key={mode.value}
              style={[
                styles.lineHeightPill,
                lineHeightMode === mode.value && {
                  backgroundColor: getSelectionBackgroundColor(
                    themeColor || "#888888"
                  ),
                  borderColor: getSelectionBackgroundColor(
                    themeColor || "#888888"
                  ),
                },
              ]}
              onPress={() => handleLineHeightModeSelect(mode.value)}
            >
              <ButtonText
                style={[
                  styles.lineHeightPillText,
                  lineHeightMode === mode.value && {
                    color: "#FFFFFF",
                  },
                ]}
              >
                {mode.name}
              </ButtonText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Font Family Selection */}
      <View style={styles.fontFamilyControl}>
        <ButtonText style={styles.settingsLabel}>Font Family</ButtonText>
        <ScrollView
          style={styles.fontOptionsContainer}
          showsVerticalScrollIndicator={false}
        >
          {fontOptions.map((font) => (
            <TouchableOpacity
              key={font.name}
              style={[
                styles.fontOption,
                fontFamily === font.family && {
                  backgroundColor: getSelectionBackgroundColor(
                    themeColor || "#888888"
                  ),
                  borderColor: getSelectionBackgroundColor(
                    themeColor || "#888888"
                  ),
                },
              ]}
              onPress={() => handleFontFamilySelect(font.family)}
            >
              <Text
                style={[
                  styles.fontOptionText,
                  { fontFamily: font.family },
                  fontFamily === font.family && {
                    color: "#FFFFFF",
                    fontWeight: "700",
                  },
                  fontFamily !== font.family && {
                    fontWeight: "600",
                  },
                ]}
              >
                {font.label}
              </Text>
              <Text
                style={[
                  styles.fontPreviewText,
                  { fontFamily: font.family },
                  fontFamily === font.family && {
                    color: "#FFFFFF",
                  },
                ]}
              >
                The quick brown fox jumps
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
              height: height * 0.75,
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
