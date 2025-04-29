import React, { useEffect, useRef, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome6 } from "@/utils/icons";
import { tabBarOptions } from "@/constants/tabBarOptions";
import colors from "@/constants/colors";
import { styles } from "./GoalCreateSuccess.styles";

// Components
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import {
  Heading,
  Paragraph,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import { SuggestionItem } from "@/components/Suggestion";

// Assets
import Background from "../../assets/GoalSuccessBackground.jpg";
import Deborah from "../../../assets/Deborah.png";
import toggleMenu from "@/utils/animations/toggleMenu";
import ToggleMenuButton from "@/components/Goal/Create/Success/ToggleMenuButton/ToggleMenuButton";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");
  const verse: any = searchParams.get("verse");

  // Console log all goal data when component mounts
  useEffect(() => {
    console.log("Goal data:", {
      goal,
      emoji,
      verse,
      dateTime: new Date().toISOString(),
      repeatSelection,
    });
  }, []);

  const repeatOptions = ["Every day", "Every weekday"];
  const slideAnim = useRef(new Animated.Value(800)).current;

  const [repeatMenuVisible, setRepeatMenuVisible] = useState(false); // State for submenu visibility
  const [repeatSelection, setRepeatSelection] = useState("Does not repeat");

  const toggleRepeatMenu = () =>
    toggleMenu(repeatMenuVisible, setRepeatMenuVisible, slideAnim);

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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.contentContainer}>
          <Heading color={colors.PrimaryWhite} style={{ marginBottom: 10 }}>
            Your goal has been created! 🥳
          </Heading>
          <SuggestionItem
            title={goal}
            onPress={() => console.log("Verse you created")}
            emoji={emoji}
            style={{
              shadowColor: colors.PrimarySecondaryPurpleDropShadow,
              marginBottom: 10,
            }}
          />
          <ToggleMenuButton
            label={repeatSelection}
            onPress={toggleRepeatMenu}
          />
        </View>
        <View style={[styles.contentContainer, { marginTop: 30 }]}>
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => console.log("Share")}
          >
            <Paragraph color={colors.PrimaryWhite}>
              Share with your friends
            </Paragraph>
          </TouchableOpacity>

          <ActionButton
            type="PrimaryGray"
            title="Done"
            onPress={() =>
              router.push({
                pathname: "/(authed)/(tabs)/(home)/HomeScreen",
                params: {
                  goal: goal,
                  emoji: emoji,
                },
              })
            }
            icon={
              <FontAwesome6
                name="check"
                size={20}
                color={colors.DarkPrimaryText}
              />
            }
          />
        </View>
      </View>
      <ImageBackground
        source={Background}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Image source={Deborah} style={styles.character} resizeMode="contain" />
      </ImageBackground>

      {/* Background Tint when Menu is Open */}
      {repeatMenuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleRepeatMenu} />
      )}

      {/* Submenu */}
      {repeatMenuVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateY: slideAnim }],
              height: "60%",
            },
          ]}
        >
          <Title color={colors.PrimaryWhite} style={{ marginBottom: 10 }}>
            Repeat
          </Title>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.menuContent}>
              <Paragraph
                color={colors.PrimaryWhite}
                style={styles.explanationText}
              >
                Choose how often this goal should repeat:
              </Paragraph>

              <SubHeading
                color={colors.PrimaryWhite}
                style={{ marginBottom: 10, marginTop: 15 }}
              >
                Frequency
              </SubHeading>

              <View style={styles.timeOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.timeOption,
                    repeatSelection === "Does not repeat" &&
                      styles.selectedTimeOption,
                    { width: "100%" },
                  ]}
                  onPress={() => setRepeatSelection("Does not repeat")}
                >
                  <View style={styles.optionContentContainer}>
                    <SubHeading
                      color={
                        repeatSelection === "Does not repeat"
                          ? colors.PrimaryWhite
                          : colors.PrimaryWhite
                      }
                      style={styles.optionText}
                    >
                      Does not repeat
                    </SubHeading>
                    {repeatSelection === "Does not repeat" && (
                      <FontAwesome6
                        name="circle-check"
                        size={20}
                        color={colors.PrimaryWhite}
                        style={styles.checkIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {repeatOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeOption,
                      repeatSelection === option && styles.selectedTimeOption,
                    ]}
                    onPress={() => setRepeatSelection(option)}
                  >
                    <View style={styles.optionContentContainer}>
                      <SubHeading
                        color={
                          repeatSelection === option
                            ? colors.PrimaryWhite
                            : colors.PrimaryWhite
                        }
                        style={styles.optionText}
                      >
                        {option}
                      </SubHeading>
                      {repeatSelection === option && (
                        <FontAwesome6
                          name="circle-check"
                          size={20}
                          color={colors.PrimaryWhite}
                          style={styles.checkIcon}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.doneButton}
                onPress={toggleRepeatMenu}
              >
                <SubHeading
                  color={colors.PrimaryWhite}
                  style={styles.optionText}
                >
                  Done
                </SubHeading>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
