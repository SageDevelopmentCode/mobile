import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./BattleScreen.styles";
import ZoneOneBattleBackground from "./assets/ZoneOneHome.jpg"; // Updated import path
import Deborah from "../../../../assets/images/characters/Deborah.png";
import Gabriel from "../../../../assets/images/characters/Gabriel.png";
import { Heading, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import HeadingBar from "@/components/Heading/HeadingBar";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { HeroBar } from "@/components/Battle/Hero/HeroBar/HeroBar";

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
    <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
      <ImageBackground
        source={ZoneOneBattleBackground}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <HeroBar />
        <TouchableOpacity style={styles.characterImage}>
          <Image
            source={activeCharacter === "Deborah" ? Deborah : Gabriel} // TODO: Dynamic
            style={styles.character}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageBackground>
      <HeadingBar headingText="Rewards" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        <View style={styles.card}></View>
      </ScrollView>
    </ScrollView>
  );
}
