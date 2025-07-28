import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getChapter, Verse } from "@/lib/api/bible";
import { tabBarOptions } from "@/constants/tabBarOptions";
import colors from "@/constants/colors";
import { styles } from "./reading.styles";
import { FontAwesome6 } from "@/utils/icons";
import BookChapterBottomSheet from "@/components/Reading/BookChapterBottomSheet/BookChapterBottomSheet";
import TranslationBottomSheet from "@/components/Reading/TranslationBottomSheet/TranslationBottomSheet";
import ReadingActionsBottomSheet from "@/components/Reading/ReadingActionsBottomSheet/ReadingActionsBottomSheet";
import VerseActionsBottomSheet from "@/components/Reading/VerseActionsBottomSheet/VerseActionsBottomSheet";
import { bookThemeColor } from "@/utils/data/bookThemeColor";
import { useAuth } from "@/context/AuthContext";
import {
  createUserBookHighlight,
  getUserBookHighlightsByChapter,
  checkIfVerseHighlighted,
  updateUserBookHighlightColor,
  UserBookHighlight,
} from "@/lib/supabase/db/user_book_highlights";

const { width } = Dimensions.get("window");

// Storage keys for font settings
const FONT_SETTINGS_KEYS = {
  FONT_SIZE: "@reading_font_size",
  FONT_FAMILY: "@reading_font_family",
  LINE_HEIGHT_MODE: "@reading_line_height_mode",
};

// Default font settings
const DEFAULT_FONT_SETTINGS = {
  fontSize: 18,
  fontFamily: "System",
  lineHeightMode: "Standard",
};

