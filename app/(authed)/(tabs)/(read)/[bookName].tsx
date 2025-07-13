import React, { useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { DynamicBookImage } from "@/components/UI/DynamicBookImage/DynamicBookImage";
import {
  ButtonText,
  Heading,
  Paragraph,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import {
  oldTestamentBooks,
  OldTestamentBook,
} from "@/utils/data/oldTestamentBooks";
import {
  newTestamentBooks,
  NewTestamentBook,
} from "@/utils/data/newTestamentBooks";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import {
  getBookSummaryByBook,
  BookSummary,
} from "@/lib/supabase/db/book_summaries";
import { styles } from "./BookOverviewScreen.styles";

export default function BookOverviewScreen() {
  const router = useRouter();
  const { bookName } = useLocalSearchParams<{ bookName: string }>();
  const [bookSummary, setBookSummary] = useState<BookSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Find book information and determine testament
  const bookInfo = useMemo(() => {
    if (!bookName) return null;

    // Search in Old Testament books
    const otBook = oldTestamentBooks.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (otBook) {
      return {
        ...otBook,
        testament: "Old Testament",
      };
    }

    // Search in New Testament books
    const ntBook = newTestamentBooks.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (ntBook) {
      return {
        ...ntBook,
        testament: "New Testament",
      };
    }

    return null;
  }, [bookName]);

  // Fetch book summary data on component mount
  useEffect(() => {
    const fetchBookSummary = async () => {
      if (!bookName) return;

      try {
        setLoading(true);
        const summary = await getBookSummaryByBook(bookName);
        setBookSummary(summary);
      } catch (error) {
        console.error("Error fetching book summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookSummary();
  }, [bookName]);

  const handleBack = () => {
    router.back();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to truncate text for inline read more
  const getTruncatedText = (text: string, maxLength: number = 130) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };

  const renderSummaryText = () => {
    if (!bookSummary?.short_summary) return null;

    const fullText = bookSummary.short_summary;
    const shouldTruncate = fullText.length > 130;
    const themeColor = bookSummary?.theme_color || "#ECA7C8";

    if (isExpanded || !shouldTruncate) {
      return (
        <View>
          <Paragraph style={styles.summaryText}>{fullText}</Paragraph>
          {shouldTruncate && (
            <TouchableOpacity
              onPress={toggleExpanded}
              style={styles.readMoreButton}
            >
              <ButtonText style={[styles.readMoreText, { color: themeColor }]}>
                Read Less
              </ButtonText>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    const truncatedText = getTruncatedText(fullText);

    return (
      <Paragraph style={styles.summaryText}>
        {truncatedText}...
        <Text
          style={[styles.readMoreText, { color: themeColor }]}
          onPress={toggleExpanded}
        >
          Read More
        </Text>
      </Paragraph>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Background */}
        <View style={styles.heroSection}>
          {/* Background Image */}
          <View style={styles.backgroundImageContainer}>
            <DynamicBookImage
              bookName={bookName || ""}
              style={styles.backgroundImage}
            />
            {/* Dark Overlay */}
            <View style={styles.backgroundOverlay} />
          </View>

          {/* Header with Back Button, Title, and Share */}
          <View style={styles.heroHeader}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Heading style={styles.heroTitle}>{bookName}</Heading>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Book Image in Center */}
          <View style={styles.bookImageContainer}>
            <DynamicBookImage
              bookName={bookName || ""}
              style={styles.bookImage}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Heading style={styles.statsTitle}>Stats</Heading>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Twemoji hex="270d" size={24} />
              <SubHeading style={styles.statValue}>
                {loading ? "..." : `${bookSummary?.verses || 0} Verses`}
              </SubHeading>
            </View>
            <View style={styles.statItem}>
              <Twemoji hex="23f1" size={24} />
              <SubHeading style={styles.statValue}>
                {loading
                  ? "..."
                  : `${bookSummary?.read_time_minutes || 0} Minutes`}
              </SubHeading>
            </View>
            <View style={styles.statItem}>
              <Twemoji hex="1f4d6" size={24} />
              <SubHeading style={styles.statValue}>
                {loading ? "..." : `${bookSummary?.chapters || 0} Chapters`}
              </SubHeading>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Heading style={styles.summaryTitle}>Summary</Heading>
          {loading ? (
            <Paragraph style={styles.summaryText}>Loading summary...</Paragraph>
          ) : bookSummary?.short_summary ? (
            renderSummaryText()
          ) : (
            <Paragraph style={styles.summaryText}>
              No summary available.
            </Paragraph>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
