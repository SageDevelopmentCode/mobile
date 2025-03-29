import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./BattleHomeScreen.styles";
import ZoneOneBattleBackground from "./assets/ZoneOneHome.jpg"; // Updated import path
import Deborah from "../../../../assets/images/characters/Deborah.png";
import Gabriel from "../../../../assets/images/characters/Gabriel.png";
import RareChest from "../../../../assets/images/chests/RareChest.png";
import colors from "@/constants/colors";
import HeadingBar from "@/components/Heading/HeadingBar";
import { tabBarOptions } from "@/constants/tabBarOptions";
import {
  ButtonText,
  Heading,
  SubHeading,
} from "@/components/Text/TextComponents";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import { FontAwesome6 } from "@/utils/icons";
import { RewardCard } from "@/components/Battle/BattleHome/RewardCard/RewardCard";
import { HeroBar } from "@/components/Battle/BattleHome/Hero/HeroBar/HeroBar";

export default function BattleHomeScreen() {
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
      <View>
        <HeadingBar headingText="Rewards" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          <RewardCard rewardSrc={RareChest} quantity={1} />
          <RewardCard rewardSrc={RareChest} quantity={1} />
          <RewardCard rewardSrc={RareChest} quantity={1} />
        </ScrollView>
        <View
          style={[
            {
              width: "100%",
              paddingHorizontal: "5%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            },
          ]}
        >
          <Heading color={colors.PrimaryWhite}>Trial 1 of 5</Heading>
          <TouchableOpacity
            style={styles.startBattleButton}
            onPress={() =>
              router.push("/(authed)/(tabs)/(play)/battle/BattleScreen")
            }
          >
            <Heading color={colors.PrimaryWhite}>Start Battle</Heading>
            <View style={[{ flexDirection: "row" }]}>
              <Heading color={colors.PrimaryWhite}>2</Heading>
              <FontAwesome6
                style={[{ marginLeft: 10 }]}
                name="bolt"
                size={20}
                color={colors.EnergyColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
