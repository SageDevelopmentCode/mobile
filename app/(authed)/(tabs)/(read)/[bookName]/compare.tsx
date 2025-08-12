import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ButtonText,
  Heading,
  Paragraph,
} from "@/components/Text/TextComponents";
import { bookThemeColor } from "@/utils/data/bookThemeColor";
import { getTranslations, getVerse, Translation, Verse } from "@/lib/api/bible";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./compare.styles";

interface TranslationVerse {
  translation: Translation;
  verse: Verse | null;
  error?: string;
}

export default function CompareTranslationsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { bookName, chapter, verseId, verseText, themeColor } =
    useLocalSearchParams<{
      bookName: string;
      chapter: string;
      verseId: string;
      verseText: string;
      themeColor?: string;
    }>();

  // Get theme color from bookThemeColor.ts if not provided in params
  const resolvedThemeColor =
    themeColor ||
    (bookName
      ? bookThemeColor[bookName as keyof typeof bookThemeColor] || "#888888"
      : "#888888");

  const [loading, setLoading] = useState(true);
  const [translationVerses, setTranslationVerses] = useState<
    TranslationVerse[]
  >([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
        tabBarStyle: {
          ...tabBarOptions.tabBarStyle,
          backgroundColor: "#282828",
        },
        tabBarActiveTintColor: resolvedThemeColor,
      });
  }, [navigation, resolvedThemeColor]);

  useEffect(() => {
    fetchTranslationsAndVerses();
  }, [bookName, chapter, verseId]);

  const fetchTranslationsAndVerses = async () => {
    if (!bookName || !chapter || !verseId) return;

    setLoading(true);
    try {
      // Get all available translations
      const translations = await getTranslations();

      // Fetch the verse for each translation
      const translationVersePromises = translations.map(async (translation) => {
        try {
          const verse = await getVerse(
            bookName,
            parseInt(chapter),
            parseInt(verseId),
            translation.abbreviation
          );
          return {
            translation,
            verse,
          };
        } catch (error) {
          console.warn(
            `Failed to fetch verse for ${translation.abbreviation}:`,
            error
          );
          return {
            translation,
            verse: null,
            error: `Failed to load ${translation.abbreviation}`,
          };
        }
      });

      const results = await Promise.all(translationVersePromises);

      // Filter out failed translations and sort by abbreviation
      const successfulResults = results
        .filter((result) => result.verse !== null)
        .sort((a, b) =>
          a.translation.abbreviation.localeCompare(b.translation.abbreviation)
        );

      setTranslationVerses(successfulResults);
    } catch (error) {
      console.error("Error fetching translations:", error);
      Alert.alert("Error", "Failed to load translations. Please try again.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderTranslationCard = (translationVerse: TranslationVerse) => {
    const { translation, verse, error } = translationVerse;

    return (
      <View key={translation.id} style={styles.translationCard}>
        <View style={styles.translationHeader}>
          <ButtonText
            style={[styles.translationName, { color: resolvedThemeColor }]}
          >
            {translation.abbreviation}
          </ButtonText>
          <Paragraph style={styles.translationVersion}>
            {translation.version}
          </Paragraph>
        </View>

        {error ? (
          <Paragraph style={styles.errorText}>{error}</Paragraph>
        ) : verse ? (
          <Paragraph style={styles.verseText}>{verse.verse}</Paragraph>
        ) : (
          <ActivityIndicator size="small" color={resolvedThemeColor} />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Heading style={styles.headerTitle}>Compare Translations</Heading>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={resolvedThemeColor} />
          <Paragraph style={styles.loadingText}>
            Loading translations...
          </Paragraph>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Compare Translations</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Original Verse Reference */}
        <View style={styles.referenceContainer}>
          <ButtonText
            style={[styles.verseReference, { color: resolvedThemeColor }]}
          >
            {bookName} {chapter}:{verseId}
          </ButtonText>
          <Paragraph style={styles.referenceDescription}>
            Comparing {translationVerses.length} translations
          </Paragraph>
        </View>

        {/* Translation Cards */}
        <View style={styles.translationsContainer}>
          {translationVerses.map(renderTranslationCard)}
        </View>

        {translationVerses.length === 0 && (
          <View style={styles.emptyContainer}>
            <Paragraph style={styles.emptyText}>
              No translations available for this verse.
            </Paragraph>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
