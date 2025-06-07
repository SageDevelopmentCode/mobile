import React, { useEffect, useState } from "react";
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
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import {
  getLatestUserCheckIn,
  UserCheckIn,
} from "@/lib/supabase/db/user_check_in";

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
  const { session } = useAuth();
  const [latestCheckIn, setLatestCheckIn] = useState<UserCheckIn | null>(null);
  const [isLoadingCheckIn, setIsLoadingCheckIn] = useState<boolean>(true);

  console.log("Active character data:", activeCharacterData);
  console.log("Active character:", activeCharacter);

  // Helper function to format check-in date contextually for subtitle
  const formatLastCheckInSubtitle = (checkInDate: string): string => {
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const diffInMs = now.getTime() - checkIn.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes < 1) return "just now";
      return `${diffInMinutes}m ago`;
    }

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    if (diffInDays === 1) {
      return "yesterday";
    }

    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }

    // For older dates, show the date
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return checkIn.toLocaleDateString("en-US", options);
  };

  // Fetch latest check-in when component mounts or user changes
  useEffect(() => {
    const fetchLatestCheckIn = async () => {
      if (session?.user?.id) {
        setIsLoadingCheckIn(true);
        try {
          const checkIn = await getLatestUserCheckIn(session.user.id);
          setLatestCheckIn(checkIn);
        } catch (error) {
          console.error("Error fetching latest check-in:", error);
          setLatestCheckIn(null);
        } finally {
          setIsLoadingCheckIn(false);
        }
      }
    };

    fetchLatestCheckIn();
  }, [session?.user?.id]);

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
        <CharacterMood
          moodData={activeCharacterData.user_character_mood}
          characterName={activeCharacter}
        />
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
              subtitle={
                isLoadingCheckIn
                  ? "..."
                  : latestCheckIn && latestCheckIn.created_at
                  ? formatLastCheckInSubtitle(latestCheckIn.created_at)
                  : undefined
              }
              onPress={handleCheckIn}
              disabled={isLoadingCheckIn}
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
