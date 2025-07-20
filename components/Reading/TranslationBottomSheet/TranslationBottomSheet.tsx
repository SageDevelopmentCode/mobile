import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TRANSLATION_MAP } from "@/utils/data/translationMap";

import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { styles } from "./TranslationBottomSheet.styles";

const { height } = Dimensions.get("window");

interface TranslationBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentTranslation: string;
  themeColor?: string;
  onTranslationSelect?: (translation: string) => void;
}

export default function TranslationBottomSheet({
  visible,
  onClose,
  currentTranslation,
  themeColor,
  onTranslationSelect,
}: TranslationBottomSheetProps) {
  const handleTranslationSelect = (translation: string) => {
    onTranslationSelect?.(translation);
    onClose();
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
        <View style={[styles.bottomSheet, { height: height * 0.9 }]}>
          {/* Header */}
          <View style={styles.header}>
            <Heading style={styles.headerTitle}>Select Translation</Heading>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.translationsContainer}>
              {Object.entries(TRANSLATION_MAP).map(([key, abbreviation]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.translationButton,
                    currentTranslation.toUpperCase() === abbreviation && {
                      backgroundColor: themeColor || "#888888",
                      borderColor: themeColor || "#888888",
                    },
                  ]}
                  onPress={() => handleTranslationSelect(abbreviation)}
                >
                  <View style={styles.translationInfo}>
                    <ButtonText
                      style={[
                        styles.translationAbbreviation,
                        currentTranslation.toUpperCase() === abbreviation && {
                          color: "#FFFFFF",
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {abbreviation}
                    </ButtonText>
                    <ButtonText
                      style={[
                        styles.translationDescription,
                        currentTranslation.toUpperCase() === abbreviation && {
                          color: "#FFFFFF",
                        },
                      ]}
                    >
                      {getTranslationName(abbreviation)}
                    </ButtonText>
                  </View>
                  {currentTranslation.toUpperCase() === abbreviation && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Helper function to get full translation names
function getTranslationName(abbreviation: string): string {
  const translationNames: Record<string, string> = {
    ASV: "American Standard Version",
    BBE: "Bible in Basic English",
    DARBY: "Darby Translation",
    ESV: "English Standard Version",
    KJV: "King James Version",
    NIV: "New International Version",
    NLT: "New Living Translation",
    WEB: "World English Bible",
    YLT: "Young's Literal Translation",
  };

  return translationNames[abbreviation] || abbreviation;
}
