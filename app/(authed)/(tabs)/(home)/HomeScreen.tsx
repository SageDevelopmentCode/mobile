import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Animated, ActivityIndicator } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useCharacterContext } from "@/lib/context/CharacterContext";
import { getUserGoals } from "@/lib/supabase/db/user_goals";

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
import { Heading } from "@/components/Text/TextComponents";

// Keys for secure storage
const USER_DATA_KEY = "userData";
const USER_ID_KEY = "userId";

export default function HomeScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const refreshParam = params.refresh;
  const slideAnim = useRef(new Animated.Value(800)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundFadeAnim = useRef(new Animated.Value(1)).current;

  // Get character context
  const {
    activeCharacterData,
    setActiveCharacterData,
    userCharacters,
    activeCharacter,
    setActiveCharacter,
    isLoading,
    userData,
  } = useCharacterContext();

  console.log("User data from context:", userData);

  // Character transition state
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [transitionCharacter, setTransitionCharacter] = React.useState<
    string | null
  >(null);

  // State
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [characterMenuVisible, setCharacterMenuVisible] =
    React.useState<boolean>(false);
  const [characterSwitchMenuVisible, setCharacterSwitchMenuVisible] =
    React.useState<boolean>(false);
  const [typeDialogVisible, setTypeDialogVisible] = React.useState(false);
  const [activeMenuCharacterTab, setActiveMenuCharacterTab] =
    React.useState<string>("Stats");

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

  // Fetch user goals when component mounts or refresh param changes
  useEffect(() => {
    const fetchUserGoals = async () => {
      if (!userData || !userData.id) {
        console.log("User data not available yet, can't fetch goals");
        setGoalsLoading(false);
        return;
      }

      setGoalsLoading(true);
      try {
        const goals = await getUserGoals(userData.id);
        console.log("User goals:", goals);
        setUserGoals(goals);
      } catch (error) {
        console.error("Failed to fetch user goals:", error);
      } finally {
        setGoalsLoading(false);
      }
    };

    fetchUserGoals();
  }, [userData, refreshParam]);

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
  }, [activeCharacter, userCharacters, setActiveCharacterData]);

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

  // Display loading state
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.PrimaryPurpleBackground}
        />
        <Heading color={colors.PrimaryWhite} style={{ marginTop: 20 }}>
          Loading character data...
        </Heading>
      </View>
    );
  }

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
          goals={userGoals}
          chestImage={UncommonChest}
          userData={userData}
          isLoading={goalsLoading}
          setGoals={setUserGoals}
          setGoalsLoading={setGoalsLoading}
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
          characterImage={characterImageSource}
          backgroundImage={backgroundImage}
          typeImage={SolaraType}
          activeMenuCharacterTab={activeMenuCharacterTab}
          menuCharacterTabs={menuCharacterTabs}
          handleTabPress={handleTabPress}
          toggleDialog={toggleDialog}
          typeDialogVisible={typeDialogVisible}
          slideAnim={slideAnim}
          activeCharacterData={activeCharacterData}
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
