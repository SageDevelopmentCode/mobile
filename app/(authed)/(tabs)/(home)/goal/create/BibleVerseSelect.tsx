import React, { useEffect, useState, useRef } from "react";
import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import colors from "@/constants/colors";
import {
  FontAwesome6,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@/utils/icons";
import { tabBarOptions } from "@/constants/tabBarOptions";
import {
  Paragraph,
  Title,
  Heading,
  StatText,
  ButtonText,
} from "@/components/Text/TextComponents";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import { SuggestionItem } from "@/components/Suggestion";
import { categorizedVerses, verseCategories } from "@/constants/bibleVerses";
import { BIBLE_API_URL } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseHTML } from "@/utils/search/parseHighlightedVerse";
import { getBookId } from "@/utils/book/getBookId";
import { convertAbbreviationToFullName } from "@/utils/book/convertAbbreviationToFullName";
// Import verse data
import bibleVerseData from "@/utils/data/versesInChapter.json";

// Define the type for Bible data structure
type BibleBook = {
  chapters: number;
  totalVerses: number;
  versesPerChapter: {
    [key: string]: number;
  };
};

type BibleTestament = {
  [key: string]: BibleBook;
};

type BibleData = {
  oldTestament: BibleTestament;
  newTestament: BibleTestament;
};

// Ensure proper typing for the imported JSON
const typedBibleData = bibleVerseData as BibleData;

// Bible books for search
const bibleBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

// Common book abbreviations
const bookAbbreviations: { [key: string]: string } = {
  gen: "Genesis",
  exo: "Exodus",
  lev: "Leviticus",
  num: "Numbers",
  deu: "Deuteronomy",
  josh: "Joshua",
  judg: "Judges",
  ruth: "Ruth",
  "1sam": "1 Samuel",
  "2sam": "2 Samuel",
  "1kin": "1 Kings",
  "2kin": "2 Kings",
  "1chr": "1 Chronicles",
  "2chr": "2 Chronicles",
  ezra: "Ezra",
  neh: "Nehemiah",
  est: "Esther",
  job: "Job",
  ps: "Psalms",
  psa: "Psalms",
  pro: "Proverbs",
  prov: "Proverbs",
  ecc: "Ecclesiastes",
  song: "Song of Solomon",
  isa: "Isaiah",
  jer: "Jeremiah",
  lam: "Lamentations",
  eze: "Ezekiel",
  dan: "Daniel",
  hos: "Hosea",
  joel: "Joel",
  amos: "Amos",
  obad: "Obadiah",
  jon: "Jonah",
  mic: "Micah",
  nah: "Nahum",
  hab: "Habakkuk",
  zep: "Zephaniah",
  hag: "Haggai",
  zec: "Zechariah",
  mal: "Malachi",
  matt: "Matthew",
  mat: "Matthew",
  mark: "Mark",
  mrk: "Mark",
  luke: "Luke",
  luk: "Luke",
  john: "John",
  jhn: "John",
  acts: "Acts",
  rom: "Romans",
  "1cor": "1 Corinthians",
  "2cor": "2 Corinthians",
  gal: "Galatians",
  eph: "Ephesians",
  phil: "Philippians",
  col: "Colossians",
  "1the": "1 Thessalonians",
  "1thes": "1 Thessalonians",
  "2the": "2 Thessalonians",
  "2thes": "2 Thessalonians",
  "1tim": "1 Timothy",
  "2tim": "2 Timothy",
  tit: "Titus",
  phile: "Philemon",
  heb: "Hebrews",
  jas: "James",
  "1pet": "1 Peter",
  "2pet": "2 Peter",
  "1jn": "1 John",
  "1john": "1 John",
  "2jn": "2 John",
  "2john": "2 John",
  "3jn": "3 John",
  "3john": "3 John",
  jude: "Jude",
  rev: "Revelation",
};

