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

const { width } = Dimensions.get("window");

export default function ReadingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { bookName, themeColor } = useLocalSearchParams<{
    bookName: string;
    themeColor?: string;
  }>();

  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);

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

  const renderVerse = (verse: Verse, index: number) => (
    <View key={verse.id} style={styles.verseContainer}>
      <Text
        style={[
          styles.verseNumber,
          {
            fontSize: fontSize - 4,
            color: themeColor || "#888888",
          },
        ]}
      >
        {verse.verseId}
      </Text>
      <Text style={[styles.verseText, { fontSize }]}>{verse.verse}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {bookName} {currentChapter}
          </Text>
          <View style={styles.placeholder} />
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
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {bookName} {currentChapter}
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
        <View style={styles.chapterHeader}>
          <Text style={styles.chapterTitle}>Chapter {currentChapter}</Text>
        </View>

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
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.floatingNextButton}
        onPress={handleNextChapter}
      >
        <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
