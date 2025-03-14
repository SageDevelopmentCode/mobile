import React, { useEffect, useState } from "react";
import { View, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./BattleScreen.styles";
import ZoneOneBattleBackground from "./assets/ZoneOneHome.jpg"; // Updated import path
import Deborah from "../../../../assets/images/characters/Deborah.png";
import Gabriel from "../../../../assets/images/characters/Gabriel.png";
import { Heading, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import HeadingBar from "@/components/Heading/HeadingBar";
import { tabBarOptions } from "@/constants/tabBarOptions";

export default function BattleScreen() {
  const [activeCharacter, setActiveCharacter] = useState<string>("Deborah");

  const navigation = useNavigation();

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const parentNavigation = navigation.getParent();

    parentNavigation?.setOptions({
      ...tabBarOptions, // Restore default tabBarOptions
      tabBarStyle: {
        ...tabBarOptions.tabBarStyle,
        backgroundColor: colors.GabrielGoalBackground,
      },
      tabBarActiveTintColor: colors.PrimaryWhite,
      tabBarInactiveTintColor: "#C1C1C1",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ZoneOneBattleBackground}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={[{ width: "100%", paddingHorizontal: 30 }]}>
          <View style={[styles.headingContainer]}>
            <View style={styles.line} />
            <Heading
              style={styles.headingText}
              color={colors.ZoneOneBattleText}
            >
              Zone 1
            </Heading>
            <View style={styles.line} />
          </View>
          <View style={styles.heroBar}>
            <Title color={colors.PrimaryWhite}>Garden of Eden</Title>
          </View>
        </View>

        <TouchableOpacity style={styles.characterImage}>
          <Image
            source={activeCharacter === "Deborah" ? Deborah : Gabriel} // TODO: Dynamic
            style={styles.character}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageBackground>
      <HeadingBar headingText="Rewards" />
    </View>
  );
}
