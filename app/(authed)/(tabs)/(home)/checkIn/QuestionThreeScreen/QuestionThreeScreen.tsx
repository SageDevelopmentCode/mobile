import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Title, Paragraph } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { FontAwesome6, Ionicons } from "@/utils/icons";
import colors from "@/constants/colors";
import { getQuestionThreeScreenStyles } from "./QuestionThreeScreen.styles";
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";
import { useCharacterContext } from "@/lib/context/CharacterContext";

// Emoji options with their hex codes for loving others question
const emojiOptions = [
  { hex: "1f64c", label: "Serving" }, // 🙌 hands raised
  { hex: "1f91d", label: "Forgiving" }, // 🤝 handshake
  { hex: "1f31f", label: "Uplifting" }, // ⭐ star
  { hex: "23f2", label: "Patient" }, // ⏲️ timer
  { hex: "1f644", label: "Selfish" }, // 🙄 eye roll
  { hex: "1f32b", label: "Isolated" }, // ◻️ white square
];

export default function QuestionThreeScreen() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const styles = getQuestionThreeScreenStyles();
  const { userData } = useCharacterContext();

  console.log("userData", userData);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Get character name and previous selections from previous screens
  const characterName = params.characterName as string;
  const selectedMood = params.selectedMood as string;
  const selectedHeart = params.selectedHeart as string;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleEmojiPress = (hex: string) => {
    setSelectedEmoji(hex);
  };

  const handleNext = () => {
    if (selectedEmoji) {
      // Complete check-in and navigate back to home
      // You can add API call here to save all three selections
      router.push("/(authed)/(tabs)/(home)");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.CheckInGreen}
      />

      <View style={styles.content}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons
              name="chevron-back"
              size={32}
              color={colors.PrimaryWhite}
            />
          </TouchableOpacity>
        </View>

        {/* Centered Content with Animation */}
        <Animated.View
          style={[
            styles.centeredContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.questionContainer}>
            <Title color={colors.PrimaryWhite}>
              How are you loving others like Jesus today?
            </Title>
          </View>

          {/* Emoji Grid */}
          <View style={styles.emojiGrid}>
            {emojiOptions.map((emoji, index) => (
              <TouchableOpacity
                key={emoji.hex}
                style={[
                  styles.emojiOption,
                  selectedEmoji === emoji.hex && styles.emojiOptionSelected,
                ]}
                onPress={() => handleEmojiPress(emoji.hex)}
              >
                <Twemoji hex={emoji.hex} size={35} style={styles.emojiImage} />
                <Text style={styles.emojiLabel}>{emoji.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Next Button */}
        <ActionButton
          onPress={handleNext}
          disabled={!selectedEmoji}
          title="Next"
          backgroundColor="#F3F4F6"
          buttonDropShadow="#D9D9D9"
          titleColor={colors.DarkPrimaryText}
          icon={
            <FontAwesome6
              name="arrow-right"
              size={20}
              color={
                selectedEmoji ? colors.DarkPrimaryText : "rgba(42, 48, 64, 0.4)"
              }
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
