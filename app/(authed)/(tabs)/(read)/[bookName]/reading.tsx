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
import { bookThemeColor } from "@/utils/data/bookThemeColor";

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
  const [currentTranslation, setCurrentTranslation] = useState("NIV");

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

  const renderVerse = (verse: Verse, index: number) => {
    const lineHeight = getLineHeightValue(lineHeightMode);
    return (
      <View key={verse.id} style={styles.verseContainer}>
        <Text
          style={[
            styles.verseText,
            { fontSize, fontFamily, lineHeight: fontSize * lineHeight },
          ]}
        >
          <Text
            style={{
              color: resolvedThemeColor || "#888888",
              fontWeight: "700",
            }}
          >
            {verse.verseId}{" "}
          </Text>
          {verse.verse}
        </Text>
      </View>
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
      </View>

      {/* Chapter Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
      />
    </SafeAreaView>
  );
}
