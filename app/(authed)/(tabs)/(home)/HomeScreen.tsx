import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Animated } from "react-native";
import { useNavigation } from "expo-router";

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

export default function HomeScreen() {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(800)).current;

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
      image: Deborah,
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
    setActiveCharacter(characterName);
    setCharacterSwitchMenuVisible(false);
  };

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

  // Determine the current character's assets
  const currentCharacter = characters.find(
    (character) => character.name === activeCharacter
  );
  const characterImage = currentCharacter?.image || Deborah;
  const backgroundImage = currentCharacter?.backgroundImage || Background;

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
          characterName={activeCharacter}
          characterImage={characterImage}
          backgroundImage={backgroundImage}
          onCharacterPress={toggleCharacterMenu}
          onSwitchPress={toggleCharacterSwitchMenu}
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
          characterImage={characterImage}
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
          activeCharacter={activeCharacter}
        />
      )}
    </View>
  );
}
