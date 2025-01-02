import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./ReadScreen.styles";
import { ButtonText, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome5, Ionicons } from "@/utils/icons";
import { BIBLE_API_URL } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchResults } from "@/types/SearchResults";
import { parseHTML } from "@/utils/search/parseHighlightedVerse";
import { getBookId } from "@/utils/book/getBookId";
import { convertAbbreviationToFullName } from "@/utils/book/convertAbbreviationToFullName";

export default function ReadScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const options = ["NIV", "ESV", "KJV"];

  const [searchTerm, setSearchTerm] = useState("");
  const [cachedResults, setCachedResults] = useState<{
    [key: string]: SearchResults;
  }>({});

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [bookSearchResults, setBookSearchResults] = useState();

  // Load cache from AsyncStorage on mount
  useEffect(() => {
    const loadCache = async () => {
      try {
        const storedCache = await AsyncStorage.getItem("searchCache");
        if (storedCache) {
          setCachedResults(JSON.parse(storedCache));
        }
      } catch (error) {
        console.error("Error loading cache:", error);
      }
    };

    loadCache();
  }, []);

  const handleSearch = async () => {
    setSearchLoading(true);
    setSearchResultsOpen(true);

    // TODO: Book Search w optional chapter, verse
    const regex = /^([\d\w\s]+?)(\d+)?(?:[:\s](\d+))?(?:-(\d+))?$/;
    const match = searchTerm.match(regex);

    if (match) {
      const bookId = getBookId(convertAbbreviationToFullName(match[1].trim())); // Extract book name
      const chapter = match[2] ? parseInt(match[2], 10) : null; // Extract chapter number
      const startVerse = match[3] ? parseInt(match[3], 10) : null; // Extract starting verse
      const endVerse = match[4] ? parseInt(match[4], 10) : null; // Extract ending verse

      if (bookId) {
        if (cachedResults[bookId]) {
          console.log("From Search Cache:", cachedResults[bookId]);
          setSearchResults(cachedResults[bookId]);
          return;
        }
        const bookApiUrl = `${BIBLE_API_URL}/books/${bookId}`;
      }
    }

    // TODO: Word Search Term
    if (!searchTerm.trim().toLowerCase()) {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }

    const editedSearchTerm = searchTerm.trim().toLowerCase();

    // Check cache first
    if (cachedResults[editedSearchTerm]) {
      console.log("From Search Cache:", cachedResults[editedSearchTerm]);
      setSearchResults(cachedResults[editedSearchTerm]);
      return;
    }

    console.log("search term: ", searchTerm.trim().toLowerCase());

    const apiUrl = `${BIBLE_API_URL}/search?query=${editedSearchTerm}&translation=NIV&offset=0&limit=100`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("search data: ", data); // Handle the search results here

      setSearchResults(data);

      // Update cache
      const updatedCache = { ...cachedResults, [editedSearchTerm]: data };
      setCachedResults(updatedCache);

      // Save to AsyncStorage
      await AsyncStorage.setItem("searchCache", JSON.stringify(updatedCache));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while fetching data.");
    } finally {
      setSearchLoading(false);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0]
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  console.log("search results:", searchResults);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.version}>
          <Title color={colors.BrownPrimaryText}>Bible</Title>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <ButtonText color={colors.BrownPrimaryText}>
              {selectedOption}
            </ButtonText>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.dropdown}>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectOption(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center", // Ensures vertical alignment
            marginTop: 20, // Added margin here instead of inside searchBar
            position: "relative",
          }}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Search Word, Book, Character"
            placeholderTextColor={colors.GrayText}
            value={searchTerm}
            onChangeText={setSearchTerm}
          ></TextInput>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome5
              style={{
                marginLeft: 10,
              }}
              name="search"
              size={25}
              color={colors.DarkPrimaryText}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchResultsOpen && (
        <View style={styles.searchResults}>
          <ScrollView style={styles.scrollSearch}>
            {searchResults?.items !== null ? (
              searchResults?.items.map((item: any) => {
                const isOldTestament = item.book.testament === "Old Testament";
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.resultItem,
                      {
                        backgroundColor: isOldTestament ? "#f0f0f0" : "#d0f0d0",
                      }, // Change background based on testament
                    ]}
                  >
                    <Text style={styles.verse}>
                      {item.book.name} {item.chapterId}:{item.verseId}
                    </Text>
                    <Text style={styles.verseText}>
                      {parseHTML(item.verse)}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>No results found for {searchTerm}</Text>
            )}
          </ScrollView>
          <TouchableOpacity onPress={() => setSearchResultsOpen(false)}>
            <Ionicons
              style={{
                marginRight: 10,
              }}
              name="close"
              size={25}
              color={colors.DarkPrimaryText}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
