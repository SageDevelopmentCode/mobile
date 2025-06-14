import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialDesignIcons } from "@/utils/icons";
import { styles } from "./ReadScreen.styles";
import colors from "@/constants/colors";
import { DynamicBookImage } from "@/components/UI/DynamicBookImage/DynamicBookImage";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import {
  ButtonText,
  Heading,
  Paragraph,
} from "@/components/Text/TextComponents";
import {
  oldTestamentBooks,
  OldTestamentBook,
} from "@/utils/data/oldTestamentBooks";
import {
  newTestamentBooks,
  NewTestamentBook,
} from "@/utils/data/newTestamentBooks";
import {
  categoriesDisplay,
  CategoryDisplayItem,
} from "@/utils/data/categoriesDisplay";
import { LIFE_CATEGORIES } from "@/utils/data/lifeCategories";
import { books } from "@/utils/data/books";

const { height } = Dimensions.get("window");

type SearchResultType = "book" | "category";

interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  bookName?: string;
  color?: string;
  emojiHex?: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState<Set<string>>(
    new Set()
  );

  // Combine all books for searching
  const allBooks = [
    ...oldTestamentBooks.map((book) => ({
      ...book,
      testament: "OT" as const,
    })),
    ...newTestamentBooks.map((book) => ({
      ...book,
      testament: "NT" as const,
    })),
  ];

  // Helper function to get book by ID
  const getBookById = (id: number) => {
    return books.find((book) => book.id === id);
  };

  // Helper function to get book description from our data
  const getBookDescription = (bookName: string) => {
    const otBook = oldTestamentBooks.find((book) => book.title === bookName);
    if (otBook) return otBook.description;

    const ntBook = newTestamentBooks.find((book) => book.title === bookName);
    if (ntBook) return ntBook.description;

    return undefined;
  };

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search books
    allBooks.forEach((book) => {
      if (book.title.toLowerCase().includes(lowercaseQuery)) {
        results.push({
          id: `book-${book.id}`,
          type: "book",
          title: book.title,
          description: book.description,
          bookName: book.title,
        });
      }
    });

    // Search categories and their related books
    categoriesDisplay.forEach((category) => {
      if (category.name.toLowerCase().includes(lowercaseQuery)) {
        // Add the category itself
        results.push({
          id: `category-${category.id}`,
          type: "category",
          title: category.name,
          color: category.color,
          emojiHex: category.emojiHex,
        });

        // Add books related to this category
        const relatedBookIds = LIFE_CATEGORIES[category.name] || [];
        relatedBookIds.forEach((bookId) => {
          const book = getBookById(bookId);
          if (book) {
            const description = getBookDescription(book.name);
            results.push({
              id: `category-book-${category.id}-${bookId}`,
              type: "book",
              title: book.name,
              description: description || `Related to ${category.name}`,
              bookName: book.name,
            });
          }
        });
      }
    });

    setSearchResults(results);
  };

  // Handle search input change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Toggle bookmark function
  const toggleBookmark = (resultId: string) => {
    setBookmarkedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(resultId)) {
        newSet.delete(resultId);
      } else {
        newSet.add(resultId);
      }
      return newSet;
    });
  };

  // Render search result item
  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    if (item.type === "book") {
      const isBookmarked = bookmarkedBooks.has(item.id);

      return (
        <TouchableOpacity style={styles.continueReadingCard}>
          <View style={styles.continueReadingBookCoverShadow}>
            <DynamicBookImage
              bookName={item.bookName!}
              style={styles.continueReadingBookCover}
            />
          </View>
          <View style={styles.continueReadingBookInfo}>
            <View style={styles.continueReadingTextContainer}>
              <ButtonText style={styles.continueReadingBookTitle}>
                {item.title}
              </ButtonText>
              {item.description && (
                <ButtonText style={styles.continueReadingProgress}>
                  {item.description}
                </ButtonText>
              )}
            </View>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => toggleBookmark(item.id)}
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
    } else {
      // Category result
      return (
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor: item.color }]}
        >
          <View style={styles.categoryIconContainer}>
            <Twemoji hex={item.emojiHex!} size={20} />
          </View>
          <ButtonText style={styles.categoryText} numberOfLines={2}>
            {item.title}
          </ButtonText>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.searchBackButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#8A8A8A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books or categories..."
            placeholderTextColor="#8A8A8A"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8A8A8A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.trim() === "" ? (
          // Empty state
          <View style={styles.searchEmptyState}>
            <Ionicons name="search" size={64} color="#4A4A4A" />
            <Heading
              color={colors.PrimaryWhite}
              style={styles.searchEmptyTitle}
            >
              Search Bible Books & Categories
            </Heading>
            <Paragraph style={styles.searchEmptyDescription}>
              Type to search for specific books like "Genesis", "John" or
              categories like "Love", "Faith"
            </Paragraph>
          </View>
        ) : searchResults.length === 0 ? (
          // No results state
          <View style={styles.searchEmptyState}>
            <Ionicons name="search" size={64} color="#4A4A4A" />
            <Heading
              color={colors.PrimaryWhite}
              style={styles.searchEmptyTitle}
            >
              No Results Found
            </Heading>
            <Paragraph style={styles.searchEmptyDescription}>
              Try searching for different keywords or check your spelling
            </Paragraph>
          </View>
        ) : (
          // Results
          <>
            {/* Category Results */}
            {searchResults.filter((r) => r.type === "category").length > 0 && (
              <View style={styles.searchResultsSection}>
                <Heading
                  color={colors.PrimaryWhite}
                  style={styles.searchSectionTitle}
                >
                  Categories (
                  {searchResults.filter((r) => r.type === "category").length})
                </Heading>
                <FlatList
                  data={searchResults.filter((r) => r.type === "category")}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesScrollContainer}
                />
              </View>
            )}

            {/* Direct Book Results */}
            {searchResults.filter(
              (r) => r.type === "book" && !r.id.includes("category-book")
            ).length > 0 && (
              <View style={styles.searchResultsSection}>
                <Heading
                  color={colors.PrimaryWhite}
                  style={styles.searchSectionTitle}
                >
                  Books (
                  {
                    searchResults.filter(
                      (r) =>
                        r.type === "book" && !r.id.includes("category-book")
                    ).length
                  }
                  )
                </Heading>
                <FlatList
                  data={searchResults.filter(
                    (r) => r.type === "book" && !r.id.includes("category-book")
                  )}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.continueReadingList}
                />
              </View>
            )}

            {/* Category-Related Books */}
            {searchResults.filter(
              (r) => r.type === "book" && r.id.includes("category-book")
            ).length > 0 && (
              <View style={styles.searchResultsSection}>
                <Heading
                  color={colors.PrimaryWhite}
                  style={styles.searchSectionTitle}
                >
                  Related Books (
                  {
                    searchResults.filter(
                      (r) => r.type === "book" && r.id.includes("category-book")
                    ).length
                  }
                  )
                </Heading>
                <FlatList
                  data={searchResults.filter(
                    (r) => r.type === "book" && r.id.includes("category-book")
                  )}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.continueReadingList}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
