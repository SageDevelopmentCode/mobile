import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { router, useNavigation } from "expo-router";
const { width, height } = Dimensions.get("window");
import colors from "@/constants/colors";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./BattleScreen.styles";
import ZoneOneBattleBackground from "../assets/ZoneOneBattle.jpg";
import OldTestament from "../assets/OldTestament.jpg";
import BibleGeography from "../assets/BibleGeography.jpg";
import NewTestament from "../assets/NewTestament.jpg";
import NewTestament2 from "../assets/NewTestament2.jpg";
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
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";
import { AttackEffect } from "@/components/Battle/BattleScreen/Animations/AttackEffect";
import { DamageIndicator } from "@/components/Battle/BattleScreen/Animations/DamageIndicator";
import { VictoryModal } from "@/components/Battle/BattleScreen/VictoryModal/VictoryModal";
import { Alert } from "react-native";
import { useCharacterContext } from "@/lib/context/CharacterContext";

// Define types matching the CharacterAbility component
type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

type AbilityEffect = {
  type: "damage" | "buff";
  value: number;
  stat?: StatType;
};

type CharacterMove = {
  name: string;
  type: StatType;
  effects: AbilityEffect[];
  description: string;
  uses: number;
};

export default function BattleScreen() {
  const [quitModalVisible, setQuitModalVisible] = useState<boolean>(false);
  const [questionStep, setQuestionStep] = useState<number>(1);
  const [questionMenuVisible, setQuestionMenuVisible] =
    useState<boolean>(false);
  const [victoryModalVisible, setVictoryModalVisible] =
    useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(800)).current;

  // Get character data from context
  const { activeCharacterData, activeCharacter, userCharacters, isLoading } =
    useCharacterContext();

  console.log(
    "activeCharacterData in battle screen context",
    activeCharacterData
  );

  // If we're still loading character data, show a loading screen
  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          size="large"
          color={colors.PrimaryPurpleBackground}
        />
        <Heading color={colors.PrimaryWhite} style={{ marginTop: 20 }}>
          Loading character data...
        </Heading>
      </View>
    );
  }

  // If character data failed to load, show an error and a button to go back
  if (!activeCharacterData) {
    return (
      <View style={styles.loadingScreen}>
        <MaterialIcons
          name="error-outline"
          size={60}
          color={colors.PrimaryWhite}
        />
        <Heading
          color={colors.PrimaryWhite}
          style={{ marginTop: 20, textAlign: "center" }}
        >
          Could not load character data
        </Heading>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.back()}
        >
          <ButtonText color={colors.PrimaryWhite}>
            Return to previous screen
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  // Create animation values for player and enemy
  const playerAnimValue = useRef(new Animated.Value(0)).current;
  const enemyAnimValue = useRef(new Animated.Value(0)).current;

  // Add state for enemy health
  const [enemyHealth, setEnemyHealth] = useState(20);
  const [playerHealth, setPlayerHealth] = useState(99);

  // Add state for damage indicators
  const [showEnemyDamage, setShowEnemyDamage] = useState(false);
  const [showPlayerDamage, setShowPlayerDamage] = useState(false);
  const [damageAmount, setDamageAmount] = useState(0);
  const [enemyPosition, setEnemyPosition] = useState({ x: 0, y: 0 });
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  // Add state for attack effect
  const [showAttackEffect, setShowAttackEffect] = useState(false);
  const [attackEffectPosition, setAttackEffectPosition] = useState({
    x: 0,
    y: 0,
  });

  const navigation = useNavigation();

  // Prepare the character image source
  const characterImageSource = React.useMemo(() => {
    // Check if we have a valid image URL from the database
    if (
      activeCharacterData?.character?.image_url &&
      activeCharacterData.character.image_url.trim() !== ""
    ) {
      // Make sure the URL has a proper protocol
      let imageUrl = activeCharacterData.character.image_url;
      if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        imageUrl = "https://" + imageUrl.replace(/^\/\//, "");
      }

      return { uri: imageUrl };
    }

    // Fallback to local image
    return Deborah;
  }, [activeCharacterData]);

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

  // Check if enemy is defeated
  useEffect(() => {
    if (enemyHealth <= 0 && !victoryModalVisible) {
      // Add a small delay before showing victory modal
      setTimeout(() => {
        setVictoryModalVisible(true);
      }, 1000);
    }
  }, [enemyHealth, victoryModalVisible]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      // Reset any state when leaving the battle screen
      setVictoryModalVisible(false);
    };
  }, []);

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

    // Calculate damage values
    const damageValue = isCorrect ? 20 : 10;
    setDamageAmount(damageValue);

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
        duration: isCorrect ? 800 : 500, // Longer duration for shake animation
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Show attack effect if correct answer
      if (isCorrect) {
        // Position the attack effect near the enemy
        setAttackEffectPosition({ x: width * 0.75, y: height * 0.25 });
        setShowAttackEffect(true);

        // Show damage indicator with appropriate position
        setEnemyPosition({ x: width * 0.7, y: height * 0.3 });
        setShowEnemyDamage(true);

        // Reduce enemy health if correct answer
        setEnemyHealth((prev) => Math.max(0, prev - damageValue));
      } else {
        // Show damage to player (left side of screen)
        setPlayerPosition({ x: width * 0.2, y: height * 0.3 });
        setShowPlayerDamage(true);

        // Reduce player health if wrong answer
        setPlayerHealth((prev) => Math.max(0, prev - damageValue));
      }
    });
  };

  // Handler for answer selection
  const handleAnswerSelect = (answer: string) => {
    // Check if answer is correct (for this example, "The woman with the issue of blood" is correct)
    const isCorrect = answer === "Adam's Rib";

    // Run animation
    performAttackAnimation(isCorrect);

    // Close menu and reset to step 1
    setQuestionStep(1);
    setQuestionMenuVisible(false);
  };

  const closeVictoryModal = () => {
    // First close the modal
    setVictoryModalVisible(false);

    // Then navigate with a delay to ensure the modal is fully closed
    setTimeout(() => {
      // Use replace instead of push to avoid stacking screens
      router.replace("/(authed)/(tabs)/(play)/BattleHomeScreen");
    }, 300);
  };

  // Prepare character data for victory modal
  const characterData = {
    name: activeCharacterData?.character?.name || "Deborah",
    image: characterImageSource || Deborah,
    color1: "#E94B8A", // Primary pink color
    color2: "#F78FB2", // Secondary lighter pink
  };

  // Function to map data types from API to component types
  const mapMoveToAbility = (move: any): CharacterMove => {
    // Default effects if none provided
    const defaultEffects: AbilityEffect[] = [{ type: "damage", value: 50 }];

    // Make sure the type is valid
    const validTypes: StatType[] = [
      "attack",
      "defense",
      "specialAttack",
      "specialDefense",
      "speed",
    ];
    const type = validTypes.includes(move.type as StatType)
      ? (move.type as StatType)
      : "specialAttack";

    // Map and validate effects
    const mappedEffects = Array.isArray(move.effects)
      ? move.effects.map((effect: any) => ({
          type:
            effect.type === "buff" || effect.type === "damage"
              ? effect.type
              : "damage",
          value: typeof effect.value === "number" ? effect.value : 50,
          stat: effect.stat as StatType,
        }))
      : defaultEffects;

    return {
      name: move.name || "Unknown Ability",
      type,
      effects: mappedEffects,
      description: move.description || "No description available",
      uses: typeof move.uses === "number" ? move.uses : 3,
    };
  };

  return (
    <>
      <QuitModal
        visible={quitModalVisible}
        onClose={cancelQuit}
        onConfirm={confirmQuit}
      />
      <VictoryModal
        visible={victoryModalVisible}
        onClose={closeVictoryModal}
        character={characterData}
        rewards={[
          { type: "Faith Points", amount: 100, icon: "star", color: "#FFC107" },
          {
            type: "Wisdom",
            amount: 50,
            icon: "auto-awesome",
            color: "#5E97F6",
          },
          { type: "Scripture", amount: 3, icon: "menu-book", color: "#4CAF50" },
          {
            type: "Coins",
            amount: 75,
            icon: "monetization-on",
            color: "#FF9800",
          },
        ]}
        unlocks={[
          { title: "New Devotional Unlocked", icon: "book" },
          { title: "Path of Deborah Advanced", icon: "map" },
        ]}
        xpGained={150}
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
              characterName={
                activeCharacterData?.nickname ||
                activeCharacterData?.character?.name
              }
              level={activeCharacterData?.level || 12}
              health={playerHealth}
              typeImage={SolaraType}
              characterImage={characterImageSource || Deborah}
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
              <Heading color={colors.PrimaryPurpleBackground}>
                {activeCharacterData?.nickname ||
                  activeCharacterData?.character?.name}
              </Heading>{" "}
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
            {activeCharacterData?.character_moves &&
            activeCharacterData.character_moves.length > 0 ? (
              activeCharacterData.character_moves.map(
                (ability: any, index: number) => (
                  <CharacterAbility
                    key={index}
                    icon={JudgeWisdom}
                    name={ability.name}
                    type={ability.type}
                    effects={ability.effects}
                    description={ability.description}
                    uses={ability.uses}
                    onPress={toggleQuestionMenu}
                  />
                )
              )
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={colors.PrimaryPurpleBackground}
                />
                <ButtonText
                  color={colors.PrimaryWhite}
                  style={{ marginTop: 10 }}
                >
                  Loading abilities...
                </ButtonText>
              </View>
            )}
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
            {userCharacters.map((character, index) => (
              <CharacterSwitchCard
                key={index}
                characterImage={
                  character.character?.image_url
                    ? { uri: character.character.image_url }
                    : Gabriel
                }
                characterName={character.character?.name || "Unknown"}
                health={character.health || 99}
              />
            ))}
            {userCharacters.length === 0 && (
              <CharacterSwitchCard
                characterImage={Gabriel}
                characterName="Gabriel"
                health={99}
              />
            )}
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
                      imageSrc={BibleGeography}
                      title="Bible Geography"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                  </View>
                  <View style={styles.categoryRow}>
                    <CategoryCard
                      imageSrc={NewTestament}
                      title="New Testament Stories"
                      onPress={() => {
                        setQuestionStep(2);
                      }}
                    />
                    <CategoryCard
                      imageSrc={NewTestament2}
                      title="Jesus Stories"
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
                    How did God make Eve?
                  </Heading>
                </View>
                <View style={[{ marginTop: 20 }]}>
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Adam's Rib"
                    onPress={() => handleAnswerSelect("Adam's Rib")}
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Apple"
                    onPress={() => handleAnswerSelect("Apple")}
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Light"
                    onPress={() => handleAnswerSelect("Light")}
                  />
                  <ActionButton
                    backgroundColor="#565656"
                    buttonDropShadow="#343434"
                    title="Angel"
                    onPress={() => handleAnswerSelect("Angel")}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </Animated.View>
      )}

      {questionMenuVisible && <Overlay onPress={toggleQuestionMenu} />}

      {/* Damage Indicators */}
      {showEnemyDamage && (
        <DamageIndicator
          damage={damageAmount}
          position={enemyPosition}
          isHeal={false}
          onAnimationComplete={() => setShowEnemyDamage(false)}
        />
      )}

      {showPlayerDamage && (
        <DamageIndicator
          damage={damageAmount}
          position={playerPosition}
          isHeal={false}
          onAnimationComplete={() => setShowPlayerDamage(false)}
        />
      )}

      {/* Attack Effect */}
      {showAttackEffect && (
        <AttackEffect
          position={attackEffectPosition}
          size={100}
          color={colors.PrimaryPurpleBackground}
          onAnimationComplete={() => setShowAttackEffect(false)}
        />
      )}
    </>
  );
}
