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
} from "react-native";
import { Heading, Paragraph, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

type RouteParams = {
  goalId?: string;
  title?: string;
  emoji?: string;
  activeCharacter: string;
};

export const GoalReflectionScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<RouteParams>();
  const { goalId, title, emoji, activeCharacter } = params;

  const [reflectionText, setReflectionText] = useState("");
  const [energyCount, setEnergyCount] = useState(0);

  const isDeborah = activeCharacter === "Deborah";
  const primaryColor = isDeborah
    ? colors.PrimaryPurpleBackground
    : colors.SolaraGreen;
  const backgroundColor = isDeborah
    ? colors.DarkPurpleBackground
    : colors.GabrielBackground;

  // Calculate energy based on text length
  useEffect(() => {
    // Simple energy calculation based on character count
    // 1 energy point per 20 characters with a minimum of 2
    const calculatedEnergy = Math.max(
      2,
      Math.floor(reflectionText.length / 20)
    );
    setEnergyCount(calculatedEnergy);
  }, [reflectionText]);

  const handleCancel = () => {
    router.back();
  };

  const handleDone = () => {
    // No functionality for now, just go back
    router.back();
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
              Goal Reflection
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
            What made you skip this goal?
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
            <Text style={styles.energyText}>+{energyCount}</Text>
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
          >
            <StatText style={styles.doneButtonText} color={colors.PrimaryWhite}>
              Done
            </StatText>
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
