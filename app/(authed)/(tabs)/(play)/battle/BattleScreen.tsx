import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import colors from "@/constants/colors";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./BattleScreen.styles";
import ZoneOneBattleBackground from "../assets/ZoneOneBattle.jpg";
import Deborah from "../../../../../assets/images/characters/Deborah.png";
import Gabriel from "../../../../../assets/images/characters/Gabriel.png";

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
        <View style={styles.charactersContainer}>
          <TouchableOpacity style={styles.characterImage}>
            <Image
              source={activeCharacter === "Deborah" ? Deborah : Gabriel} // TODO: Dynamic
              style={styles.character}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.characterImage}>
            <Image
              source={Gabriel} // TODO: Dynamic
              style={styles.character}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
