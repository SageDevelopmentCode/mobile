import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Ensure you have this library installed
import { Heading, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import SquareActionButton from "../Buttons/SquareActionButtons/SquareActionButtons";
import { router } from "expo-router";
import { getStyles } from "./GoalItem.styles";
import { GoalItemBottomSheet } from "./GoalItemBottomSheet";
import { SkippedGoalBottomSheet } from "./SkippedGoalBottomSheet";
import { softDeleteUserGoal } from "@/lib/supabase/db/user_goals";

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
  onRefreshGoals?: () => Promise<void>; // Callback to refresh goals after actions
  isMissed?: boolean; // Flag to indicate if this is a missed/past goal
};

export const GoalItem = ({
  title,
  description,
  emoji,
  onPress,
  onIconPress,
  isCompleted = false,
  newGoal = false,
  energyCount,
  activeCharacter,
  related_verse,
  goal_repeat,
  energy_count,
  experience_reward,
  category,
  id,
  onRefreshGoals,
  isMissed = false,
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

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDoneSkip = async () => {
    console.log("Confirmed skipping goal", id);
    if (id) {
      setIsDeleting(true);
      try {
        await softDeleteUserGoal(id);
        console.log("Goal soft deleted successfully");
        // Refresh goals list if callback exists
        if (onRefreshGoals) {
          await onRefreshGoals();
        }
      } catch (error) {
        console.error("Error soft deleting goal:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (newGoal) {
    // Get a more encouraging color based on character
    const encouragingBorderColor =
      activeCharacter === "Deborah"
        ? "rgba(178, 138, 255, 0.6)" // Purple for Deborah
        : "rgba(81, 183, 171, 0.6)"; // Green for others

    const encouragingBgColor =
      activeCharacter === "Deborah"
        ? "rgba(178, 138, 255, 0.08)" // Light purple bg
        : "rgba(81, 183, 171, 0.08)"; // Light green bg

    const accentColor =
      activeCharacter === "Deborah"
        ? "rgba(178, 138, 255, 0.9)" // Bright purple
        : "rgba(81, 183, 171, 0.9)"; // Bright green

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
            backgroundColor: encouragingBgColor,
            borderWidth: 2,
            borderColor: encouragingBorderColor,
            borderStyle: "dashed",
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
              {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            ]}
          >
            <Heading>🎯</Heading>
          </View>
          <View style={{ marginLeft: 15 }}>
            <Heading color={colors.PrimaryWhite}>Add a Goal</Heading>
            <StatText color={accentColor} style={{ marginTop: 2 }}>
              Create something new
            </StatText>
          </View>
        </View>
        <View style={styles.goalRightContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(authed)/(tabs)/(home)/goal/create/GoalCreate",
              })
            }
            style={{
              backgroundColor: accentColor,
              width: 36,
              height: 36,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6 color={colors.PrimaryWhite} name="plus" size={18} />
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
        style={[
          styles.goalContainer,
          isMissed && {
            backgroundColor: "rgba(255, 100, 100, 0.15)", // Reddish tint for missed goals
            borderLeftWidth: 2,
            borderLeftColor: "rgba(255, 100, 100, 0.5)", // Red border on the left
            shadowOpacity: 1, // Remove shadow for missed goals
            elevation: 4,
          },
        ]}
      >
        <View style={styles.goalLeftContainer}>
          <View
            style={[
              styles.goalEmoji,
              isMissed && {
                backgroundColor: "rgba(255, 100, 100, 0.2)", // Reddish background for emoji
                shadowOpacity: 0, // Remove shadow
              },
            ]}
          >
            <Heading>{displayEmoji}</Heading>
          </View>
          <View style={additionalStyles.textContainer}>
            <Heading
              color={colors.PrimaryWhite}
              style={[
                additionalStyles.titleText,
                isMissed && {
                  color: "rgba(255, 255, 255, 0.7)", // Slightly dimmed text for missed goals
                  textShadowColor: "transparent", // Remove text shadow
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 0,
                },
              ]}
            >
              {title}
            </Heading>
            {isMissed && (
              <StatText
                color="rgba(255, 100, 100, 0.9)"
                style={additionalStyles.missedLabel}
              >
                Missed
              </StatText>
            )}
          </View>
        </View>
        <View style={styles.goalRightContainer}>
          <View
            style={[
              energyStyles.energyContainer,
              isMissed && {
                backgroundColor: "rgba(255, 100, 100, 0.15)", // Reddish energy container
                shadowOpacity: 0,
                elevation: 0,
              },
            ]}
          >
            <FontAwesome6
              name="bolt"
              size={14}
              color={isMissed ? "rgba(255, 100, 100, 0.9)" : colors.EnergyColor}
              style={energyStyles.energyIcon}
            />
            {energy_count !== undefined ? (
              <StatText
                color={
                  isMissed ? "rgba(255, 100, 100, 0.9)" : colors.EnergyColor
                }
                style={isMissed ? { textShadowRadius: 0 } : {}}
              >
                {energy_count}
              </StatText>
            ) : (
              <ActivityIndicator
                size="small"
                color={
                  isMissed ? "rgba(255, 100, 100, 0.9)" : colors.EnergyColor
                }
                style={{ width: 14, height: 14 }}
              />
            )}
          </View>
          <SquareActionButton
            onPress={onIconPress ? onIconPress : () => {}}
            icon={
              isMissed ? (
                <FontAwesome6
                  color="rgba(255, 100, 100, 0.9)"
                  name="xmark"
                  size={20}
                />
              ) : (
                <FontAwesome6
                  color={colors.SolaraGreen}
                  name="play"
                  size={23}
                />
              )
            }
            style={isMissed ? { shadowOpacity: 0, elevation: 0 } : {}}
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
        isLoading={isDeleting}
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
  missedLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
