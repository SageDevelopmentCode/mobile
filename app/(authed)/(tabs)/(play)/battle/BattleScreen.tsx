import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
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
import { CharacterSwitchCard } from "@/components/Battle/BattleScreen/CharacterSwitchCard/CharacterSwitchCard";
import { MaterialIcons } from "@/utils/icons";
import { QuitModal } from "@/components/Battle/BattleScreen/QuitModal/QuitModal";
import { Character } from "@/components/Battle/BattleScreen/Character/Character";
import { CharacterAbility } from "@/components/Home/Character/Details/CharacterAbilities/Ability/CharacterAbility";
import JudgeWisdom from "../../../../../components/Home/Character/Details/CharacterAbilities/Ability/assets/JudgeWisdom.png";
import JudgeWisdomBg from "../../../../../components/Home/Character/Details/CharacterAbilities/Ability/assets/JudgeWisdomBg.jpg";
import toggleMenu from "@/utils/animations/toggleMenu";
import Overlay from "@/components/Overlay/Overlay";
import { CategoryCard } from "@/components/Battle/BattleScreen/Questions/Categories/CategoryCard/CategoryCard";
import { ActionButton } from "@/components/Battle/BattleScreen/Questions/ActionButton/ActionButton";

export default function BattleScreen() {
  const [quitModalVisible, setQuitModalVisible] = useState<boolean>(false);
  const [questionStep, setQuestionStep] = useState<number>(1);
  const [questionMenuVisible, setQuestionMenuVisible] =
    useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(800)).current;

  // Create animation values for player and enemy
  const playerAnimValue = useRef(new Animated.Value(0)).current;
  const enemyAnimValue = useRef(new Animated.Value(0)).current;

  // Add state for enemy health
  const [enemyHealth, setEnemyHealth] = useState(400);
  const [playerHealth, setPlayerHealth] = useState(100);

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

  // Animation sequence for attacking
  const performAttackAnimation = (isCorrect = true) => {
    // Reset animations
    playerAnimValue.setValue(0);
    enemyAnimValue.setValue(0);

    // Sequence: Player attacks -> Enemy reacts -> (optional) Enemy counter-attacks
    Animated.sequence([
      // Player attack animation
      Animated.timing(playerAnimValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      // Enemy reaction animation (if correct answer)
      Animated.timing(enemyAnimValue, {
        toValue: isCorrect ? 1 : 0, // Only animate if correct
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update health values after animation finishes
      if (isCorrect) {
        // Reduce enemy health if correct answer
        setEnemyHealth((prev) => Math.max(0, prev - 20));
      } else {
        // Reduce player health if wrong answer
        setPlayerHealth((prev) => Math.max(0, prev - 10));
      }
    });
  };

  // Handler for answer selection
  const handleAnswerSelect = (answer: any) => {
    // Check if answer is correct (for this example, "The woman with the issue of blood" is correct)
    const isCorrect = answer === "The woman with the issue of blood";

    // Run animation
    performAttackAnimation(isCorrect);

    // Close menu and reset to step 1
    setQuestionStep(1);
    setQuestionMenuVisible(false);
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
            {/* Player */}
            <Character
              characterName="Deborah"
              level={12}
              health={playerHealth}
              typeImage={SolaraType}
              characterImage={Deborah}
              onPress={() => {}}
              maxHealth={100}
              animatedValue={playerAnimValue}
              isPlayer={true}
            />

            {/* Enemy */}
            <Character
              characterName="Gabriel"
              level={12}
              health={enemyHealth}
              typeImage={SolaraType}
              characterImage={Gabriel}
              onPress={() => {}}
              maxHealth={400}
              animatedValue={enemyAnimValue}
              isPlayer={false}
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
          {questionStep === 1 ? (
            <>
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
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                    <CategoryCard
                      imageSrc={OldTestament}
                      title="Old Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                  </View>
                  <View style={styles.categoryRow}>
                    <CategoryCard
                      imageSrc={OldTestament}
                      title="Old Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                    <CategoryCard
                      imageSrc={OldTestament}
                      title="Old Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                  </View>
                  <View style={styles.categoryRow}>
                    <CategoryCard
                      imageSrc={OldTestament}
                      title="Old Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                    <CategoryCard
                      imageSrc={OldTestament}
                      title="Old Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </>
          ) : questionStep === 2 ? (
            <>
              <View style={styles.textRow}>
                <Heading color={colors.PrimaryWhite}>
                  Select a Difficulty
                </Heading>
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
                  <ActionButton
                    backgroundColor="#505207"
                    buttonDropShadow="#424307"
                    title="Easy"
                    onPress={() => {
                      setQuestionStep(3);
                    }}
                  />
                  <ActionButton
                    backgroundColor="#FE9B96"
                    buttonDropShadow="#C5736F"
                    title="Medium"
                    onPress={() => {
                      setQuestionStep(3);
                    }}
                  />
                  <ActionButton
                    backgroundColor="#EE3E7E"
                    buttonDropShadow="#BC3A66"
                    title="Hard"
                    onPress={() => {
                      setQuestionStep(3);
                    }}
                  />
                  <ActionButton
                    backgroundColor="#FF9D22"
                    buttonDropShadow="#D76819"
                    title="Expert"
                    onPress={() => {
                      setQuestionStep(3);
                    }}
                  />
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <View style={styles.textRow}>
                <Heading color={colors.PrimaryWhite}>
                  Answer the question
                </Heading>
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
                <View style={styles.questionContainer}>
                  <Heading
                    style={[{ textAlign: "center" }]}
                    color={colors.PrimaryWhite}
                  >
                    Which woman was healed by touching the hem of Jesus's
                    garment?
                  </Heading>
                </View>
                <View style={[{ marginTop: 20 }]}>
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Mary Magdalene"
                    onPress={() => handleAnswerSelect("Mary Magdalene")}
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="The woman with the issue of blood"
                    onPress={() =>
                      handleAnswerSelect("The woman with the issue of blood")
                    }
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Martha of Bethany"
                    onPress={() => handleAnswerSelect("Martha of Bethany")}
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="The Samaritan woman at the well"
                    onPress={() =>
                      handleAnswerSelect("The Samaritan woman at the well")
                    }
                  />
                </View>
              </ScrollView>
            </>
          )}
        </Animated.View>
      )}

      {questionMenuVisible && <Overlay onPress={toggleQuestionMenu} />}
    </>
  );
}
