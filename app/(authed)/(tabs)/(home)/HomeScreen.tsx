import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Text,
} from "react-native";
import { useNavigation } from "expo-router";

import colors from "@/constants/colors";

import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import Deborah from "./assets/Deborah.png";
import SolaraType from "../../../../assets/images/character_types/SolaraType.png";
import UncommonChest from "../../../../assets/images/chests/UncommonChest.png";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import { styles } from "./HomeScreen.styles";
import HeadingBar from "@/components/Heading/HeadingBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { StatsHeader } from "@/components/Home/StatsHeader/StatsHeader";
import { formatNumber } from "@/utils/format/formatNumber";
import { HeroBar } from "@/components/Home/Hero/HeroBar/HeroBar";
import { Chest } from "@/components/Home/Content/Chest/Chest";
import toggleMenu from "@/utils/animations/toggleMenu";
import {
  Heading,
  Paragraph,
  StatText,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Ionicons } from "@expo/vector-icons";
import { CharacterStats } from "@/components/Home/Character/Details/CharacterStats/CharacterStats";
import { CharacterAbilities } from "@/components/Home/Character/Details/CharacterAbilities/CharacterAbilities";
import { CharacterRarities } from "@/components/Home/Character/Details/CharacterRarities/CharacterRarities";
import { CharacterCards } from "@/components/Home/Character/Details/CharacterCards/CharacterCards";

