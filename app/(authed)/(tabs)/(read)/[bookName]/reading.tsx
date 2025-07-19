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
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getChapter, Verse } from "@/lib/api/bible";
import { tabBarOptions } from "@/constants/tabBarOptions";
import colors from "@/constants/colors";
import { styles } from "./reading.styles";
import { FontAwesome6 } from "@/utils/icons";
import BookChapterBottomSheet from "@/components/Reading/BookChapterBottomSheet/BookChapterBottomSheet";
import { bookThemeColor } from "@/utils/data/bookThemeColor";

const { width } = Dimensions.get("window");

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
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookChapterSheet, setShowBookChapterSheet] = useState(false);

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
      fetchChapter(currentChapter);
    }
  }, [bookName, currentChapter]);

  const fetchChapter = async (chapter: number) => {
    try {
      setLoading(true);
      const chapterVerses = await getChapter(bookName || "", chapter);
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

  const renderVerse = (verse: Verse, index: number) => (
    <View key={verse.id} style={styles.verseContainer}>
      <Text style={[styles.verseText, { fontSize }]}>
        <Text
          style={{ color: resolvedThemeColor || "#888888", fontWeight: "700" }}
        >
          {verse.verseId}{" "}
        </Text>
        {verse.verse}
      </Text>
    </View>
  );

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
              <View style={styles.translationSection}>
                <Text style={styles.pillText}>NIV</Text>
              </View>
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
            <View style={styles.translationSection}>
              <Text style={styles.pillText}>NIV</Text>
            </View>
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
            onPress={() => setShowSettings(!showSettings)}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Panel */}
      {showSettings && (
        <View style={styles.settingsPanel}>
          <View style={styles.fontSizeControl}>
            <Text style={styles.settingsLabel}>Font Size</Text>
            <View style={styles.fontSizeButtons}>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={() => adjustFontSize(false)}
              >
                <Text style={styles.fontButtonText}>A-</Text>
              </TouchableOpacity>
              <Text style={styles.currentFontSize}>{fontSize}</Text>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={() => adjustFontSize(true)}
              >
                <Text style={styles.fontButtonText}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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
    </SafeAreaView>
  );
}
