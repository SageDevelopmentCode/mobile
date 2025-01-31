import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router";
import {
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { useSearchParams } from "expo-router/build/hooks";
import { FontAwesome5, FontAwesome6 } from "@/utils/icons";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import colors from "@/constants/colors";
import { styles } from "./GoalCreateSuccess.styles";
import Background from "../../assets/GoalSuccessBackground.jpg";
import Deborah from "../../../assets/Deborah.png";
import {
  Heading,
  Paragraph,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import { SuggestionItem } from "@/components/Suggestion";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");

  const repeatOptions = ["Every day", "Every weekday", "Custom"];
  const dateAndTimeOptions = ["Every day", "Today", "Tomorrow", "On a date..."];

  const [dateMenuVisible, setDateMenuVisible] = useState(false); // State for submenu visibility
  const [repeatMenuVisible, setRepeatMenuVisible] = useState(false); // State for submenu visibility
  const [repeatSelection, setRepeatSelection] = useState("Does not repeat");
  const [dateAndTimeSelection, setDateAndTimeSelection] = useState("Every day");
  const slideAnim = useRef(new Animated.Value(800)).current;

  const toggleDateMenu = () => {
    if (dateMenuVisible) {
      // Close menu
      Animated.timing(slideAnim, {
        toValue: 800, // Move off-screen
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDateMenuVisible(false)); // Set visibility to false after animation
    } else {
      setDateMenuVisible(true); // Set visibility to true before animation
      Animated.timing(slideAnim, {
        toValue: 0, // Bring into view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleRepeatMenu = () => {
    if (repeatMenuVisible) {
      // Close menu
      Animated.timing(slideAnim, {
        toValue: 800, // Move off-screen
        duration: 300,
        useNativeDriver: true,
      }).start(() => setRepeatMenuVisible(false)); // Set visibility to false after animation
    } else {
      setRepeatMenuVisible(true); // Set visibility to true before animation
      Animated.timing(slideAnim, {
        toValue: 0, // Bring into view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

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
            style={{ shadowColor: colors.PrimarySecondaryPurpleDropShadow }}
          />
          <TouchableOpacity onPress={toggleDateMenu}>
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>Today</SubHeading>
              <FontAwesome6
                name="pencil"
                size={20}
                color={colors.PrimaryWhite}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRepeatMenu}>
            <View style={styles.actionContainer}>
              <SubHeading color={colors.PrimaryWhite}>
                Does not repeat
              </SubHeading>
              <FontAwesome6
                name="pencil"
                size={20}
                color={colors.PrimaryWhite}
              />
            </View>
          </TouchableOpacity>
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
      {dateMenuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDateMenu} />
      )}

      {repeatMenuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleRepeatMenu} />
      )}

      {/* Submenu */}
      {dateMenuVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Title style={{ marginBottom: 10 }} color={colors.PrimaryWhite}>
            Date and Time
          </Title>
          <View style={[styles.multipleActionContainer, { marginTop: 10 }]}>
            {dateAndTimeOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setDateAndTimeSelection(option)}
              >
                <View
                  style={[
                    styles.actionRowContainer,
                    index === dateAndTimeOptions.length - 1
                      ? { borderBottomWidth: 0 }
                      : {},
                  ]}
                >
                  <SubHeading color={colors.PrimaryWhite}>{option}</SubHeading>
                  {dateAndTimeSelection === option && (
                    <FontAwesome6
                      name="circle-check"
                      size={20}
                      color={colors.PrimaryWhite}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>Ends</SubHeading>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SubHeading
                  style={{ marginRight: 10 }}
                  color={colors.PrimaryWhite}
                >
                  Any time
                </SubHeading>
                <FontAwesome6
                  name="chevron-right"
                  size={20}
                  color={colors.PrimaryWhite}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

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
          <TouchableOpacity
            onPress={() => setRepeatSelection("Does not repeat")}
          >
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>
                Does not repeat
              </SubHeading>
              <FontAwesome6
                name="circle-check"
                size={20}
                color={colors.PrimaryWhite}
                style={
                  repeatSelection === "Does not repeat"
                    ? {}
                    : { color: colors.PrimarySecondaryPurpleDropShadow }
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>Ends</SubHeading>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SubHeading
                  style={{ marginRight: 10 }}
                  color={colors.PrimaryWhite}
                >
                  Never
                </SubHeading>
                <FontAwesome6
                  name="chevron-right"
                  size={20}
                  color={colors.PrimaryWhite}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.multipleActionContainer, { marginTop: 10 }]}>
            {repeatOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRepeatSelection(option)}
              >
                <View
                  style={[
                    styles.actionRowContainer,
                    index === repeatOptions.length - 1
                      ? { borderBottomWidth: 0 }
                      : {},
                  ]}
                >
                  <SubHeading color={colors.PrimaryWhite}>{option}</SubHeading>
                  {repeatSelection === option && (
                    <FontAwesome6
                      name="circle-check"
                      size={20}
                      color={colors.PrimaryWhite}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
