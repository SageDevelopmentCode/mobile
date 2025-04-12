import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Animated } from "react-native";
import { useNavigation } from "expo-router";
import { supabase } from "@/lib/supabase/supabase";
import * as SecureStore from "expo-secure-store";
import { getUserCharacters } from "@/lib/supabase/db/characters/user_characters";

// Constants
import colors from "@/constants/colors";
import { tabBarOptions } from "@/constants/tabBarOptions";

// Assets
import Background from "./assets/BackgroundOne.jpg";
import GabrielBackground from "./assets/GabrielBackground.jpg";
import Gabriel from "./assets/Gabriel.png";
import Deborah from "./assets/Deborah.png";
import SolaraType from "../../../../assets/images/character_types/SolaraType.png";
import UncommonChest from "../../../../assets/images/chests/UncommonChest.png";

// Components
import { StatsHeader } from "@/components/Home/StatsHeader/StatsHeader";
import { HeroSection } from "@/components/Home/Hero/HeroSection";
import { HomeContent } from "@/components/Home/Content/HomeContent";
import { CharacterMenu } from "@/components/Home/Character/Menu/CharacterMenu";
import { CharacterSwitchMenu } from "@/components/Home/Character/Switch/CharacterSwitchMenu";
import { Backdrop } from "@/components/Overlay/Backdrop";
import { formatNumber } from "@/utils/format/formatNumber";
import toggleMenu from "@/utils/animations/toggleMenu";
import { getStyles } from "./HomeScreen.styles";

// Keys for secure storage
const USER_DATA_KEY = "userData";
const USER_ID_KEY = "userId";
const USER_CHARACTERS_KEY = "userCharacters";
const CACHE_EXPIRY_KEY = "charactersExpiry";
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes in milliseconds

