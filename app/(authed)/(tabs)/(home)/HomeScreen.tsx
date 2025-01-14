import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

import { Ionicons, Octicons } from "@/utils/icons";
import colors from "@/constants/colors";

import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import Deborah from "./assets/Deborah.png";
import Goal from "./assets/Goal.png";
import ShardGem from "./assets/ShardGem.png";
import Star from "./assets/Star.png";
import XPGem from "./assets/XPGem.png";
import { Heading, StatText, Title } from "@/components/Text/TextComponents";
import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";

import { styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const navigation = useNavigation();

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            <View style={styles.statsBar}>
              <TouchableOpacity
                onPress={() => console.log("Menu icon pressed")}
              >
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
              <TouchableOpacity
                onPress={() => console.log("Goal icon pressed")}
              >
                <Image
                  source={Goal}
                  style={styles.goalImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
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
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.chestRow}>
          <View style={styles.chestContainer}>
            <View style={styles.chest}></View>
          </View>
        </View>
        <Heading color={colors.PrimaryWhite}>Hello World</Heading>
      </View>
    </View>
  );
}
