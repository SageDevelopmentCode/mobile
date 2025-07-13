import React, { useMemo } from "react";
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
import { styles } from "./BookOverviewScreen.styles";

export default function BookOverviewScreen() {
  const router = useRouter();
  const { bookName } = useLocalSearchParams<{ bookName: string }>();

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

  const handleBack = () => {
    router.back();
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

        {/* Book Info Section */}
        <View style={styles.bookInfoSection}>
          <View style={styles.infoCard}>
            <ButtonText style={styles.infoLabel}>Book Name</ButtonText>
            <Paragraph style={styles.infoValue}>{bookName}</Paragraph>
          </View>

          <View style={styles.infoCard}>
            <ButtonText style={styles.infoLabel}>Testament</ButtonText>
            <Paragraph style={styles.infoValue}>
              {bookInfo?.testament || "Unknown"}
            </Paragraph>
          </View>

          {bookInfo?.genre && (
            <View style={styles.infoCard}>
              <ButtonText style={styles.infoLabel}>Genre</ButtonText>
              <Paragraph style={styles.infoValue}>{bookInfo.genre}</Paragraph>
            </View>
          )}

          {bookInfo?.description && (
            <View style={styles.infoCard}>
              <ButtonText style={styles.infoLabel}>Description</ButtonText>
              <Paragraph style={styles.infoValue}>
                {bookInfo.description}
              </Paragraph>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <ButtonText style={styles.primaryButtonText}>
              Start Reading
            </ButtonText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <ButtonText style={styles.secondaryButtonText}>
              Add to Bookmarks
            </ButtonText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
