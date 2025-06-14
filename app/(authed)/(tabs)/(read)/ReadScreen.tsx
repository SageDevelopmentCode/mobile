import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialDesignIcons } from "@/utils/icons";
import { styles } from "./ReadScreen.styles";
import colors from "@/constants/colors";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { DynamicBookImage } from "@/components/UI/DynamicBookImage/DynamicBookImage";
import { getTranslations, Translation } from "@/lib/api/bible";
import { quickReadStories, QuickReadItem } from "@/utils/data/quickReadStories";
import {
  categoriesDisplay,
  CategoryDisplayItem,
} from "@/utils/data/categoriesDisplay";
import {
  oldTestamentBooks,
  OldTestamentBook,
} from "@/utils/data/oldTestamentBooks";
import {
  newTestamentBooks,
  NewTestamentBook,
} from "@/utils/data/newTestamentBooks";

// Import Psalms image
import PsalmsImage from "../../../../assets/images/books/Psalms.png";
import {
  ButtonText,
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/Text/TextComponents";

const { height } = Dimensions.get("window");

interface ContinueReadingBook {
  id: number;
  title: string;
  bookName: string;
  progress?: string;
  coverImage: any;
  isBookmarked: boolean;
}

export default function ReadScreen() {
  const router = useRouter();

  // State for tracking bookmarked books
  const [bookmarkedBooks, setBookmarkedBooks] = useState<Set<number>>(
    new Set([1, 3, 5])
  ); // Some books pre-bookmarked

  // State for tracking bookmarked Old Testament books
  const [bookmarkedOTBooks, setBookmarkedOTBooks] = useState<Set<number>>(
    new Set([1, 19, 20])
  ); // Some OT books pre-bookmarked (Genesis, Psalms, Proverbs)

  // State for tracking bookmarked New Testament books
  const [bookmarkedNTBooks, setBookmarkedNTBooks] = useState<Set<number>>(
    new Set([43, 45, 50])
  ); // Some NT books pre-bookmarked (John, Romans, Philippians)

  // Translation dropdown states
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] =
    useState<Translation | null>(null);
  const [isTranslationDropdownVisible, setIsTranslationDropdownVisible] =
    useState(false);
  const [loadingTranslations, setLoadingTranslations] = useState(false);

  // Continue Reading books data
  const continueReadingBooks: ContinueReadingBook[] = [
    {
      id: 1,
      title: "Ruth",
      bookName: "Ruth",
      progress: "Chapter 2",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(1),
    },
    {
      id: 2,
      title: "Genesis",
      bookName: "Genesis",
      progress: "Chapter 12",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(2),
    },
    {
      id: 3,
      title: "Leviticus",
      bookName: "Leviticus",
      progress: "Chapter 5",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(3),
    },
    {
      id: 4,
      title: "Psalms",
      bookName: "Psalms",
      progress: "Psalm 23",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(4),
    },
    {
      id: 5,
      title: "Matthew",
      bookName: "Matthew",
      progress: "Chapter 8",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(5),
    },
    {
      id: 6,
      title: "John",
      bookName: "John",
      progress: "Chapter 14",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(6),
    },
    {
      id: 7,
      title: "Romans",
      bookName: "Romans",
      progress: "Chapter 3",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(7),
    },
    {
      id: 8,
      title: "James",
      bookName: "James",
      progress: "Chapter 1",
      coverImage: PsalmsImage,
      isBookmarked: bookmarkedBooks.has(8),
    },
  ];

  // Toggle bookmark function
  const toggleBookmark = (bookId: number) => {
    setBookmarkedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  // Toggle bookmark function for Old Testament books
  const toggleOTBookmark = (bookId: number) => {
    setBookmarkedOTBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  // Toggle bookmark function for New Testament books
  const toggleNTBookmark = (bookId: number) => {
    setBookmarkedNTBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  // Translation dropdown functions
  const toggleTranslationDropdown = () => {
    setIsTranslationDropdownVisible(!isTranslationDropdownVisible);
  };

  const selectTranslation = (translation: Translation) => {
    setSelectedTranslation(translation);
    setIsTranslationDropdownVisible(false);
  };

  const renderTranslationItem = ({ item }: { item: Translation }) => (
    <TouchableOpacity
      style={styles.translationDropdownItem}
      onPress={() => selectTranslation(item)}
    >
      <Text style={styles.translationDropdownItemText}>
        {item.abbreviation}
      </Text>
      <Text style={styles.translationDropdownItemDesc}>{item.version}</Text>
    </TouchableOpacity>
  );

  const renderQuickReadItem = ({ item }: { item: QuickReadItem }) => (
    <TouchableOpacity style={styles.quickReadCard}>
      <View style={[styles.quickReadCircle, { borderColor: item.borderColor }]}>
        <DynamicBookImage
          bookName={item.bookName}
          style={styles.quickReadImage}
        />
      </View>
      <Paragraph
        style={styles.quickReadVerse}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.verse}
      </Paragraph>
      <View style={styles.quickReadCategory}>
        <Twemoji hex={item.categoryEmoji} size={16} />
        <ButtonText style={styles.quickReadCategoryText}>
          {item.category}
        </ButtonText>
      </View>
    </TouchableOpacity>
  );

  const renderContinueReadingItem = ({
    item,
  }: {
    item: ContinueReadingBook;
  }) => (
    <TouchableOpacity style={styles.continueReadingCard}>
      <View style={styles.continueReadingBookCoverShadow}>
        <DynamicBookImage
          bookName={item.bookName}
          style={styles.continueReadingBookCover}
        />
      </View>
      <View style={styles.continueReadingBookInfo}>
        <View style={styles.continueReadingTextContainer}>
          <ButtonText style={styles.continueReadingBookTitle}>
            {item.title}
          </ButtonText>
          {item.progress && (
            <ButtonText style={styles.continueReadingProgress}>
              {item.progress}
            </ButtonText>
          )}
        </View>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => toggleBookmark(item.id)}
        >
          <MaterialDesignIcons
            name={item.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={28}
            color={item.isBookmarked ? "#FFD700" : "#8A8A8A"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderOldTestamentItem = ({ item }: { item: OldTestamentBook }) => {
    const isBookmarked = bookmarkedOTBooks.has(item.id);

    return (
      <TouchableOpacity style={styles.continueReadingCard}>
        <View style={styles.continueReadingBookCoverShadow}>
          <DynamicBookImage
            bookName={item.title}
            style={styles.continueReadingBookCover}
          />
        </View>
        <View style={styles.continueReadingBookInfo}>
          <View style={styles.continueReadingTextContainer}>
            <ButtonText style={styles.continueReadingBookTitle}>
              {item.title}
            </ButtonText>
            <ButtonText style={styles.continueReadingProgress}>
              {item.description}
            </ButtonText>
          </View>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => toggleOTBookmark(item.id)}
          >
            <MaterialDesignIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={28}
              color={isBookmarked ? "#FFD700" : "#8A8A8A"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNewTestamentItem = ({ item }: { item: NewTestamentBook }) => {
    const isBookmarked = bookmarkedNTBooks.has(item.id);

    return (
      <TouchableOpacity style={styles.continueReadingCard}>
        <View style={styles.continueReadingBookCoverShadow}>
          <DynamicBookImage
            bookName={item.title}
            style={styles.continueReadingBookCover}
          />
        </View>
        <View style={styles.continueReadingBookInfo}>
          <View style={styles.continueReadingTextContainer}>
            <ButtonText style={styles.continueReadingBookTitle}>
              {item.title}
            </ButtonText>
            <ButtonText style={styles.continueReadingProgress}>
              {item.description}
            </ButtonText>
          </View>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => toggleNTBookmark(item.id)}
          >
            <MaterialDesignIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={28}
              color={isBookmarked ? "#FFD700" : "#8A8A8A"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }: { item: CategoryDisplayItem }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
    >
      <View style={styles.categoryIconContainer}>
        <Twemoji hex={item.emojiHex} size={20} />
      </View>
      <ButtonText style={styles.categoryText} numberOfLines={2}>
        {item.name}
      </ButtonText>
    </TouchableOpacity>
  );

  // Split categories into two rows for independent flow
  const topRowCategories = categoriesDisplay.filter(
    (_, index) => index % 2 === 0
  );
  const bottomRowCategories = categoriesDisplay.filter(
    (_, index) => index % 2 === 1
  );

  // Fetch translations on component mount
  useEffect(() => {
    const fetchTranslations = async () => {
      setLoadingTranslations(true);
      try {
        const translationData = await getTranslations();
        console.log("BIBLE TRANSLATIONS", translationData);

        // Define popularity order for translations
        const popularityOrder = [
          "NIV",
          "ESV",
          "NLT",
          "KJV",
          "ASV",
          "BBE",
          "DARBY",
          "WEB",
          "YLT",
        ];

        // Sort translations by popularity
        const sortedTranslations = translationData.sort((a, b) => {
          const aIndex = popularityOrder.indexOf(a.abbreviation);
          const bIndex = popularityOrder.indexOf(b.abbreviation);

          // If both are in the popularity list, sort by their position
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }

          // If only one is in the popularity list, it goes first
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;

          // If neither is in the popularity list, maintain original order
          return 0;
        });

        setTranslations(sortedTranslations);
        // Set default to NIV or first translation
        const defaultTranslation =
          sortedTranslations.find((t) => t.abbreviation === "NIV") ||
          sortedTranslations[0];
        setSelectedTranslation(defaultTranslation);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
        // Set a fallback
        setSelectedTranslation({
          id: 1,
          abbreviation: "NIV",
          version: "New International Version",
          table: "niv",
          language: "English",
          infoUrl: "",
        });
      } finally {
        setLoadingTranslations(false);
      }
    };

    fetchTranslations();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Icon in top left */}
      <TouchableOpacity
        style={styles.searchIconContainer}
        onPress={() => router.push("/(authed)/(tabs)/(read)/search")}
      >
        <Ionicons name="search" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Translation Dropdown in top right */}
      <TouchableOpacity
        style={styles.translationDropdownContainer}
        onPress={toggleTranslationDropdown}
      >
        <Text style={styles.translationDropdownText}>
          {selectedTranslation?.abbreviation || "NIV"}
        </Text>
        <Ionicons
          name={isTranslationDropdownVisible ? "chevron-up" : "chevron-down"}
          size={16}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* Translation Dropdown Menu */}
      {isTranslationDropdownVisible && (
        <TouchableWithoutFeedback
          onPress={() => setIsTranslationDropdownVisible(false)}
        >
          <View style={styles.translationDropdownOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.translationDropdownMenu}>
                <FlatList
                  data={translations}
                  renderItem={renderTranslationItem}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  style={styles.translationDropdownList}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Read Section */}
        <View style={styles.quickReadSection}>
          <Heading color={colors.PrimaryWhite} style={styles.quickReadTitle}>
            Quick Read
          </Heading>
          <FlatList
            data={quickReadStories}
            renderItem={renderQuickReadItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickReadList}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Heading color={colors.PrimaryWhite} style={styles.categoriesTitle}>
              Categories
            </Heading>
            <TouchableOpacity style={styles.viewAllButton}>
              <ButtonText style={styles.viewAllText}>View All</ButtonText>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.PrimaryPurpleBackground}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesRows}>
            <FlatList
              data={topRowCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContainer}
              style={styles.categoryRow}
            />
            <FlatList
              data={bottomRowCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContainer}
              style={styles.categoryRow}
            />
          </View>
        </View>

        {/* Continue Reading Section */}
        <View style={styles.continueReadingSection}>
          <Heading style={styles.continueReadingTitle}>
            Continue Reading
          </Heading>
          <FlatList
            data={continueReadingBooks}
            renderItem={renderContinueReadingItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continueReadingList}
          />
        </View>

        {/* New Testament Section */}
        <View style={styles.continueReadingSection}>
          <Heading style={styles.continueReadingTitle}>New Testament</Heading>
          <FlatList
            data={newTestamentBooks}
            renderItem={renderNewTestamentItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continueReadingList}
          />
        </View>

        {/* Old Testament Section */}
        <View style={styles.continueReadingSection}>
          <Heading style={styles.continueReadingTitle}>Old Testament</Heading>
          <FlatList
            data={oldTestamentBooks}
            renderItem={renderOldTestamentItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continueReadingList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
