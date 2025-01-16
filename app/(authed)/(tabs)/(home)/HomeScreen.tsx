import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Touchable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

import { FontAwesome5, FontAwesome6, Ionicons, Octicons } from "@/utils/icons";
import colors from "@/constants/colors";

import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import Deborah from "./assets/Deborah.png";
import DeborahShadow from "./assets/DeborahShadow.png";
import Goal from "./assets/Goal.png";
import ShardGem from "./assets/ShardGem.png";
import Star from "./assets/Star.png";
import XPGem from "./assets/XPGem.png";
import CommonChest from "../../../../assets/images/chests/CommonChest.png";
import RareChest from "../../../../assets/images/chests/RareChest.png";
import UncommonChest from "../../../../assets/images/chests/UncommonChest.png";
import {
  Heading,
  Paragraph,
  StatText,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import { styles } from "./HomeScreen.styles";
import HeadingBar from "@/components/Heading/HeadingBar";

export default function HomeScreen() {
  const navigation = useNavigation();

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.statsBar}>
        <TouchableOpacity onPress={() => console.log("Menu icon pressed")}>
          <Ionicons name="menu" size={30} color={colors.PrimaryWhite} />
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Image
              source={XPGem}
              style={styles.statImage}
              resizeMode="contain"
            />
            <StatText>1.3k</StatText>
          </View>
          <View style={styles.statBox}>
            <Image
              source={ShardGem}
              style={styles.statImage}
              resizeMode="contain"
            />
            <StatText>1.3k</StatText>
          </View>
          <View style={styles.statBox}>
            <Image
              source={Star}
              style={styles.statImage}
              resizeMode="contain"
            />
            <StatText>1.3k</StatText>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log("Goal icon pressed")}>
          <Image source={Goal} style={styles.goalImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {/* Image Container with Background Image */}
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollViewContainer}
        // showsVerticalScrollIndicator={true} // Add this to make scrollbar visible
      >
        {/* <View style={styles.imageContainer}> */}
        <ImageBackground
          source={Background}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            {/* Stats Bar */}

            {/* Hero Bar with Title and Action Buttons */}
            <View style={styles.heroBar}>
              <Title color={colors.PrimaryWhite}>Deborah</Title>
              <View style={styles.actions}>
                <SquareActionButton
                  onPress={() => console.log("Icon Button Pressed")}
                  title="✅"
                />
                <SquareActionButton
                  onPress={() => console.log("Icon Button Pressed")}
                  title="🌱"
                />
                <SquareActionButton
                  onPress={() => console.log("Icon Button Pressed")}
                  icon={<Octicons name="arrow-switch" size={20} />}
                />
              </View>
            </View>

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
        {/* </View> */}

        <View
          style={styles.contentContainer}
          // contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.chestRow}>
            {/* Daily Chest */}
            <TouchableOpacity
              onPress={() => {
                console.log("Daily Chest Opened");
              }}
              style={styles.chestContainer}
            >
              <View style={styles.chest}>
                <Image
                  source={CommonChest}
                  style={styles.chestImage}
                  resizeMode="contain"
                />
              </View>
              <View>
                <SubHeading color={colors.PrimaryWhite}>Daily Chest</SubHeading>
                <StatText color={colors.GrayText}>04:06</StatText>
              </View>
            </TouchableOpacity>

            {/* Weekly Chest */}
            <TouchableOpacity
              onPress={() => {
                console.log("Weekly Chest opened");
              }}
              style={styles.chestContainer}
            >
              <View style={styles.weeklyChest}>
                <Image
                  source={RareChest}
                  style={styles.chestImage}
                  resizeMode="contain"
                />
              </View>
              <View>
                <SubHeading color={colors.PrimaryWhite}>
                  Weekly Chest
                </SubHeading>
                <StatText color={colors.GrayText}>05:10:04</StatText>
              </View>
            </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => console.log("Click Goal")}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>📖</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>Devotional</Heading>
                <StatText color="#AAAAAA">Read today's devotional</StatText>
              </View>
            </View>
            <View style={styles.goalRightContainer}>
              <SquareActionButton
                onPress={() => console.log("Icon Button Pressed")}
                icon={
                  <FontAwesome6
                    color={colors.PrimaryBlue}
                    name="play"
                    size={20}
                  />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Click Goal")}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>📖</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>Devotional</Heading>
                <StatText color="#AAAAAA">Read today's devotional</StatText>
              </View>
            </View>
            <View style={styles.goalRightContainer}>
              <SquareActionButton
                onPress={() => console.log("Icon Button Pressed")}
                icon={
                  <FontAwesome6
                    color={colors.PrimaryBlue}
                    name="play"
                    size={20}
                  />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Click Goal")}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>📖</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>Devotional</Heading>
                <StatText color="#AAAAAA">Read today's devotional</StatText>
              </View>
            </View>
            <View style={styles.goalRightContainer}>
              <SquareActionButton
                onPress={() => console.log("Icon Button Pressed")}
                icon={
                  <FontAwesome6
                    color={colors.PrimaryBlue}
                    name="play"
                    size={20}
                  />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Click Goal")}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>📖</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>Devotional</Heading>
                <StatText color="#AAAAAA">Read today's devotional</StatText>
              </View>
            </View>
            <View style={styles.goalRightContainer}>
              <SquareActionButton
                onPress={() => console.log("Icon Button Pressed")}
                icon={
                  <FontAwesome6
                    color={colors.PrimaryBlue}
                    name="play"
                    size={20}
                  />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Click Goal")}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>📖</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>Devotional</Heading>
                <StatText color="#AAAAAA">Read today's devotional</StatText>
              </View>
            </View>
            <View style={styles.goalRightContainer}>
              <SquareActionButton
                onPress={() => console.log("Icon Button Pressed")}
                icon={
                  <FontAwesome6
                    color={colors.PrimaryBlue}
                    name="play"
                    size={20}
                  />
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
