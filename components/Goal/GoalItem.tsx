import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Ensure you have this library installed
import { Heading, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import SquareActionButton from "../Buttons/SquareActionButtons/SquareActionButtons";
import { router } from "expo-router";
import { getStyles } from "./GoalItem.styles";
import { GoalItemBottomSheet } from "./GoalItemBottomSheet";
import { SkippedGoalBottomSheet } from "./SkippedGoalBottomSheet";

type GoalItemProps = {
  title: string;
  description?: string;
  emoji: string;
  onPress: () => void;
  onIconPress?: () => void;
  isCompleted?: boolean;
  newGoal?: boolean;
  energyCount?: number;
  activeCharacter: string;
  related_verse?: string;
  goal_repeat?: string;
  energy_count?: number;
  experience_reward?: number;
  category?: string;
  id?: string; // Adding an optional ID for the goal
};

export const GoalItem = ({
  title,
  description,
  emoji,
  onPress,
  onIconPress,
  isCompleted = false,
  newGoal = false,
  energyCount = 2, // Default to 2 if not provided
  activeCharacter,
  related_verse,
  goal_repeat,
  energy_count,
  experience_reward,
  category,
  id,
}: GoalItemProps) => {
  const styles = getStyles(activeCharacter);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [skippedSheetVisible, setSkippedSheetVisible] = useState(false);

  // Default emoji if none provided
  const displayEmoji = emoji || "🎯";

  const handlePress = () => {
    onPress();
    setBottomSheetVisible(true);
  };

  const handleLongPress = () => {
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    // The closeWithAnimation function in GoalItemBottomSheet
    // will handle the animation and call this when done
    setBottomSheetVisible(false);
  };

  const handleSkipGoal = () => {
    // Close the main bottom sheet
    setBottomSheetVisible(false);

    // Small delay to ensure smooth transition between sheets
    setTimeout(() => {
      setSkippedSheetVisible(true);
    }, 300);
  };

  const handleEdit = () => {
    console.log("Edit goal pressed", id);
    // Navigate to edit screen or open edit modal
    if (id) {
      router.push({
        pathname: "/(authed)/(tabs)/(home)/goal/create/GoalCreate",
        params: { id }, // Pass the ID as a param for editing existing goal
      });
    }
  };

  const handleUndoSkip = () => {
    console.log("Undo skipping goal");
    // Add functionality to undo the skip
  };

  const handleDoneSkip = () => {
    console.log("Confirmed skipping goal");
    // Add functionality to confirm the skip
  };

  if (newGoal) {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(authed)/(tabs)/(home)/goal/create/GoalCreate",
          })
        }
        style={[
          styles.goalContainer,
          {
            backgroundColor: "rgba(240, 240, 240, 0.15)",
            shadowColor: "none",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            elevation: 0,
            paddingVertical: 10,
          },
        ]}
      >
        <View style={styles.goalLeftContainer}>
          <View
            style={[
              styles.goalEmoji,
              { backgroundColor: "rgba(217, 217, 217, 0.10)" },
            ]}
          >
            <Heading>🎯</Heading>
          </View>
          <View style={{ marginLeft: 15 }}>
            <Heading color={colors.PrimaryWhite}>Add a Goal</Heading>
          </View>
        </View>
        <View style={styles.goalRightContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(authed)/(tabs)/(home)/goal/create/GoalCreate",
              })
            }
          >
            <FontAwesome6 color={colors.PrimaryWhite} name="plus" size={20} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={300}
        style={styles.goalContainer}
      >
        <View style={styles.goalLeftContainer}>
          <View style={styles.goalEmoji}>
            <Heading>{displayEmoji}</Heading>
          </View>
          <View style={additionalStyles.textContainer}>
            <Heading
              color={colors.PrimaryWhite}
              style={additionalStyles.titleText}
            >
              {title}
            </Heading>
          </View>
        </View>
        <View style={styles.goalRightContainer}>
          <View style={energyStyles.energyContainer}>
            <FontAwesome6
              name="bolt"
              size={14}
              color={colors.EnergyColor}
              style={energyStyles.energyIcon}
            />
            <StatText color={colors.EnergyColor}>{energyCount}</StatText>
          </View>
          <SquareActionButton
            onPress={onIconPress ? onIconPress : () => {}}
            icon={
              <FontAwesome6 color={colors.SolaraGreen} name="play" size={23} />
            }
          />
        </View>
      </TouchableOpacity>

      <GoalItemBottomSheet
        visible={bottomSheetVisible}
        onClose={handleCloseBottomSheet}
        emoji={displayEmoji}
        title={title}
        description={description}
        related_verse={related_verse}
        goal_repeat={goal_repeat}
        energy_count={energy_count}
        experience_reward={experience_reward}
        category={category}
        energyCount={energyCount}
        onSkip={handleSkipGoal}
        onComplete={() => console.log("Complete")}
        onSnooze={() => console.log("Snooze")}
        onEdit={handleEdit}
        activeCharacter={activeCharacter}
      />

      {/* Skipped Goal Bottom Sheet */}
      <SkippedGoalBottomSheet
        visible={skippedSheetVisible}
        onClose={() => setSkippedSheetVisible(false)}
        emoji={displayEmoji}
        title={title}
        onUndo={handleUndoSkip}
        onDone={handleDoneSkip}
        activeCharacter={activeCharacter}
      />
    </View>
  );
};

// Add styles for the energy count display
const energyStyles = StyleSheet.create({
  energyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "rgba(255, 204, 0, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  energyIcon: {
    marginRight: 4,
  },
});

// Additional styles for text wrapping
const additionalStyles = StyleSheet.create({
  textContainer: {
    marginLeft: 15,
    flex: 1,
    flexShrink: 1,
  },
  titleText: {
    flexWrap: "wrap",
  },
});
