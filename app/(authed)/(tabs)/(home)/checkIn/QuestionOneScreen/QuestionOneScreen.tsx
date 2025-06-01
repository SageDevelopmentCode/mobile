import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Title, Paragraph } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { FontAwesome6, Ionicons } from "@/utils/icons";
import colors from "@/constants/colors";
import { getQuestionOneScreenStyles } from "./QuestionOneScreen.styles";
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";

// Emoji options with their hex codes
const emojiOptions = [
  { hex: "1f929", label: "Amazing" }, // 🤩 star-struck
  { hex: "1f642", label: "Pretty good" }, // 🙂 slightly smiling
  { hex: "1f610", label: "Okay" }, // 😐 neutral
  { hex: "1f634", label: "Tired" }, // 😴 sleeping
  { hex: "1f623", label: "Awful" }, // 😣 persevering
  { hex: "1f971", label: "Exhausted" }, // 🥱 yawning
];

export default function QuestionOneScreen() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const styles = getQuestionOneScreenStyles();

  // Get character name from params or default to Julius
  const characterName = (params.characterName as string) || "Julius";

  const handleEmojiPress = (hex: string) => {
    setSelectedEmoji(hex);
  };

  const handleNext = () => {
    if (selectedEmoji) {
      // Navigate to next screen with selected emoji
      router.push({
        pathname:
          "/(authed)/(tabs)/(home)/checkIn/QuestionTwoScreen/QuestionTwoScreen",
        params: {
          selectedMood: selectedEmoji,
          characterName: characterName,
        },
      });
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

        {/* Header with greeting */}
        <View style={styles.header}>
          <Title color={colors.PrimaryWhite} style={styles.greeting}>
            Hi {characterName}! 👋
          </Title>
          <Paragraph color={colors.PrimaryWhite} style={styles.question}>
            How's your body feeling today?
          </Paragraph>
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
              color={colors.DarkPrimaryText}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