export default function HomeScreen() {
  const menuCharacterTabs: string[] = [
    "Stats",
    "Abilities",
    "Rarities",
    "Cards",
  ];

  let CharacterDetailsComponent: JSX.Element | null;

  const navigation = useNavigation();
  const [characterMenuVisible, setCharacterMenuVisible] = useState(false);
  const [typeDialogVisible, setTypeDialogVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(800)).current;
  const [activeMenuCharacterTab, setActiveMenuCharacterTab] = useState<string>(
    menuCharacterTabs[0]
  );

  switch (activeMenuCharacterTab) {
    case "Stats":
      CharacterDetailsComponent = <CharacterStats />;
      break;
    case "Abilities":
      CharacterDetailsComponent = <CharacterAbilities />;
      break;
    case "Rarities":
      CharacterDetailsComponent = <CharacterRarities />;
      break;
    case "Cards":
      CharacterDetailsComponent = <CharacterCards />;
      break;
    default:
      CharacterDetailsComponent = null;
  }

  const toggleCharacterMenu = () =>
    toggleMenu(characterMenuVisible, setCharacterMenuVisible, slideAnim);

  const toggleDialog = () => {
    setTypeDialogVisible(!typeDialogVisible);
  };

  let CharacterMenuComponent: JSX.Element | null;

  const handleTabPress = (tab: string): void => {
    setActiveMenuCharacterTab(tab);
  };

  const goals = [
    {
      emoji: "📖",
      title: "Devotional",
      description: "Read today's devotional",
    },
    { emoji: "🏋️", title: "Workout", description: "Complete today's session" },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const parentNavigation = navigation.getParent();

    if (characterMenuVisible) {
      // Hide the tab bar when the character menu is open
      parentNavigation?.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      // Show the tab bar when the character menu is closed
      parentNavigation?.setOptions({
        ...tabBarOptions, // Restore default tabBarOptions
      });
    }

    return () => {
      // Ensure the tab bar reappears when component unmounts
      parentNavigation?.setOptions({
        ...tabBarOptions,
      });
    };
  }, [navigation, characterMenuVisible]);

  return (
    <View style={styles.container}>
      <StatsHeader
        userGems={formatNumber(1000)}
        userShards={formatNumber(1240)}
        userStars={formatNumber(1400)}
      />
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <ImageBackground
          source={Background}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            <HeroBar />

            {/* Character Image */}
            <TouchableOpacity
              onPress={toggleCharacterMenu}
              style={styles.characterImage}
            >
              <Image
                source={Deborah}
                style={styles.character}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.chestRow}>
            {/* Daily Chest */}
            <Chest
              onPress={() => {
                console.log("Daily");
              }}
              type="Daily"
              timeRemaining="04:06"
              key="Daily"
            />
            <Chest
              onPress={() => {
                console.log("Weekly");
              }}
              type="Weekly"
              timeRemaining="05:06"
              key="Weekly"
            />
          </View>

          {/* Progress Bar */}
          <ProgressBar
            height={15}
            progress={40}
            backgroundColor={colors.PrimaryWhite}
            progressColor={colors.PrimaryPurpleBackground}
            imageSrc={UncommonChest}
            leftText="0 energy today"
            rightText="Goal: 20"
          />

          {/* Heading for Goals */}
          <HeadingBar headingText="Goals for today" />
          <GoalItem
            title="Test Test"
            emoji="📖"
            description="Read today's devotional"
            onPress={() => console.log("Icon Button Pressed")}
            onIconPress={() => console.log("Icon Button Pressed")}
            newGoal={false}
          />
          <GoalItem
            title="Test Test"
            emoji="📖"
            description="Read today's devotional"
            onPress={() => console.log("Icon Button Pressed")}
            onIconPress={() => console.log("Icon Button Pressed")}
            newGoal={false}
          />
          <GoalItem
            title="Test Test"
            emoji="📖"
            description="Read today's devotional"
            onPress={() => console.log("Icon Button Pressed")}
            onIconPress={() => console.log("Icon Button Pressed")}
            newGoal={false}
          />
          <GoalItem
            title="Test Test"
            emoji="📖"
            description="Read today's devotional"
            onPress={() => console.log("Icon Button Pressed")}
            onIconPress={() => console.log("Icon Button Pressed")}
            newGoal={false}
          />
          <GoalItem
            title="Test Test"
            emoji="📖"
            description="Read today's devotional"
            onPress={() => console.log("Icon Button Pressed")}
            onIconPress={() => console.log("Icon Button Pressed")}
            newGoal={true}
          />
        </View>
      </ScrollView>
      {characterMenuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleCharacterMenu}
        />
      )}

      {characterMenuVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView
            scrollEnabled={true}
            horizontal={false} // Prevent horizontal scrolling
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuScrollViewContainer}
            style={{ width: "100%" }}
          >
            <View style={styles.menuImageContainer}>
              <ImageBackground
                source={Background}
                style={styles.menuImageBackground}
                resizeMode="cover"
              >
                <Image source={Deborah} style={styles.menuCharacter} />
              </ImageBackground>
              <View style={styles.menuContentContainer}>
                <Title color={colors.PrimaryWhite}>Nickname</Title>
                <Paragraph color={colors.GrayText}>Deborah</Paragraph>
                <TouchableOpacity onPress={toggleDialog}>
                  <View style={styles.characterTypeContainer}>
                    <View style={styles.typeImageContainer}>
                      <Image source={SolaraType} style={styles.typeImage} />
                    </View>
                    <View style={styles.typeTextContainer}>
                      <Paragraph color={colors.PrimaryWhite}>Solara</Paragraph>
                    </View>
                  </View>
                </TouchableOpacity>
                <ProgressBar
                  height={15}
                  progress={40}
                  backgroundColor={colors.PrimaryWhite}
                  progressColor={colors.PrimaryPurpleBackground}
                  imageSrc={UncommonChest}
                  leftText="Level 19"
                  rightText="Level 20"
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabContainer}
                >
                  {menuCharacterTabs.map((tab, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.tab,
                        activeMenuCharacterTab === tab && styles.activeTab,
                      ]}
                      onPress={() => handleTabPress(tab)}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          {
                            color:
                              activeMenuCharacterTab === tab
                                ? colors.DarkPrimaryText
                                : colors.PrimaryWhite,
                          },
                        ]}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {CharacterDetailsComponent}
                <HeadingBar headingText="Appears in" />
                <HeadingBar headingText="Description" />
              </View>
            </View>
            {typeDialogVisible && (
              <View style={styles.dialogOverlay}>
                <View style={styles.dialogBox}>
                  <Heading
                    style={{ marginBottom: 5 }}
                    color={colors.SolaraGreen}
                  >
                    Solara
                  </Heading>
                  <StatText color={colors.PrimaryWhite}>
                    Solara represents the essence of kindness, one of the
                    powerful fruits of the Spirit. Characters of this type are
                    natural peacemakers, capable of calming tensions and
                    inspiring cooperation among allies.
                  </StatText>
                </View>
                <View style={styles.dialogImageContainer}>
                  <TouchableOpacity
                    style={styles.dialogClose}
                    onPress={toggleDialog}
                  >
                    <Ionicons
                      name="close"
                      size={25}
                      color={colors.PrimaryWhite}
                    />
                  </TouchableOpacity>
                  <Image source={SolaraType} style={styles.dialogImage} />
                </View>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
