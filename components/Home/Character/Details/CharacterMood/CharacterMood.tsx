import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "@/constants/colors";
import { Title, Paragraph } from "@/components/Text/TextComponents";

interface CharacterMoodProps {
  moodData?: {
    character_moods?: {
      emoji?: string;
      mood_name?: string;
      mood_description?: string;
      scripture_reference?: string;
      mood_message?: string;
    };
  }[];
}

export const CharacterMood = ({ moodData }: CharacterMoodProps) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Start animations when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Extract mood information - character_moods is an object, not an array
  console.log("moodData", moodData);
  const currentMood = moodData?.[0]?.character_moods;

  if (!currentMood) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Title color={colors.PrimaryWhite} style={styles.title}>
          Current Mood
        </Title>
        <View style={styles.noMoodContainer}>
          <Paragraph color={colors.GrayText} style={styles.noMoodText}>
            No mood data available
          </Paragraph>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Title color={colors.PrimaryWhite} style={styles.title}>
        Current Mood
      </Title>

      <View style={styles.moodCard}>
        <View style={styles.moodHeader}>
          <View style={styles.emojiContainer}>
            {currentMood.emoji && (
              <Text style={styles.emoji}>{currentMood.emoji}</Text>
            )}
          </View>
          <View style={styles.moodNameContainer}>
            <Title color={colors.PrimaryWhite} style={styles.moodName}>
              {currentMood.mood_name || "Unknown Mood"}
            </Title>
          </View>
        </View>

        {currentMood.mood_description && (
          <View style={styles.descriptionContainer}>
            <Paragraph color={colors.GrayText} style={styles.description}>
              {currentMood.mood_description}
            </Paragraph>
          </View>
        )}

        {currentMood.mood_message && (
          <View style={styles.messageContainer}>
            <Paragraph color={colors.PrimaryWhite} style={styles.messageLabel}>
              Message:
            </Paragraph>
            <Paragraph color={colors.GrayText} style={styles.message}>
              "{currentMood.mood_message}"
            </Paragraph>
          </View>
        )}

        {currentMood.scripture_reference && (
          <TouchableOpacity style={styles.scriptureContainer}>
            <Paragraph
              color={colors.PrimaryPurpleBackground}
              style={styles.scriptureLabel}
            >
              Scripture Reference:
            </Paragraph>
            <Paragraph
              color={colors.PrimaryPurpleBackground}
              style={styles.scripture}
            >
              {currentMood.scripture_reference}
            </Paragraph>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "100%",
  },
  title: {
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 16,
  },
  moodCard: {
    backgroundColor: colors.DarkPurpleBackground,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.GrayText,
  },
  moodHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  emojiContainer: {
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: colors.DarkPurpleButton,
    borderRadius: 25,
  },
  emoji: {
    fontSize: 28,
  },
  moodNameContainer: {
    flex: 1,
  },
  moodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageContainer: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: colors.DarkPurpleButton,
    borderRadius: 8,
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  scriptureContainer: {
    padding: 12,
    backgroundColor: colors.IdeasPrimaryBackground,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.PrimaryPurpleBackground,
  },
  scriptureLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  scripture: {
    fontSize: 14,
    fontWeight: "500",
  },
  noMoodContainer: {
    backgroundColor: colors.DarkPurpleBackground,
    borderRadius: 12,
    padding: 30,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noMoodText: {
    fontSize: 14,
    textAlign: "center",
  },
});
