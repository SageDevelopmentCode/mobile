import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ReadingActionsBottomSheet.styles";
import { ButtonText, Heading } from "@/components/Text/TextComponents";

const { height } = Dimensions.get("window");

type BottomSheetScreen = "actions" | "fontSettings";

interface ReadingAction {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
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

  // Reset to actions screen when modal opens
  useEffect(() => {
    if (visible) {
      setCurrentScreen("actions");
    }
  }, [visible]);

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
      icon: "information-circle-outline",
      onPress: () => {
        console.log("About this book pressed");
        onClose();
      },
    },
    {
      id: "annotations",
      label: "Your annotations",
      icon: "pencil-outline",
      onPress: () => {
        console.log("Your annotations pressed");
        onClose();
      },
    },
    {
      id: "highlights",
      label: "Popular highlights",
      icon: "color-wand-outline",
      onPress: () => {
        console.log("Popular highlights pressed");
        onClose();
      },
    },
    {
      id: "fonts",
      label: "Fonts & settings",
      icon: "text-outline",
      onPress: () => {
        navigateToFontSettings();
      },
    },
    {
      id: "references",
      label: "Cross references",
      icon: "link-outline",
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
      <View
        style={[styles.iconContainer, { borderColor: themeColor || "#888888" }]}
      >
        <Ionicons
          name={action.icon}
          size={24}
          color={themeColor || "#888888"}
        />
      </View>
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
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.backdropTouchable} onPress={onClose} />
        <View style={[styles.bottomSheet, { height: height * 0.6 }]}>
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
        </View>
      </View>
    </Modal>
  );
}