export default function ReadingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { session } = useAuth();
  const { bookName, themeColor, chapter } = useLocalSearchParams<{
    bookName: string;
    themeColor?: string;
    chapter?: string;
  }>();

  // Get theme color from bookThemeColor.ts if not provided in params
  const resolvedThemeColor =
    themeColor ||
    (bookName
      ? bookThemeColor[bookName as keyof typeof bookThemeColor] || undefined
      : undefined);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(
    chapter ? parseInt(chapter) : 1
  );
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SETTINGS.fontSize);
  const [fontFamily, setFontFamily] = useState(
    DEFAULT_FONT_SETTINGS.fontFamily
  );
  const [lineHeightMode, setLineHeightMode] = useState(
    DEFAULT_FONT_SETTINGS.lineHeightMode
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showReadingActions, setShowReadingActions] = useState(false);
  const [showBookChapterSheet, setShowBookChapterSheet] = useState(false);
  const [showTranslationSheet, setShowTranslationSheet] = useState(false);
  const [showVerseActions, setShowVerseActions] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState("NIV");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [highlights, setHighlights] = useState<UserBookHighlight[]>([]);

  // Helper function to get line height value from mode
  const getLineHeightValue = (mode: string) => {
    const lineHeightModes: { [key: string]: number } = {
      Compact: 1.2,
      Standard: 1.5,
      Comfortable: 1.8,
      Large: 2.1,
    };
    return lineHeightModes[mode] || 1.5;
  };

  // Save font settings to AsyncStorage
  const saveFontSettings = async (settings: {
    fontSize?: number;
    fontFamily?: string;
    lineHeightMode?: string;
  }) => {
    try {
      if (settings.fontSize !== undefined) {
        await AsyncStorage.setItem(
          FONT_SETTINGS_KEYS.FONT_SIZE,
          settings.fontSize.toString()
        );
      }
      if (settings.fontFamily !== undefined) {
        await AsyncStorage.setItem(
          FONT_SETTINGS_KEYS.FONT_FAMILY,
          settings.fontFamily
        );
      }
      if (settings.lineHeightMode !== undefined) {
        await AsyncStorage.setItem(
          FONT_SETTINGS_KEYS.LINE_HEIGHT_MODE,
          settings.lineHeightMode
        );
      }
    } catch (error) {
      console.error("Error saving font settings:", error);
    }
  };

  // Load font settings from AsyncStorage
  const loadFontSettings = async () => {
    try {
      const [savedFontSize, savedFontFamily, savedLineHeightMode] =
        await Promise.all([
          AsyncStorage.getItem(FONT_SETTINGS_KEYS.FONT_SIZE),
          AsyncStorage.getItem(FONT_SETTINGS_KEYS.FONT_FAMILY),
          AsyncStorage.getItem(FONT_SETTINGS_KEYS.LINE_HEIGHT_MODE),
        ]);

      if (savedFontSize) {
        const parsedSize = parseInt(savedFontSize);
        if (!isNaN(parsedSize)) {
          setFontSize(parsedSize);
        }
      }

      if (savedFontFamily) {
        setFontFamily(savedFontFamily);
      }

      if (savedLineHeightMode) {
        setLineHeightMode(savedLineHeightMode);
      }
    } catch (error) {
      console.error("Error loading font settings:", error);
    }
  };

  // Load font settings on component mount
  useEffect(() => {
    loadFontSettings();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      ...tabBarOptions,
      tabBarStyle: {
        ...tabBarOptions.tabBarStyle,
        backgroundColor: "#282828",
      },
      tabBarActiveTintColor: resolvedThemeColor || "#888888",
    });
  }, [navigation]);

  useEffect(() => {
    if (bookName) {
      fetchChapter(currentChapter, currentTranslation);
      loadHighlights();
    }
  }, [bookName, currentChapter, currentTranslation]);

  const fetchChapter = async (chapter: number, translation?: string) => {
    try {
      setLoading(true);
      const chapterVerses = await getChapter(
        bookName || "",
        chapter,
        translation || currentTranslation
      );
      setVerses(chapterVerses);
    } catch (error) {
      console.error("Error fetching chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadHighlights = async () => {
    if (!session?.user?.id || !bookName) return;

    try {
      const chapterHighlights = await getUserBookHighlightsByChapter(
        session.user.id,
        bookName,
        currentChapter
      );
      setHighlights(chapterHighlights || []);
    } catch (error) {
      console.error("Error loading highlights:", error);
      setHighlights([]);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    setCurrentChapter(currentChapter + 1);
  };

  const adjustFontSize = (increase: boolean) => {
    setFontSize((prev) => {
      const newSize = increase ? prev + 2 : prev - 2;
      return Math.max(14, Math.min(24, newSize));
    });
  };

  const handleBookChapterSelect = (
    selectedBook: string,
    selectedChapter: number
  ) => {
    setShowBookChapterSheet(false);

    // Navigate to the selected book and chapter
    const selectedThemeColor =
      bookThemeColor[selectedBook as keyof typeof bookThemeColor] || undefined;
    router.push({
      pathname: `/(authed)/(tabs)/(read)/[bookName]/reading`,
      params: {
        bookName: selectedBook,
        chapter: selectedChapter.toString(),
        ...(selectedThemeColor && { themeColor: selectedThemeColor }),
      },
    });
  };

  const openBookChapterSheet = () => {
    setShowBookChapterSheet(true);
  };

  const openTranslationSheet = () => {
    setShowTranslationSheet(true);
  };

  const handleTranslationSelect = (translation: string) => {
    setCurrentTranslation(translation);
    // Refetch current chapter with new translation
    fetchChapter(currentChapter, translation);
  };

  const handleReadingActionsPress = () => {
    setShowReadingActions(true);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    saveFontSettings({ fontSize: size });
  };

  const handleFontFamilyChange = (family: string) => {
    setFontFamily(family);
    saveFontSettings({ fontFamily: family });
  };

  const handleLineHeightModeChange = (mode: string) => {
    setLineHeightMode(mode);
    saveFontSettings({ lineHeightMode: mode });
  };

  const handleNavigateToOverview = () => {
    if (bookName) {
      router.push(`/(authed)/(tabs)/(read)/${encodeURIComponent(bookName)}`);
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const contentHeight = contentSize.height;
    const screenHeight = layoutMeasurement.height;

    // Calculate progress (0 to 1)
    const maxScroll = contentHeight - screenHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    setScrollProgress(progress);
  };

  const handleVersePress = (verse: Verse) => {
    setSelectedVerse(verse);
    setShowVerseActions(true);
  };

  const handleHighlightVerse = async (verseId: string, color: string) => {
    if (!session?.user?.id || !bookName || !selectedVerse) return;

    try {
      const verseNumber = parseInt(selectedVerse.verseId.toString());

      // Check if verse is already highlighted
      const existingHighlight = await checkIfVerseHighlighted(
        session.user.id,
        bookName,
        currentChapter,
        verseNumber
      );

      if (existingHighlight) {
        // Update existing highlight color
        await updateUserBookHighlightColor(existingHighlight.id, color);
        console.log("Updated highlight color for verse:", verseId);
      } else {
        // Create new highlight
        const highlightData = {
          user_id: session.user.id,
          book_name: bookName,
          chapter: currentChapter,
          verse: verseNumber,
          verse_text: selectedVerse.verse,
          color: color,
        };

        await createUserBookHighlight(highlightData);
        console.log("Created new highlight for verse:", verseId);
      }

      // Reload highlights to update the UI
      await loadHighlights();
    } catch (error) {
      console.error("Error highlighting verse:", error);
    }
  };

  // Helper function to get highlight color for a verse
  const getVerseHighlightColor = (verseNumber: number): string | null => {
    const highlight = highlights.find((h) => h.verse === verseNumber);
    return highlight ? highlight.color : null;
  };

  const renderVerse = (verse: Verse, index: number) => {
    const lineHeight = getLineHeightValue(lineHeightMode);
    const isSelected = selectedVerse?.id === verse.id;
    const verseNumber = parseInt(verse.verseId.toString());
    const highlightColor = getVerseHighlightColor(verseNumber);

    // Split verse text into words for individual highlighting
    const renderHighlightedText = (text: string) => {
      if (!highlightColor) {
        return text;
      }

      const words = text.split(" ");
      return words.map((word, index) => (
        <Text
          key={index}
          style={{
            backgroundColor: highlightColor,
            paddingHorizontal: 2,
            paddingVertical: 1,
            marginHorizontal: 1,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </Text>
      ));
    };

    return (
      <TouchableOpacity
        key={verse.id}
        style={styles.verseContainer}
        onPress={() => handleVersePress(verse)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.verseText,
            {
              fontSize,
              fontFamily,
              lineHeight: fontSize * lineHeight,
              textDecorationLine: isSelected ? "underline" : "none",
              textDecorationColor: isSelected
                ? resolvedThemeColor || "#888888"
                : "transparent",
            },
          ]}
        >
          <Text
            style={{
              color: resolvedThemeColor || "#888888",
              fontWeight: "700",
              backgroundColor: highlightColor || "transparent",
            }}
          >
            {verse.verseId}{" "}
          </Text>
          {highlightColor ? renderHighlightedText(verse.verse) : verse.verse}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <View style={styles.connectedPill}>
              <TouchableOpacity
                style={styles.bookChapterSection}
                onPress={openBookChapterSheet}
              >
                <Text
                  style={[styles.pillText, { color: themeColor || "#FFFFFF" }]}
                >
                  {bookName} {currentChapter}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.translationSection}
                onPress={openTranslationSheet}
              >
                <Text style={styles.pillText}>{currentTranslation}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/(authed)/(tabs)/(read)")}
            >
              <Ionicons name="book-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Reading Progress Bar - only show when scrolling */}
          {scrollProgress > 0 && (
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${scrollProgress * 100}%`,
                    backgroundColor: resolvedThemeColor || "#888888",
                  },
                ]}
              />
            </View>
          )}
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.PrimaryWhite} />
          <Text style={styles.loadingText}>Loading chapter...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.connectedPill}>
            <TouchableOpacity
              style={styles.bookChapterSection}
              onPress={openBookChapterSheet}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: resolvedThemeColor || "#FFFFFF" },
                ]}
              >
                {bookName} {currentChapter}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.translationSection}
              onPress={openTranslationSheet}
            >
              <Text style={styles.pillText}>{currentTranslation}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(authed)/(tabs)/(read)")}
          >
            <Ionicons name="book" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleReadingActionsPress}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Reading Progress Bar - only show when scrolling */}
        {scrollProgress > 0 && (
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${scrollProgress * 100}%`,
                  backgroundColor: resolvedThemeColor || "#888888",
                },
              ]}
            />
          </View>
        )}
      </View>

      {/* Chapter Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.versesContainer}>
          {verses.map((verse, index) => renderVerse(verse, index))}
        </View>
      </ScrollView>

      {/* Floating Navigation Buttons */}
      {currentChapter > 1 && (
        <TouchableOpacity
          style={styles.floatingPrevButton}
          onPress={handlePreviousChapter}
        >
          <FontAwesome6 name="chevron-left" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.floatingNextButton}
        onPress={handleNextChapter}
      >
        <FontAwesome6 name="chevron-right" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Book Chapter Bottom Sheet */}
      <BookChapterBottomSheet
        visible={showBookChapterSheet}
        onClose={() => setShowBookChapterSheet(false)}
        currentBook={bookName || ""}
        currentChapter={currentChapter}
        themeColor={resolvedThemeColor}
        onBookChapterSelect={handleBookChapterSelect}
      />

      {/* Translation Bottom Sheet */}
      <TranslationBottomSheet
        visible={showTranslationSheet}
        onClose={() => setShowTranslationSheet(false)}
        currentTranslation={currentTranslation}
        themeColor={resolvedThemeColor}
        onTranslationSelect={handleTranslationSelect}
      />

      {/* Reading Actions Bottom Sheet */}
      <ReadingActionsBottomSheet
        visible={showReadingActions}
        onClose={() => setShowReadingActions(false)}
        themeColor={resolvedThemeColor}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        fontFamily={fontFamily}
        onFontFamilyChange={handleFontFamilyChange}
        lineHeightMode={lineHeightMode}
        onLineHeightModeChange={handleLineHeightModeChange}
        bookName={bookName || ""}
        onNavigateToOverview={handleNavigateToOverview}
      />

      {/* Verse Actions Bottom Sheet */}
      <VerseActionsBottomSheet
        visible={showVerseActions}
        onClose={() => {
          setShowVerseActions(false);
          setSelectedVerse(null);
        }}
        themeColor={resolvedThemeColor}
        selectedVerse={
          selectedVerse
            ? {
                id: selectedVerse.id.toString(),
                verseId: selectedVerse.verseId.toString(),
                verse: selectedVerse.verse,
              }
            : undefined
        }
        onHighlightVerse={handleHighlightVerse}
        bookName={bookName || ""}
        currentChapter={currentChapter}
        currentHighlightColor={
          selectedVerse
            ? getVerseHighlightColor(parseInt(selectedVerse.verseId.toString()))
            : null
        }
      />
    </SafeAreaView>
  );
}
