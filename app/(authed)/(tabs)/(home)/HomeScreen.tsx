import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";

import colors from "@/constants/colors";

import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import Deborah from "./assets/Deborah.png";
import UncommonChest from "../../../../assets/images/chests/UncommonChest.png";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import { styles } from "./HomeScreen.styles";
import HeadingBar from "@/components/Heading/HeadingBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { StatsHeader } from "@/components/Home/StatsHeader/StatsHeader";
import { formatNumber } from "@/utils/format/formatNumber";
import { HeroBar } from "@/components/Home/Hero/HeroBar/HeroBar";
import { Chest } from "@/components/Home/Content/Chest/Chest";

export default function HomeScreen() {
  const navigation = useNavigation();
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
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatsHeader
        userGems={formatNumber(1300)}
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
              onPress={() => console.log("Character Image Pressed")}
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
            newGoal={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}
