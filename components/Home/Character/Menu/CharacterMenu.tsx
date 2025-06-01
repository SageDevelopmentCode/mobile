import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Text,
} from "react-native";
import colors from "@/constants/colors";
import { Title, Paragraph } from "@/components/Text/TextComponents";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import HeadingBar from "@/components/Heading/HeadingBar";
import { CharacterStats } from "@/components/Home/Character/Details/CharacterStats/CharacterStats";
import { CharacterAbilities } from "@/components/Home/Character/Details/CharacterAbilities/CharacterAbilities";
import { CharacterRarities } from "@/components/Home/Character/Details/CharacterRarities/CharacterRarities";
import { CharacterCards } from "@/components/Home/Character/Details/CharacterCards/CharacterCards";
import { CharacterMood } from "@/components/Home/Character/Details/CharacterMood/CharacterMood";
import { CharacterTypeDialog } from "@/components/Home/Character/Details/Type/Dialogue/Dialogue";
import { getCharacterMenuStyles } from "./CharacterMenu.styles";
import { UserCharacterProps } from "@/types/UserCharacter";
import Emoji from "react-native-emoji";
import { ActionButton } from "@/components/Battle/BattleScreen/Questions/ActionButton/ActionButton";
import { useRouter } from "expo-router";

// Create CharacterAbout component inline
const CharacterAbout = () => (
  <View>
    <HeadingBar headingText="Appears in" />
    <HeadingBar headingText="Description" />
  </View>
);

interface CharacterMenuProps {
  activeCharacter: string;
  characterImage: any;
  activeCharacterData: UserCharacterProps;
  backgroundImage: any;
  typeImage: any;
  activeMenuCharacterTab: string;
  menuCharacterTabs: string[];
  handleTabPress: (tab: string) => void;
  toggleDialog: () => void;
  typeDialogVisible: boolean;
  slideAnim: Animated.Value;
}

export const CharacterMenu = ({
  activeCharacter,
  characterImage,
  backgroundImage,
  typeImage,
  activeMenuCharacterTab,
  menuCharacterTabs,
  handleTabPress,
  toggleDialog,
  typeDialogVisible,
  slideAnim,
  activeCharacterData,
}: CharacterMenuProps) => {
  const styles = getCharacterMenuStyles(activeCharacter);
  const router = useRouter();

  const handleCheckIn = () => {
    router.push({
      pathname:
        "/(authed)/(tabs)/(home)/checkIn/QuestionOneScreen/QuestionOneScreen",
      params: {
        characterName: activeCharacterData?.nickname || activeCharacter,
      },
    });
  };

  let CharacterDetailsComponent: JSX.Element | null;

  switch (activeMenuCharacterTab) {
    case "Stats":
      CharacterDetailsComponent = (
        <CharacterStats
          attack={activeCharacterData.attack}
          defense={activeCharacterData.defense}
          special_attack={activeCharacterData.special_attack}
          special_defense={activeCharacterData.special_defense}
          speed={activeCharacterData.speed}
          hit_points={activeCharacterData.hit_points}
        />
      );
      break;
    case "Abilities":
      CharacterDetailsComponent = (
        <CharacterAbilities
          characterMoves={activeCharacterData.character_moves}
        />
      );
      break;
    case "Mood":
      CharacterDetailsComponent = (
        <CharacterMood moodData={activeCharacterData.user_character_mood} />
      );
      break;
    case "Rarities":
      CharacterDetailsComponent = <CharacterRarities />;
      break;
    case "Cards":
      CharacterDetailsComponent = <CharacterCards />;
      break;
    case "About":
      CharacterDetailsComponent = <CharacterAbout />;
      break;
    default:
      CharacterDetailsComponent = null;
  }

  return (
    <Animated.View
      style={[
        styles.menu,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <ScrollView
        scrollEnabled={true}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuScrollViewContainer}
        style={{ width: "100%" }}
      >
        <View style={styles.menuImageContainer}>
          <ImageBackground
            source={backgroundImage}
            style={styles.menuImageBackground}
            resizeMode="cover"
          >
            <Image
              source={characterImage}
              style={styles.menuCharacter}
              onError={(error) =>
                console.error("Image loading error:", error.nativeEvent.error)
              }
            />
          </ImageBackground>
          <View style={styles.menuContentContainer}>
            <Title color={colors.PrimaryWhite}>
              {activeCharacterData && activeCharacterData.nickname}
            </Title>
            <Paragraph color={colors.GrayText}>{activeCharacter}</Paragraph>
            <TouchableOpacity onPress={toggleDialog}>
              <View
                style={[
                  styles.characterTypeContainer,
                  {
                    backgroundColor: colors.DarkPurpleButtonDropShadow,
                    shadowColor: colors.DarkPurpleButtonDropShadow,
                  },
                ]}
              >
                <View
                  style={[
                    styles.typeImageContainer,
                    { backgroundColor: colors.DarkPurpleButtonDropShadow },
                  ]}
                >
                  <Image source={typeImage} style={styles.typeImage} />
                </View>
                <View style={styles.typeTextContainer}>
                  <Paragraph color={colors.PrimaryWhite}>Solara</Paragraph>
                </View>
              </View>
            </TouchableOpacity>
            <ProgressBar
              height={15}
              progress={40}
              backgroundColor={colors.PrimaryWhite}
              progressColor={colors.PrimaryPurpleBackground}
              imageSrc={typeImage}
              leftText="Level 19"
              rightText="Level 20"
              activeCharacter={activeCharacter}
            />
            <ActionButton
              title={`Check in with ${activeCharacterData.nickname}`}
              onPress={handleCheckIn}
              backgroundColor={colors.CheckInGreen}
              buttonDropShadow={colors.CheckInGreenDropShadow}
              textAlign="left"
              emoji="👋"
            />
            <ActionButton
              title={`Help ${activeCharacterData.nickname} out`}
              onPress={() => console.log("Action")}
              backgroundColor={colors.PrimaryBlue}
              buttonDropShadow={colors.PrimaryBlueDropShadow}
              textAlign="left"
              emoji="🙌"
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabContainer}
            >
              {menuCharacterTabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tab,
                    activeMenuCharacterTab === tab && styles.activeTab,
                  ]}
                  onPress={() => handleTabPress(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeMenuCharacterTab === tab
                            ? colors.PrimaryWhite
                            : colors.PrimaryWhite,
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {CharacterDetailsComponent}
          </View>
        </View>
        {typeDialogVisible && (
          <CharacterTypeDialog
            title="Solara"
            description="Solara represents the essence of kindness, one of the powerful fruits of the Spirit. Characters of this type are natural peacemakers, capable of calming tensions and inspiring cooperation among allies."
            typeImage={typeImage}
            onClose={toggleDialog}
            type="Solara"
          />
        )}
      </ScrollView>
    </Animated.View>
  );
};
