import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";
import { Heading, Paragraph, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { softDeleteUserGoal } from "@/lib/supabase/db/user_goals";
import { createUserReflection } from "@/lib/supabase/db/user_reflections";
import { useCharacterContext } from "../../lib/context/CharacterContext";

type ReflectionType = "skipped" | "completed";

// Define our component props type
interface ReflectionScreenProps {
  onRefreshGoals?: () => Promise<void>;
}

// Define our route params type
type ReflectionParams = {
  goalId?: string;
  title?: string;
  emoji?: string;
  activeCharacter?: string;
  reflectionType?: ReflectionType;
};

export const GoalReflectionScreen = ({
  onRefreshGoals,
}: ReflectionScreenProps) => {
  const router = useRouter();
  const params = useLocalSearchParams<ReflectionParams>();
  const {
    goalId,
    title,
    emoji,
    activeCharacter = "Gabriel", // Default to Gabriel if not provided
    reflectionType = "skipped",
  } = params;

  console.log("Goal ID from goal reflection screen", goalId);

  const { userData } = useCharacterContext();

  console.log("User data from goal reflection screen", userData);
  const [reflectionText, setReflectionText] = useState("");
  const [energyCount, setEnergyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isDeborah = activeCharacter === "Deborah";
  const primaryColor = isDeborah
    ? colors.PrimaryPurpleBackground
    : colors.SolaraGreen;
  const backgroundColor = isDeborah
    ? colors.DarkPurpleBackground
    : colors.GabrielBackground;

  // Calculate energy based on text length
  useEffect(() => {
    // Start at 0 energy and increase based on text length, capped at 3
    // Give 1 energy at 30 chars, 2 at 80 chars, 3 at 150+ chars
    let calculatedEnergy = 0;
    const length = reflectionText.length;

    if (length >= 30 && length < 80) {
      calculatedEnergy = 1;
    } else if (length >= 80 && length < 150) {
      calculatedEnergy = 2;
    } else if (length >= 150) {
      calculatedEnergy = 3;
    }

    setEnergyCount(calculatedEnergy);
  }, [reflectionText]);

  const handleCancel = () => {
    router.back();
  };

  const handleDone = async () => {
    if (!goalId || !userData?.id) {
      console.error("Missing goalId or userId");
      return;
    }

    try {
      setIsLoading(true);

      if (reflectionType === "skipped") {
        // 1. Soft delete the user goal
        await softDeleteUserGoal(goalId);

        // 2. Create user reflection
        await createUserReflection({
          user_id: userData.id,
          goal_id: goalId,
          energy_count: energyCount,
          user_answer: reflectionText,
          goal_status: reflectionType,
        });

        // 3. Refresh goals list if callback exists
        if (onRefreshGoals) {
          await onRefreshGoals();
          return;
        }
      }

      // Only navigate back if we didn't refresh goals
      router.back();
    } catch (error) {
      console.error("Error processing reflection:", error);
      setIsLoading(false);
    }
  };

  // Get the appropriate reflection prompt based on type
  const getReflectionPrompt = () => {
    if (reflectionType === "completed") {
      return "How did completing this goal make you feel?";
    } else {
      return "What made you skip this goal?";
    }
  };

  // Get the appropriate header title based on type
  const getHeaderTitle = () => {
    if (reflectionType === "completed") {
      return "Goal Completed";
    } else {
      return "Goal Reflection";
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <Ionicons name="arrow-back" size={24} color={colors.PrimaryWhite} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Heading color={colors.PrimaryWhite} style={styles.headerTitle}>
              {getHeaderTitle()}
            </Heading>
          </View>
          <View style={styles.placeholderView} />
        </View>

        {/* Goal info */}
        <View style={styles.goalInfoContainer}>
          <Text style={styles.emoji}>{emoji || "🪁"}</Text>
          <Paragraph color={colors.PrimaryWhite} style={styles.goalTitle}>
            {title || "Goal"}
          </Paragraph>
        </View>

        {/* Reflection prompt */}
        <View style={styles.promptContainer}>
          <StatText color="#AAAAAA" style={styles.promptText}>
            {getReflectionPrompt()}
          </StatText>
        </View>

        {/* Journal Entry */}
        <View style={styles.journalContainer}>
          <TextInput
            style={[styles.journalInput, { color: colors.PrimaryWhite }]}
            multiline
            placeholder="Write your thoughts here..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={reflectionText}
            onChangeText={setReflectionText}
            autoFocus
            selectionColor={primaryColor}
          />
        </View>

        {/* Energy counter at bottom */}
        <View style={styles.energyCounterContainer}>
          <View style={styles.energyBadge}>
            <FontAwesome6 name="bolt" size={14} color={colors.EnergyColor} />
            <Text style={styles.energyText}>{energyCount}</Text>
          </View>
          <StatText color="#AAAAAA" style={styles.energyExplanation}>
            Earn energy for your reflection
          </StatText>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <StatText style={styles.cancelButtonText} color={primaryColor}>
              Cancel
            </StatText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.doneButton, { backgroundColor: primaryColor }]}
            onPress={handleDone}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.PrimaryWhite} size="small" />
            ) : (
              <StatText
                style={styles.doneButtonText}
                color={colors.PrimaryWhite}
              >
                Done
              </StatText>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
  },
  placeholderView: {
    width: 44, // Same size as back button for even spacing
  },
  goalInfoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 22,
    textAlign: "center",
  },
  promptContainer: {
    marginBottom: 20,
  },
  promptText: {
    fontSize: 16,
  },
  journalContainer: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 15,
    marginBottom: 20,
  },
  journalInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
  energyCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  energyBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 204, 0, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  energyText: {
    color: colors.EnergyColor,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  energyExplanation: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  doneButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
