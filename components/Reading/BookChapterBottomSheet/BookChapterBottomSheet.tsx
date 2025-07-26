import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Animated,
  TextInput,
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
  const [selectedTestament, setSelectedTestament] =
    useState<keyof typeof bookChapters>("Old Testament");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Slide animation for bottom sheet
  const slideAnim = useRef(new Animated.Value(height * 0.9)).current;

  // Reset animation values when modal opens
  useEffect(() => {
    if (visible) {
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: height * 0.9,
        duration: 250,
        useNativeDriver: true,
      }).start();
      // Clear search when closing
      setSearchQuery("");
    }
  }, [visible, slideAnim]);

  const toggleBookExpansion = (bookName: string) => {
    const newExpanded = new Set(expandedBooks);
    if (newExpanded.has(bookName)) {
      newExpanded.delete(bookName);
    } else {
      newExpanded.add(bookName);
    }
    setExpandedBooks(newExpanded);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const getFilteredBooks = () => {
    if (!searchQuery.trim()) {
      return { [selectedTestament]: bookChapters[selectedTestament] };
    }

    // When searching, show results from both testaments
    const filtered: Record<string, Record<string, number>> = {};

    Object.entries(bookChapters).forEach(([testamentName, books]) => {
      const matchingBooks: Record<string, number> = {};

      Object.entries(books).forEach(([bookName, chapterCount]) => {
        if (bookName.toLowerCase().includes(searchQuery.toLowerCase())) {
          matchingBooks[bookName] = chapterCount;
        }
      });

      if (Object.keys(matchingBooks).length > 0) {
        filtered[testamentName] = matchingBooks;
      }
    });

    return filtered;
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a book..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="words"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#888888" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
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

  const renderTestamentPillSelector = () => {
    // Hide pill selector when searching
    if (searchQuery.trim()) return null;

    const testaments: (keyof typeof bookChapters)[] = [
      "Old Testament",
      "New Testament",
    ];

    return (
      <View style={styles.pillSelector}>
        {testaments.map((testament) => (
          <TouchableOpacity
            key={testament}
            style={[
              styles.pillButton,
              selectedTestament === testament && {
                backgroundColor: themeColor ? `${themeColor}CC` : "#888888CC",
              },
            ]}
            onPress={() => setSelectedTestament(testament)}
          >
            <ButtonText
              style={[
                styles.pillButtonText,
                selectedTestament === testament && {
                  color: "#FFFFFF",
                  fontWeight: "700",
                },
              ]}
            >
              {testament}
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
    return (
      <View key={testamentName} style={styles.testamentSection}>
        {/* Show testament title when searching */}
        {searchQuery.trim() && (
          <Heading style={styles.searchResultsTestamentTitle}>
            {testamentName}
          </Heading>
        )}
        {Object.entries(books).map(([bookName, chapterCount]) => (
          <View key={bookName} style={styles.bookSection}>
            <TouchableOpacity
              style={[
                styles.bookHeader,
                currentBook === bookName && {
                  backgroundColor: themeColor ? `${themeColor}20` : "#88888820",
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
      </View>
    );
  };

  const filteredBooks = getFilteredBooks();

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
              height: height * 0.9,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Heading style={styles.headerTitle}>Select Book & Chapter</Heading>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          {renderSearchBar()}

          {/* Pill Selector */}
          {renderTestamentPillSelector()}

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {Object.entries(filteredBooks).map(([testamentName, books]) =>
              renderTestament(testamentName, books)
            )}
            {Object.keys(filteredBooks).length === 0 && searchQuery.trim() && (
              <View style={styles.noResultsContainer}>
                <ButtonText style={styles.noResultsText}>
                  No books found matching "{searchQuery}"
                </ButtonText>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