export default function HomeScreen() {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(800)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundFadeAnim = useRef(new Animated.Value(1)).current;

  // Add state for user data
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userCharacters, setUserCharacters] = useState<any[]>([]);
  const [activeCharacterData, setActiveCharacterData] = useState<any>(null);

  // Character transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCharacter, setTransitionCharacter] = useState<string | null>(
    null
  );

  // State
  const [characterMenuVisible, setCharacterMenuVisible] =
    useState<boolean>(false);
  const [characterSwitchMenuVisible, setCharacterSwitchMenuVisible] =
    useState<boolean>(false);
  const [typeDialogVisible, setTypeDialogVisible] = useState(false);
  const [activeMenuCharacterTab, setActiveMenuCharacterTab] =
    useState<string>("Stats");
  const [activeCharacter, setActiveCharacter] = useState<string>("Deborah");

  // Tabs for character menu
  const menuCharacterTabs: string[] = [
    "Stats",
    "Abilities",
    "Rarities",
    "Your Cards",
  ];

  // Character data
  const characters = [
    {
      name: "Gabriel",
      image: Gabriel,
      backgroundImage: GabrielBackground,
    },
    {
      name: "Deborah",
      image: Gabriel,
      backgroundImage: Background,
    },
    {
      name: "Elijah",
      image: Gabriel, // Reusing image for demo
      backgroundImage: GabrielBackground,
    },
    {
      name: "Sarah",
      image: Deborah, // Reusing image for demo
      backgroundImage: Background,
    },
  ];

  // Goals data
  const goals = [
    {
      emoji: "📖",
      title: "Devotional",
      description: "Read today's devotional",
    },
    {
      emoji: "🏋️",
      title: "Workout",
      description: "Complete today's session",
    },
  ];

  const styles = getStyles(activeCharacter);

  // Toggle functions
  const toggleCharacterSwitchMenu = () =>
    toggleMenu(
      characterSwitchMenuVisible,
      setCharacterSwitchMenuVisible,
      slideAnim
    );

  const toggleCharacterMenu = () =>
    toggleMenu(characterMenuVisible, setCharacterMenuVisible, slideAnim);

  const toggleDialog = () => {
    setTypeDialogVisible(!typeDialogVisible);
  };

  const handleTabPress = (tab: string): void => {
    setActiveMenuCharacterTab(tab);
  };

  const handleSwitchCharacter = (characterName: string) => {
    if (characterName === activeCharacter || isTransitioning) return;

    setTransitionCharacter(characterName);
    setIsTransitioning(true);

    // Step 1: Highlight selected character in menu (handled by Card component with isActive)

    // Step 2: Animate current character out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 800,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Close menu and update character
      setCharacterSwitchMenuVisible(false);
      setActiveCharacter(characterName);

      // Wait a moment for state to update
      setTimeout(() => {
        // Step 3: Animate new character in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(backgroundFadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsTransitioning(false);
          setTransitionCharacter(null);
        });
      }, 50);
    });
  };

  // Utility function to check if cache is expired
  const isCacheExpired = async () => {
    const expiryTimestamp = await SecureStore.getItemAsync(CACHE_EXPIRY_KEY);
    if (!expiryTimestamp) return true;

    const expiryTime = parseInt(expiryTimestamp);
    return Date.now() > expiryTime;
  };

  // Utility function to save characters to cache
  const saveCharactersToCache = async (characters: any[]) => {
    try {
      await SecureStore.setItemAsync(
        USER_CHARACTERS_KEY,
        JSON.stringify(characters)
      );
      await SecureStore.setItemAsync(
        CACHE_EXPIRY_KEY,
        (Date.now() + CACHE_DURATION).toString()
      );
      console.log(
        "Saved characters to cache with expiry:",
        new Date(Date.now() + CACHE_DURATION).toLocaleString()
      );
    } catch (error) {
      console.error("Error saving characters to cache:", error);
    }
  };

  // Fetch user characters from API
  const fetchUserCharactersFromAPI = async (userId: string) => {
    try {
      console.log("Fetching characters from API for user:", userId);
      const characters = await getUserCharacters(userId);
      console.log("Fetched characters count:", characters?.length || 0);

      // Save to cache for next time
      await saveCharactersToCache(characters);

      return characters;
    } catch (error) {
      console.error("Error fetching user characters from API:", error);
      return [];
    }
  };

  // Update activeCharacterData whenever activeCharacter changes
  useEffect(() => {
    // Find the character data for the active character
    if (userCharacters && userCharacters.length > 0) {
      const characterData = userCharacters.find(
        (char) => char.character?.name === activeCharacter
      );

      if (characterData) {
        console.log("Updated active character data:", characterData);
        console.log("Character image URL:", characterData.character?.image_url);
        setActiveCharacterData(characterData);
      }
    }
  }, [activeCharacter, userCharacters]);

  // Fetch user data from local storage or Supabase if not available
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First try to get data from secure storage
        const storedUserData = await SecureStore.getItemAsync(USER_DATA_KEY);
        const storedUserId = await SecureStore.getItemAsync(USER_ID_KEY);

        let currentUserId = null;

        if (storedUserData && storedUserId) {
          // If we have stored data, use it
          const userData = JSON.parse(storedUserData);
          console.log("Using locally stored user data");
          console.log("User ID from storage:", storedUserId);

          currentUserId = storedUserId;
          setUserId(storedUserId);
          setUserData(userData);
        } else {
          // If not, fetch from Supabase
          console.log("No stored user data, fetching from Supabase");
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            console.log("Fetched user from Supabase");
            const userId = user.id;
            console.log("User ID:", userId);

            // Store the data for future use
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
            await SecureStore.setItemAsync(USER_ID_KEY, userId);

            currentUserId = userId;
            setUserId(userId);
            setUserData(user);
          }
        }

        // Fetch user characters if we have a userId
        if (currentUserId) {
          // Check if we have cached characters that aren't expired
          const cachedCharactersJSON = await SecureStore.getItemAsync(
            USER_CHARACTERS_KEY
          );
          const cacheExpired = await isCacheExpired();

          let characters;

          if (cachedCharactersJSON && !cacheExpired) {
            // Use cached characters if available and not expired
            characters = JSON.parse(cachedCharactersJSON);
            console.log("Using cached characters, count:", characters.length);
          } else {
            // Otherwise fetch from API
            characters = await fetchUserCharactersFromAPI(currentUserId);
          }

          setUserCharacters(characters || []);

          // If there's at least one character, set the active character to the first one's name
          if (
            characters &&
            characters.length > 0 &&
            characters[0].character?.name
          ) {
            // Set the active character to the first character's name
            const firstCharacter = characters[0];
            console.log(
              "Setting active character to:",
              firstCharacter.character.name
            );
            setActiveCharacter(firstCharacter.character.name);

            // Also set the active character data
            setActiveCharacterData(firstCharacter);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Set up navigation options
  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const parentNavigation = navigation.getParent();

    if (characterMenuVisible || characterSwitchMenuVisible) {
      // Hide the tab bar when a menu is open
      parentNavigation?.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      // Show the tab bar when menus are closed
      parentNavigation?.setOptions({
        ...tabBarOptions,
        tabBarStyle: {
          ...tabBarOptions.tabBarStyle,
          backgroundColor:
            activeCharacter === "Deborah"
              ? "rgba(30, 31, 51, 0.98)"
              : colors.GabrielGoalBackground,
        },
        tabBarActiveTintColor:
          activeCharacter === "Deborah"
            ? colors.PrimaryPurpleBackground
            : colors.PrimaryWhite,
        tabBarInactiveTintColor:
          activeCharacter === "Deborah" ? "#6c757d" : "#C1C1C1",
      });
    }

    return () => {
      // Ensure the tab bar reappears when component unmounts
      parentNavigation?.setOptions({
        ...tabBarOptions,
      });
    };
  }, [
    navigation,
    characterMenuVisible,
    characterSwitchMenuVisible,
    activeCharacter,
  ]);

  // Determine the current character's assets and prepare image sources
  const currentCharacter = characters.find(
    (character) => character.name === activeCharacter
  );
  const localCharacterImage = currentCharacter?.image || Deborah;
  const backgroundImage = currentCharacter?.backgroundImage || Background;

  // Prepare the character image source
  const characterImageSource = React.useMemo(() => {
    // Check if we have a valid image URL from the database
    if (
      activeCharacterData?.character?.image_url &&
      activeCharacterData.character.image_url.trim() !== ""
    ) {
      // Make sure the URL has a proper protocol
      let imageUrl = activeCharacterData.character.image_url;
      if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        imageUrl = "https://" + imageUrl.replace(/^\/\//, "");
      }

      console.log("Using image URL:", imageUrl);
      return { uri: imageUrl };
    }

    // Return null to trigger the loading indicator
    console.log("No image available, will show loading indicator");
    return null;
  }, [activeCharacterData, localCharacterImage]);

  return (
    <View style={styles.container}>
      {/* StatsHeader positioned absolutely at the top */}
      <StatsHeader
        userGems={formatNumber(1000)}
        userShards={formatNumber(1240)}
        userStars={formatNumber(1400)}
      />

      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {/* Hero Section with Character */}
        <HeroSection
          characterName={
            activeCharacterData?.character?.name || activeCharacter
          }
          characterImage={characterImageSource}
          backgroundImage={backgroundImage}
          onCharacterPress={toggleCharacterMenu}
          onSwitchPress={toggleCharacterSwitchMenu}
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
          backgroundFadeAnim={backgroundFadeAnim}
          isTransitioning={isTransitioning}
        />

        {/* Main Content Section */}
        <HomeContent
          activeCharacter={activeCharacter}
          goals={goals}
          chestImage={UncommonChest}
        />
      </ScrollView>

      {/* Backdrop Overlays */}
      {characterMenuVisible && <Backdrop onPress={toggleCharacterMenu} />}
      {characterSwitchMenuVisible && (
        <Backdrop onPress={toggleCharacterSwitchMenu} />
      )}

      {/* Character Menu */}
      {characterMenuVisible && (
        <CharacterMenu
          activeCharacter={activeCharacter}
          characterImage={localCharacterImage}
          backgroundImage={backgroundImage}
          typeImage={SolaraType}
          activeMenuCharacterTab={activeMenuCharacterTab}
          menuCharacterTabs={menuCharacterTabs}
          handleTabPress={handleTabPress}
          toggleDialog={toggleDialog}
          typeDialogVisible={typeDialogVisible}
          slideAnim={slideAnim}
        />
      )}

      {/* Character Switch Menu */}
      {characterSwitchMenuVisible && (
        <CharacterSwitchMenu
          slideAnim={slideAnim}
          characters={characters}
          onSwitchCharacter={handleSwitchCharacter}
          activeCharacter={transitionCharacter || activeCharacter}
          typeImage={SolaraType}
        />
      )}
    </View>
  );
}
