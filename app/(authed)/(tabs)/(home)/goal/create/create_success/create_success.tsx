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
import { FontAwesome6 } from "@/utils/icons";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import colors from "@/constants/colors";
import { styles } from "./create_success.styles";
import Background from "../../assets/GoalSuccessBackground.jpg";
import Deborah from "../../../assets/Deborah.png";
import {
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/Text/TextComponents";
import { SuggestionItem } from "@/components/Suggestion";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");

  const [menuVisible, setMenuVisible] = useState(false); // State for submenu visibility
  const slideAnim = useRef(new Animated.Value(800)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      // Close menu
      Animated.timing(slideAnim, {
        toValue: 800, // Move off-screen
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false)); // Set visibility to false after animation
    } else {
      setMenuVisible(true); // Set visibility to true before animation
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
          <TouchableOpacity>
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>Today</SubHeading>
              <FontAwesome6
                name="pencil"
                size={20}
                color={colors.PrimaryWhite}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
      {/* Close Button for Submenu */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.outsideCloseButton}
          onPress={toggleMenu}
        >
          <Entypo name="chevron-down" size={45} color="#ffffff" />
        </TouchableOpacity>
      )}
      {/* Background Tint when Menu is Open */}
      {menuVisible && <View style={styles.overlay} />}

      {/* Submenu */}
      {menuVisible && <Submenu progress={progress} slideAnim={slideAnim} />}
    </View>
  );
}
