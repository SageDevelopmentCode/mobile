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
import { tabBarOptions } from "@/constants/tabBarOptions";
import { getCrossReferences, type CrossReference } from "@/lib/api/bible";
import { styles } from "./crossreferences.styles";

export default function CrossReferencesScreen() {
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

  const [crossReferences, setCrossReferences] = useState<CrossReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        tabBarActiveTintColor: resolvedThemeColor || "#888888",
      });
  }, [navigation, resolvedThemeColor]);

  useEffect(() => {
    const fetchCrossReferences = async () => {
      if (!bookName || !chapter || !verseId) return;

      try {
        setLoading(true);
        setError(null);
        const references = await getCrossReferences(
          bookName,
          parseInt(chapter),
          parseInt(verseId)
        );

        // Flatten the array of arrays structure
        const flattenedReferences = references.flat();
        setCrossReferences(flattenedReferences);
      } catch (err) {
        console.error("Error fetching cross references:", err);
        setError("Failed to load cross references");
      } finally {
        setLoading(false);
      }
    };

    fetchCrossReferences();
  }, [bookName, chapter, verseId]);

  const handleBack = () => {
    router.back();
  };

  const handleVersePress = (reference: CrossReference) => {
    // Navigate to the specific verse in the reading screen with auto-scroll
    router.push({
      pathname: `/(authed)/(tabs)/(read)/[bookName]/reading`,
      params: {
        bookName: reference.book.name,
        chapter: reference.chapterId.toString(),
        verse: reference.verseId.toString(),
        themeColor: resolvedThemeColor,
      },
    });
  };

  const renderCrossReferenceCard = (
    reference: CrossReference,
    index: number
  ) => (
    <TouchableOpacity
      key={reference.id}
      style={styles.verseCard}
      onPress={() => handleVersePress(reference)}
      activeOpacity={0.7}
    >
      <View style={styles.verseHeader}>
        <ButtonText
          style={[styles.verseReference, { color: resolvedThemeColor }]}
        >
          {reference.book.name} {reference.chapterId}:{reference.verseId}
        </ButtonText>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={resolvedThemeColor}
          style={styles.chevronIcon}
        />
      </View>
      <Paragraph style={styles.verseText}>{reference.verse}</Paragraph>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Heading style={styles.headerTitle}>Cross References</Heading>
          <ButtonText style={styles.headerSubtitle}>
            {bookName} {chapter}:{verseId}
          </ButtonText>
        </View>
      </View>

      {/* Original Verse */}
      <View style={styles.originalVerseContainer}>
        <ButtonText
          style={[styles.originalVerseLabel, { color: resolvedThemeColor }]}
        >
          Original Verse
        </ButtonText>
        <View
          style={[
            styles.originalVerseCard,
            { borderLeftColor: resolvedThemeColor },
          ]}
        >
          <ButtonText
            style={[
              styles.originalVerseReference,
              { color: resolvedThemeColor },
            ]}
          >
            {bookName} {chapter}:{verseId}
          </ButtonText>
          <Paragraph style={styles.originalVerseText}>{verseText}</Paragraph>
        </View>
      </View>

      {/* Cross References Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={resolvedThemeColor} />
            <ButtonText style={styles.loadingText}>
              Loading cross references...
            </ButtonText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color="#FF6B9D" />
            <ButtonText style={styles.errorText}>{error}</ButtonText>
            <TouchableOpacity
              style={[
                styles.retryButton,
                { backgroundColor: resolvedThemeColor },
              ]}
              onPress={() => {
                setError(null);
                // Trigger refetch
                const fetchCrossReferences = async () => {
                  if (!bookName || !chapter || !verseId) return;
                  try {
                    setLoading(true);
                    const references = await getCrossReferences(
                      bookName,
                      parseInt(chapter),
                      parseInt(verseId)
                    );
                    // Flatten the array of arrays structure
                    const flattenedReferences = references.flat();
                    setCrossReferences(flattenedReferences);
                  } catch (err) {
                    setError("Failed to load cross references");
                  } finally {
                    setLoading(false);
                  }
                };
                fetchCrossReferences();
              }}
            >
              <ButtonText style={styles.retryButtonText}>Try Again</ButtonText>
            </TouchableOpacity>
          </View>
        ) : crossReferences.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="library" size={48} color="#666666" />
            <ButtonText style={styles.emptyText}>
              No cross references found for this verse
            </ButtonText>
            <ButtonText style={styles.emptySubtext}>
              Cross references help you discover related verses and themes
              throughout Scripture.
            </ButtonText>
          </View>
        ) : (
          <>
            <ButtonText style={[styles.sectionTitle, { color: "#FFFFFF" }]}>
              Related Verses ({crossReferences.length})
            </ButtonText>
            <View style={styles.referencesContainer}>
              {crossReferences.map(renderCrossReferenceCard)}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
