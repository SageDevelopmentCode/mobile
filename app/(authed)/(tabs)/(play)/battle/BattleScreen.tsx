import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useNavigation, useRouter } from "expo-router";
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
} from "@/components/Text/TextComponents";
import { CharacterAbilities } from "@/components/Home/Character/Details/CharacterAbilities/CharacterAbilities";
import { CharacterSwitchCard } from "@/components/Battle/BattleScreen/CharacterSwitchCard/CharacterSwitchCard";
import { MaterialIcons } from "@/utils/icons";
import { QuitModal } from "@/components/Battle/BattleScreen/QuitModal/QuitModal";

export default function BattleScreen() {
  const [activeCharacter, setActiveCharacter] = useState<string>("Deborah");
  const [quitModalVisible, setQuitModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
      });
  }, [navigation]);

  const handleQuit = () => {
    // Show confirmation modal
    setQuitModalVisible(true);
  };

  const confirmQuit = () => {
    setQuitModalVisible(false);
    router.push("/(authed)/(tabs)/(play)/BattleHomeScreen");
  };

  const cancelQuit = () => {
    setQuitModalVisible(false);
  };

  return (
    <>
      <QuitModal
        visible={quitModalVisible}
        onClose={cancelQuit}
        onConfirm={confirmQuit}
      />
      <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
        <ImageBackground
          source={ZoneOneBattleBackground}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* Quit Button */}
          <TouchableOpacity style={styles.quitButton} onPress={handleQuit}>
            <MaterialIcons
              name="exit-to-app"
              size={28}
              color={colors.PrimaryWhite}
            />
            <ButtonText color={colors.PrimaryWhite}>Quit</ButtonText>
          </TouchableOpacity>
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
                  <View
                    style={[{ flexDirection: "row", alignItems: "center" }]}
                  >
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
                  <View
                    style={[{ flexDirection: "row", alignItems: "center" }]}
                  >
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <CharacterSwitchCard
              characterImage={Gabriel}
              characterName="Gabriel"
              health={99}
            />
            <CharacterSwitchCard
              characterImage={Gabriel}
              characterName="Gabriel"
              health={99}
            />
            <CharacterSwitchCard
              characterImage={Gabriel}
              characterName="Gabriel"
              health={99}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}
