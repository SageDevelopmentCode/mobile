import React, { useState, useRef, useEffect } from "react";
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
import { bookChapters } from "@/utils/data/bookChapters";
import { styles } from "./BookChapterBottomSheet.styles";
import { ButtonText, Heading } from "@/components/Text/TextComponents";

const { height } = Dimensions.get("window");

interface BookChapterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  themeColor?: string;
  onBookChapterSelect?: (book: string, chapter: number) => void;
}

export default function BookChapterBottomSheet({
  visible,
  onClose,
  currentBook,
  currentChapter,
  themeColor,
  onBookChapterSelect,
}: BookChapterBottomSheetProps) {
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
  const [expandedTestaments, setExpandedTestaments] = useState<Set<string>>(
    new Set(["Old Testament", "New Testament"]) // Start with both expanded
  );

  // Animation refs for each testament
  const otAnimatedHeight = useRef(new Animated.Value(1)).current;
  const ntAnimatedHeight = useRef(new Animated.Value(1)).current;

  // Reset animation values when modal opens
  useEffect(() => {
    if (visible) {
      // Set initial values based on expanded state
      otAnimatedHeight.setValue(
        expandedTestaments.has("Old Testament") ? 1 : 0
      );
      ntAnimatedHeight.setValue(
        expandedTestaments.has("New Testament") ? 1 : 0
      );
    }
  }, [visible, expandedTestaments, otAnimatedHeight, ntAnimatedHeight]);

  const toggleBookExpansion = (bookName: string) => {
    const newExpanded = new Set(expandedBooks);
    if (newExpanded.has(bookName)) {
      newExpanded.delete(bookName);
    } else {
      newExpanded.add(bookName);
    }
    setExpandedBooks(newExpanded);
  };

  const getAnimatedValue = (testamentName: string) => {
    return testamentName === "Old Testament"
      ? otAnimatedHeight
      : ntAnimatedHeight;
  };

  const toggleTestamentExpansion = (testamentName: string) => {
    const newExpanded = new Set(expandedTestaments);
    const animatedValue = getAnimatedValue(testamentName);

    if (newExpanded.has(testamentName)) {
      // Collapse
      newExpanded.delete(testamentName);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expand
      newExpanded.add(testamentName);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpandedTestaments(newExpanded);
  };

  const renderChapterButtons = (bookName: string, chapterCount: number) => {
    if (!expandedBooks.has(bookName)) return null;

    const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

    return (
      <View style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter}
            style={[
              styles.chapterButton,
              currentBook === bookName &&
                currentChapter === chapter && {
                  backgroundColor: themeColor || "#888888",
                },
            ]}
            onPress={() => onBookChapterSelect?.(bookName, chapter)}
          >
            <ButtonText
              style={[
                styles.chapterButtonText,
                currentBook === bookName &&
                  currentChapter === chapter && {
                    color: "#FFFFFF",
                    fontWeight: "700",
                  },
              ]}
            >
              {chapter}
            </ButtonText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTestament = (
    testamentName: string,
    books: Record<string, number>
  ) => {
    const isTestamentExpanded = expandedTestaments.has(testamentName);
    const animatedValue = getAnimatedValue(testamentName);

    return (
      <View key={testamentName} style={styles.testamentSection}>
        <TouchableOpacity
          style={styles.testamentHeader}
          onPress={() => toggleTestamentExpansion(testamentName)}
        >
          <Heading style={styles.testamentTitle}>{testamentName}</Heading>
          <ButtonText style={styles.expandCollapseText}>
            {isTestamentExpanded ? "Collapse" : "Expand"}
          </ButtonText>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.booksContainer,
            {
              maxHeight: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10000], // Very large to ensure all content fits
              }),
              opacity: animatedValue,
            },
          ]}
        >
          {Object.entries(books).map(([bookName, chapterCount]) => (
            <View key={bookName} style={styles.bookSection}>
              <TouchableOpacity
                style={[
                  styles.bookHeader,
                  currentBook === bookName && {
                    backgroundColor: themeColor
                      ? `${themeColor}20`
                      : "#88888820",
                  },
                ]}
                onPress={() => toggleBookExpansion(bookName)}
              >
                <View style={styles.bookInfo}>
                  <ButtonText
                    style={[
                      styles.bookTitle,
                      currentBook === bookName && {
                        color: themeColor || "#888888",
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {bookName}
                  </ButtonText>
                  <ButtonText style={styles.chapterCount}>
                    {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
                  </ButtonText>
                </View>
                <Ionicons
                  name={
                    expandedBooks.has(bookName) ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color="#888888"
                />
              </TouchableOpacity>
              {renderChapterButtons(bookName, chapterCount)}
            </View>
          ))}
        </Animated.View>
      </View>
    );
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
            <Heading style={styles.headerTitle}>Select Book & Chapter</Heading>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {Object.entries(bookChapters).map(([testamentName, books]) =>
              renderTestament(testamentName, books)
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