// Helper function to get number of chapters for a book
const getChapterCount = (book: string): number => {
  // First check if the book is in the Old Testament
  if (typedBibleData.oldTestament && typedBibleData.oldTestament[book]) {
    return typedBibleData.oldTestament[book].chapters;
  }
  // Then check if it's in the New Testament
  if (typedBibleData.newTestament && typedBibleData.newTestament[book]) {
    return typedBibleData.newTestament[book].chapters;
  }

  // Default fallback
  return 30;
};

// Helper function to get verses for a specific chapter
const getVersesForChapter = (book: string, chapter: number): number => {
  const chapterStr = chapter.toString();

  // Check if the book is in the Old Testament
  if (
    typedBibleData.oldTestament &&
    typedBibleData.oldTestament[book] &&
    typedBibleData.oldTestament[book].versesPerChapter[chapterStr]
  ) {
    return typedBibleData.oldTestament[book].versesPerChapter[chapterStr];
  }

  // Check if the book is in the New Testament
  if (
    typedBibleData.newTestament &&
    typedBibleData.newTestament[book] &&
    typedBibleData.newTestament[book].versesPerChapter[chapterStr]
  ) {
    return typedBibleData.newTestament[book].versesPerChapter[chapterStr];
  }

  // Default fallback
  return 30;
};

// Helper function to normalize book name
const normalizeBookName = (bookName: string): string => {
  const lowercase = bookName.toLowerCase().trim();
  if (bookAbbreviations[lowercase]) {
    return bookAbbreviations[lowercase];
  }

  // Check for books with full names
  const matchedBook = bibleBooks.find(
    (book) =>
      book.toLowerCase() === lowercase || book.toLowerCase().includes(lowercase)
  );

  return matchedBook || bookName;
};

