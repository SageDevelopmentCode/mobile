import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Modal,
  PanResponder,
} from "react-native";
import colors from "@/constants/colors";
import {
  Title,
  Paragraph,
  SubHeading,
  Heading,
} from "@/components/Text/TextComponents";
import { Ionicons } from "@expo/vector-icons";

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
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(300)).current;
  const [showMoodDescription, setShowMoodDescription] = useState(false);

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

  // Modal animation functions
  const openModal = () => {
    setShowMoodDescription(true);
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslateY, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowMoodDescription(false);
    });
  };

  // PanResponder for drag functionality
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          gestureState.dy > 0 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        );
      },
      onPanResponderGrant: () => {
        modalTranslateY.setOffset(0);
        modalTranslateY.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          modalTranslateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        modalTranslateY.flattenOffset();

        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Close modal if dragged down enough
          closeModal();
        } else {
          // Snap back to original position
          Animated.spring(modalTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Extract mood information
  const currentMood = moodData?.[0]?.character_moods;

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

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
      {/* Green Feeling Card */}
      <TouchableOpacity style={styles.feelingCard} onPress={openModal}>
        <View style={styles.feelingCardLeft}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{currentMood.emoji || "🙏"}</Text>
          </View>
          <View style={styles.feelingContent}>
            <View style={styles.timeContainer}>
              <Paragraph color={colors.DarkPrimaryText}>
                Since {getCurrentTime()}
              </Paragraph>
            </View>
            <Heading color={colors.PrimaryWhite}>
              Feeling{" "}
              <Heading
                style={{ color: "#FFEAD2", textTransform: "capitalize" }}
              >
                {currentMood.mood_name}!
              </Heading>
            </Heading>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={colors.PrimaryWhite}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {/* Mood Message Card */}
      {currentMood.mood_message && (
        <View style={styles.messageCard}>
          <Paragraph style={styles.messageText}>
            {currentMood.mood_message}
          </Paragraph>

          {/* Scripture Reference */}
          {currentMood.scripture_reference && (
            <TouchableOpacity style={styles.scriptureContainer}>
              <Paragraph
                color={colors.PrimaryPurpleBackground}
                style={styles.scriptureText}
              >
                Read {currentMood.scripture_reference}
              </Paragraph>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.PrimaryPurpleBackground}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Bottom Sheet Modal for Mood Description */}
      <Modal
        visible={showMoodDescription}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={[
            styles.modalOverlay,
            {
              opacity: modalOpacity,
            },
          ]}
          activeOpacity={1}
          onPress={closeModal}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{ flex: 1 }}
            >
              <View style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetHandle} />
              </View>

              <View style={styles.bottomSheetContent}>
                <View style={styles.moodHeaderInSheet}>
                  <Text style={styles.emojiInSheet}>
                    {currentMood.emoji || "🙏"}
                  </Text>
                  <Title
                    color={colors.PrimaryWhite}
                    style={styles.moodNameInSheet}
                  >
                    {currentMood.mood_name || "Grateful"}
                  </Title>
                </View>

                {currentMood.mood_description && (
                  <Paragraph
                    color={colors.GrayText}
                    style={styles.descriptionInSheet}
                  >
                    {currentMood.mood_description}
                  </Paragraph>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "100%",
  },

  // Green Feeling Card Styles
  feelingCard: {
    backgroundColor: "#4A6BA7",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feelingCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.DarkPurpleBackground,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  feelingContent: {
    flex: 1,
  },
  timeContainer: {
    backgroundColor: colors.PrimaryWhite,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.GrayText,
    fontWeight: "500",
  },
  feelingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.PrimaryWhite,
  },
  chevronIcon: {
    marginLeft: 8,
  },

  // Message Card Styles
  messageCard: {
    backgroundColor: colors.DarkPurpleButton,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.PrimaryWhite,
    marginBottom: 16,
  },

  // Scripture Reference Styles
  scriptureContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  scriptureText: {
    fontSize: 14,
    color: colors.PrimaryPurpleBackground,
    fontWeight: "600",
    marginRight: 4,
  },

  // Bottom Sheet Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: colors.DarkPurpleBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "40%",
    maxHeight: "80%",
  },
  bottomSheetHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.GrayText,
    borderRadius: 2,
    alignSelf: "center",
  },
  bottomSheetContent: {
    padding: 20,
  },
  moodHeaderInSheet: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  emojiInSheet: {
    fontSize: 32,
    marginRight: 12,
  },
  moodNameInSheet: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  descriptionInSheet: {
    fontSize: 16,
    lineHeight: 24,
  },

  // No Mood State
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
