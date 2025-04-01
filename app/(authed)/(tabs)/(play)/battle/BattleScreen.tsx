import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useNavigation } from "expo-router";
import colors from "@/constants/colors";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./BattleScreen.styles";
import ZoneOneBattleBackground from "../assets/ZoneOneBattle.jpg";
import OldTestament from "../assets/OldTestament.jpg";
import Deborah from "../../../../../assets/images/characters/Deborah.png";
import Gabriel from "../../../../../assets/images/characters/Gabriel.png";
import SolaraType from "../../../../../assets/images/character_types/SolaraType.png";
import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { CharacterAbilities } from "@/components/Home/Character/Details/CharacterAbilities/CharacterAbilities";
import { CharacterSwitchCard } from "@/components/Battle/BattleScreen/CharacterSwitchCard/CharacterSwitchCard";
import { MaterialIcons } from "@/utils/icons";
import { QuitModal } from "@/components/Battle/BattleScreen/QuitModal/QuitModal";
import { Character } from "@/components/Battle/BattleScreen/Character/Character";
import { CharacterAbility } from "@/components/Home/Character/Details/CharacterAbilities/Ability/CharacterAbility";
import JudgeWisdom from "../../../../../components/Home/Character/Details/CharacterAbilities/Ability/assets/JudgeWisdom.png";
import JudgeWisdomBg from "../../../../../components/Home/Character/Details/CharacterAbilities/Ability/assets/JudgeWisdomBg.jpg";
import toggleMenu from "@/utils/animations/toggleMenu";
import Overlay from "@/components/Overlay/Overlay";
import { CategoryCard } from "@/components/Battle/BattleScreen/Questions/CategoryCard/CategoryCard";

export default function BattleScreen() {
  const [quitModalVisible, setQuitModalVisible] = useState<boolean>(false);
  const [questionMenuVisible, setQuestionMenuVisible] =
    useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(800)).current;

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

  const toggleQuestionMenu = () =>
    toggleMenu(questionMenuVisible, setQuestionMenuVisible, slideAnim);

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
            <Character
              characterName="Deborah"
              level={12}
              health={99}
              typeImage={SolaraType}
              characterImage={Deborah}
              onPress={() => {}}
              maxHealth={100}
            />

            <Character
              characterName="Gabriel"
              level={12}
              health={105}
              typeImage={SolaraType}
              characterImage={Gabriel}
              onPress={() => {}}
              maxHealth={400}
            />
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
          {/* <CharacterAbilities /> */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <CharacterAbility
              icon={JudgeWisdom}
              name="Judge's Wisdom"
              defense={15}
              accuracy={15}
              cardBackground={JudgeWisdomBg}
              onPress={toggleQuestionMenu}
            />
            <CharacterAbility
              icon={JudgeWisdom}
              name="Judge's Wisdom"
              defense={15}
              accuracy={15}
              cardBackground={JudgeWisdomBg}
            />
            <CharacterAbility
              icon={JudgeWisdom}
              name="Judge's Wisdom"
              defense={15}
              accuracy={15}
              cardBackground={JudgeWisdomBg}
            />
            <CharacterAbility
              icon={JudgeWisdom}
              name="Judge's Wisdom"
              defense={15}
              accuracy={15}
              cardBackground={JudgeWisdomBg}
            />
          </ScrollView>
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

      {questionMenuVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.textRow}>
            <Heading color={colors.PrimaryWhite}>Select a Category</Heading>
            <View style={styles.timerBox}>
              <ButtonText color={colors.BattleTimer}>2:24</ButtonText>
            </View>
          </View>
          <ScrollView
            scrollEnabled={true}
            horizontal={false} // Prevent horizontal scrolling
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuScrollViewContainer}
            style={{ width: "100%" }}
          >
            <View style={[{ marginTop: 20 }]}>
              <View style={styles.categoryRow}>
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
              </View>
              <View style={styles.categoryRow}>
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
              </View>
              <View style={styles.categoryRow}>
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
                <CategoryCard
                  imageSrc={OldTestament}
                  title="Old Testament Stories"
                  onPress={() => {}}
                />
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {questionMenuVisible && <Overlay onPress={toggleQuestionMenu} />}
    </>
  );
}