export default function BibleVerseSelectScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");
  const suggestedVerse: any = searchParams.get("verse");
  const suggestedVerseText: any = searchParams.get("verseText");
  const category: any = searchParams.get("category");

  const [selectedReference, setSelectedReference] = useState<string>(
    suggestedVerse || ""
  );
  const [selectedVerseText, setSelectedVerseText] = useState<string>(
    suggestedVerseText || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Bottom sheet state
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [cachedResults, setCachedResults] = useState<{
    [key: string]: any;
  }>({});

  // New state for book/chapter/verse navigation
  const [searchMode, setSearchMode] = useState<
    "search" | "book" | "chapter" | "verse"
  >("search");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [bookSearchResults, setBookSearchResults] = useState<string[]>([]);
  const [chapterList, setChapterList] = useState<number[]>([]);
  const [verseList, setVerseList] = useState<number[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<{
    reference: string;
    text: string;
  } | null>(null);

  // Use imported verse categories
  const [activeCategory, setActiveCategory] = useState<string>(
    verseCategories[0]
  );

  // Animation values
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const handleCategoryPress = (category: string): void => {
    setActiveCategory(category);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    // Don't restore tab bar on unmount - let GoalCreate handle it
    return () => {};
  }, [navigation]);

  // Load cache from AsyncStorage on mount
  useEffect(() => {
    const loadCache = async () => {
      try {
        const storedCache = await AsyncStorage.getItem("verseSearchCache");
        if (storedCache) {
          setCachedResults(JSON.parse(storedCache));
        }
      } catch (error) {
        console.error("Error loading cache:", error);
      }
    };

    loadCache();
  }, []);

  // Get verses for the active category
  const suggestedVerses =
    categorizedVerses[activeCategory as keyof typeof categorizedVerses] || [];

  const handleContinue = () => {
    router.push({
      pathname: "/(authed)/(tabs)/(home)/goal/create/success/GoalCreateSuccess",
      params: {
        goal,
        emoji,
        verse: selectedReference,
        category,
      },
    });
  };

  const handleSelectSuggestedVerse = (reference: string, text: string) => {
    setSelectedReference(reference);
    setSelectedVerseText(text);
  };

  const openVerseSelector = () => {
    setModalVisible(true);
    setSearchMode("search");
    setSelectedBook("");
    setSelectedChapter(null);
    setBookSearchResults([]);
    setChapterList([]);
    setVerseList([]);

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSearch = () => {
    setSearchLoading(true);
    setSearchMode("book");

    if (!searchTerm.trim()) {
      // If empty search, show all books
      setBookSearchResults(bibleBooks);
      setSearchLoading(false);
      return;
    }

    // Check if it's a specific verse reference (Book Chapter:Verse)
    const verseRegex = /^([a-zA-Z0-9\s]+)\s+(\d+)(?::(\d+))?$/;
    const verseMatch = searchTerm.trim().match(verseRegex);

    if (verseMatch) {
      const bookName = normalizeBookName(verseMatch[1]);
      const chapter = parseInt(verseMatch[2], 10);
      const verse = verseMatch[3] ? parseInt(verseMatch[3], 10) : null;

      setSelectedBook(bookName);
      setSelectedChapter(chapter);

      if (verse) {
        // Direct verse reference - fetch the verse
        fetchSpecificVerse(bookName, chapter, verse);
      } else {
        // Chapter reference - show verses in that chapter
        showVersesForChapter(bookName, chapter);
      }
      return;
    }

    // General book search
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const results = bibleBooks.filter((book) =>
      book.toLowerCase().includes(normalizedSearch)
    );

    setBookSearchResults(results);
    setSearchLoading(false);
  };

  const handleBookSelect = (book: string) => {
    setSelectedBook(book);
    setSearchMode("chapter");

    // Generate chapters list based on the selected book
    const chapterCount = getChapterCount(book);
    const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
    setChapterList(chapters);
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setSearchMode("verse");
    showVersesForChapter(selectedBook, chapter);
  };

  const showVersesForChapter = (book: string, chapter: number) => {
    // Generate verses list based on the selected book and chapter
    const verseCount = getVersesForChapter(book, chapter);
    const verses = Array.from({ length: verseCount }, (_, i) => i + 1);
    setVerseList(verses);
  };

  const handleVerseSelect = (verse: number) => {
    fetchSpecificVerse(selectedBook, selectedChapter!, verse);
  };

  const fetchSpecificVerse = async (
    book: string,
    chapter: number,
    verse: number
  ) => {
    setSearchLoading(true);
    const reference = `${book} ${chapter}:${verse}`;

    // Check cache first
    if (cachedResults[reference]) {
      console.log("From Cache:", cachedResults[reference]);
      applyVerseResult(cachedResults[reference]);
      return;
    }

    try {
      // Format API URL - replace spaces with + and ensure proper encoding
      const formattedReference = reference.replace(/\s+/g, "+");
      const apiUrl = `https://bible-api.com/${encodeURIComponent(
        formattedReference
      )}`;

      console.log("Fetching verse from:", apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch verse");
      }

      const data = await response.json();
      console.log("Verse data:", data);

      // Cache the result
      const updatedCache = { ...cachedResults, [reference]: data };
      setCachedResults(updatedCache);
      await AsyncStorage.setItem(
        "verseSearchCache",
        JSON.stringify(updatedCache)
      );

      applyVerseResult(data);
    } catch (error) {
      console.error("Error fetching verse:", error);
      Alert.alert("Error", "Failed to fetch the verse. Please try again.");
      setSearchLoading(false);
    }
  };

  const applyVerseResult = (data: any) => {
    if (data && data.reference && data.text) {
      // Set the selected verse
      setSelectedReference(data.reference);
      setSelectedVerseText(data.text.trim());

      // Close the bottom sheet with animation
      closeModal();
    }
    setSearchLoading(false);
  };

  // Function to go back to the previous search level
  const handleBack = () => {
    if (searchMode === "verse") {
      setSearchMode("chapter");
      setVerseList([]);
    } else if (searchMode === "chapter") {
      setSearchMode("book");
      setChapterList([]);
      setSelectedBook("");
    } else if (searchMode === "book") {
      setSearchMode("search");
      setBookSearchResults([]);
    }
  };

  // Close modal with animation
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setBottomSheetVisible(false);
    });
  };

  const renderSearchContent = () => {
    if (searchLoading) {
      return (
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color="#51B7AB" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    switch (searchMode) {
      case "search":
        return (
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchPrompt}>
              Search for a Bible book or enter a specific reference (e.g., John
              3:16)
            </Text>
          </View>
        );

      case "book":
        return (
          <>
            <Text style={styles.selectionHeader}>Select a Book</Text>
            <FlatList
              data={bookSearchResults}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleBookSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.resultText}>{item}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.DarkPrimaryText}
                  />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noResults}>
                  No books found matching your search
                </Text>
              }
            />
          </>
        );

      case "chapter":
        return (
          <View style={styles.resultContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>
                Chapters in {selectedBook}
              </Text>
              <Text style={styles.helperText}>
                Tap a chapter to view verses
              </Text>
            </View>
            <View style={styles.gridContainer}>
              {chapterList.map((chapter) => (
                <TouchableOpacity
                  key={chapter.toString()}
                  style={styles.chapterItem}
                  onPress={() => handleChapterSelect(chapter)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chapterText}>{chapter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case "verse":
        return (
          <View style={styles.resultContainer}>
            <View style={styles.verseHeaderContainer}>
              <View style={styles.verseHeaderContent}>
                <Text style={styles.verseSectionTitle}>
                  {selectedBook} - Chapter {selectedChapter}
                </Text>
                <Text style={styles.verseCount}>{verseList.length} verses</Text>
                <Text style={styles.helperText}>
                  Select a verse to add to your goal
                </Text>
              </View>

              <View style={styles.chapterNavigation}>
                {selectedChapter !== null && selectedChapter > 1 && (
                  <TouchableOpacity
                    style={styles.chapterNavButton}
                    onPress={() => {
                      const prevChapter = selectedChapter - 1;
                      setSelectedChapter(prevChapter);
                      showVersesForChapter(selectedBook, prevChapter);
                    }}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={colors.PrimaryWhite}
                    />
                  </TouchableOpacity>
                )}

                {selectedChapter !== null &&
                  selectedChapter < getChapterCount(selectedBook) && (
                    <TouchableOpacity
                      style={styles.chapterNavButton}
                      onPress={() => {
                        const nextChapter = selectedChapter + 1;
                        setSelectedChapter(nextChapter);
                        showVersesForChapter(selectedBook, nextChapter);
                      }}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.PrimaryWhite}
                      />
                    </TouchableOpacity>
                  )}
              </View>
            </View>

            <View style={styles.gridContainer}>
              {verseList.map((verse) => (
                <TouchableOpacity
                  key={verse.toString()}
                  style={styles.verseItem}
                  onPress={() => handleVerseSelect(verse)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.verseItemText}>{verse}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{ width: "100%", alignItems: "flex-start", marginBottom: 20 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              color={colors.PrimaryWhite}
              size={30}
            />
          </TouchableOpacity>
        </View>

        <Title color={colors.PrimaryWhite} style={{ marginBottom: 20 }}>
          Add a Bible verse to your goal
        </Title>

        <TouchableOpacity
          style={styles.verseContainer}
          onPress={openVerseSelector}
        >
          {selectedReference ? (
            <>
              <Text style={styles.referenceTitle}>{selectedReference}</Text>
              <Text style={styles.verseText}>{selectedVerseText}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>
              Tap to search for a verse
            </Text>
          )}
        </TouchableOpacity>

        <ActionButton
          type="PrimaryGray"
          title={isLoading ? "Loading..." : "Continue"}
          onPress={handleContinue}
          disabled={isLoading || !selectedReference}
          icon={
            isLoading ? (
              <ActivityIndicator size="small" color={colors.DarkPrimaryText} />
            ) : (
              <FontAwesome6
                name="arrow-right"
                size={20}
                color={colors.DarkPrimaryText}
              />
            )
          }
        />

        <View style={styles.suggestionSection}>
          <Paragraph
            color={colors.PrimaryGrayBackground}
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            Suggested Verses
          </Paragraph>

          <ScrollView style={styles.suggestionsContainer}>
            {suggestedVerses.map((verse, index) => (
              <SuggestionItem
                key={index}
                emoji={verse.emoji}
                title={verse.title}
                onPress={() =>
                  handleSelectSuggestedVerse(verse.reference, verse.text)
                }
                energyCount={0}
                style={[styles.suggestionItem]}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.categoriesNavigator}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {verseCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeCategory === category && styles.activeTab,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[styles.tabText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Custom Modal Implementation with Separate Animations */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={closeModal}
          >
            <Animated.View
              style={[
                styles.bottomSheet,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <View style={styles.sheetHeader}>
                  <View style={styles.headerLeftSection}>
                    {searchMode !== "search" && (
                      <TouchableOpacity
                        onPress={handleBack}
                        style={styles.backButton}
                      >
                        <MaterialIcons
                          name="arrow-back"
                          size={24}
                          color={colors.DarkPrimaryText}
                        />
                      </TouchableOpacity>
                    )}
                    <Title>
                      {searchMode === "search"
                        ? "Search Bible Verses"
                        : searchMode === "book"
                        ? "Select Book"
                        : searchMode === "chapter"
                        ? `${selectedBook}`
                        : `${selectedBook} Chapter ${selectedChapter}`}
                    </Title>
                  </View>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={colors.DarkPrimaryText}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search by book or reference (e.g., John 3:16)"
                    placeholderTextColor={colors.GrayText}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                  />
                  <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.searchButton}
                  >
                    <FontAwesome
                      name="search"
                      size={18}
                      color={colors.PrimaryWhite}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.resultsContainer}>
                  {renderSearchContent()}
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51B7AB",
    padding: 20,
    paddingTop: 80,
    position: "relative",
  },
  verseContainer: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: 15,
    minHeight: 80,
  },
  referenceTitle: {
    color: colors.PrimaryWhite,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  verseText: {
    color: colors.PrimaryWhite,
    fontSize: 15,
    lineHeight: 20,
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  suggestionSection: {
    flex: 1,
    marginTop: 10,
    marginBottom: "12%",
  },
  suggestionsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  suggestionItem: {
    marginBottom: 8,
  },
  selectedSuggestion: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  categoriesNavigator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#3C8A81",
    height: "10%",
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 2,
    paddingHorizontal: 15,
  },
  tabContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#51B7AB",
  },
  tabText: {
    fontSize: 14,
    color: colors.PrimaryWhite,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchable: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: colors.PrimaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.PrimaryGrayBackground,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: colors.DarkPrimaryText,
  },
  searchButton: {
    backgroundColor: "#51B7AB",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonAlt: {
    backgroundColor: "#3C8A81",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  resultsContainer: {
    flex: 1,
  },
  searchInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  searchPrompt: {
    fontSize: 16,
    color: colors.GrayText,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },
  selectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.DarkPrimaryText,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  resultItem: {
    backgroundColor: colors.PrimaryGrayBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  resultText: {
    fontSize: 16,
    color: colors.DarkPrimaryText,
    fontWeight: "500",
  },
  noResults: {
    textAlign: "center",
    color: colors.GrayText,
    marginTop: 20,
    fontStyle: "italic",
  },
  headerContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.DarkPrimaryText,
    marginBottom: 5,
  },
  verseCount: {
    fontSize: 14,
    color: colors.PrimaryWhite,
    marginBottom: 5,
    fontWeight: "500",
    opacity: 0.9,
  },
  helperText: {
    fontSize: 14,
    color: colors.GrayText,
    marginBottom: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  chapterItem: {
    width: "22%",
    aspectRatio: 1,
    margin: "1.5%",
    backgroundColor: "#51B7AB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chapterText: {
    color: colors.PrimaryWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
  verseHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#3C8A81",
    padding: 12,
    borderRadius: 12,
  },
  verseHeaderContent: {
    flex: 1,
  },
  verseSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.PrimaryWhite,
    marginBottom: 5,
  },
  chapterNavigation: {
    flexDirection: "row",
  },
  chapterNavButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginLeft: 8,
  },
  verseItem: {
    width: "22%",
    aspectRatio: 1,
    margin: "1.5%",
    backgroundColor: "#3C8A81",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  verseItemText: {
    color: colors.PrimaryWhite,
    fontSize: 16,
    fontWeight: "500",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.DarkPrimaryText,
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
  },
});
