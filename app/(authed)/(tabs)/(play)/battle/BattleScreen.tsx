import React, { useEffect, useState } from "react";
import {
  Button,
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
import SolaraType from "../../../../../assets/images/character_types/SolaraType.png";
import {
  ButtonText,
  Heading,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import { CharacterAbilities } from "@/components/Home/Character/Details/CharacterAbilities/CharacterAbilities";

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
          <View>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                  <Image
                    source={SolaraType} // TODO: Dynamic
                    style={styles.typeImage}
                    resizeMode="contain"
                  />
                  <ButtonText color={colors.PrimaryWhite}>Lv 12</ButtonText>
                </View>

                <ButtonText color={colors.PrimaryWhite}>400/400</ButtonText>
              </View>
              <View
                style={[
                  styles.progressContainer,
                  { height: 11, backgroundColor: colors.PrimaryWhite },
                ]}
              >
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${99}%`,
                      backgroundColor: colors.HealthBarGreen,
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.characterImage}>
              <Image
                source={activeCharacter === "Deborah" ? Deborah : Gabriel} // TODO: Dynamic
                style={styles.character}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.characterName}>
              <ButtonText color={colors.PrimaryWhite}>Deborah</ButtonText>
            </View>
          </View>

          <View>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                  <Image
                    source={SolaraType} // TODO: Dynamic
                    style={styles.typeImage}
                    resizeMode="contain"
                  />
                  <ButtonText color={colors.PrimaryWhite}>Lv 12</ButtonText>
                </View>

                <ButtonText color={colors.PrimaryWhite}>400/400</ButtonText>
              </View>
              <View
                style={[
                  styles.progressContainer,
                  { height: 11, backgroundColor: colors.PrimaryWhite },
                ]}
              >
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${99}%`,
                      backgroundColor: colors.HealthBarGreen,
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.characterImage}>
              <Image
                source={Gabriel} // TODO: Dynamic
                style={styles.character}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.characterName}>
              <ButtonText color={colors.PrimaryWhite}>Gabriel</ButtonText>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={[{ paddingHorizontal: "5%", paddingTop: 10 }]}>
        <View style={styles.textRow}>
          <Heading color={colors.PrimaryWhite}>
            What will{" "}
            <Heading color={colors.PrimaryPurpleBackground}>Deborah</Heading>{" "}
            do?
          </Heading>
          <View style={styles.timerBox}>
            <ButtonText color={colors.BattleTimer}>2:24</ButtonText>
          </View>
        </View>
        <CharacterAbilities />
        <View style={styles.textRow}>
          <Heading color={colors.PrimaryWhite}>Switch</Heading>
        </View>
      </View>
    </ScrollView>
  );
}
