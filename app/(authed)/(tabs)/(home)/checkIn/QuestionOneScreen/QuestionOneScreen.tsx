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
import colors from "@/constants/colors";
import { getQuestionOneScreenStyles } from "./QuestionOneScreen.styles";

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

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.CheckInGreen}
      />

      <View style={styles.content}>
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
              <Twemoji hex={emoji.hex} size={40} style={styles.emojiImage} />
              <Text style={styles.emojiLabel}>{emoji.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedEmoji && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!selectedEmoji}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
