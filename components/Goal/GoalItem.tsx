import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Ensure you have this library installed
import { Heading, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import SquareActionButton from "../Buttons/SquareActionButtons/SquareActionButtons";
import { router } from "expo-router";
import { getStyles } from "./GoalItem.styles";
import { GoalItemBottomSheet } from "./GoalItemBottomSheet";

type GoalItemProps = {
  activeCharacter: string;
  newGoal: boolean;
  emoji?: string;
  title?: string;
  description?: string;
  onPress: () => void;
  onIconPress: () => void;
  id?: string; // Adding an optional ID for the goal
  energyCount?: number; // Adding energy count prop
};

export const GoalItem = ({
  activeCharacter,
  emoji,
  title,
  description,
  onPress,
  onIconPress,
  newGoal,
  id,
  energyCount = 2, // Default to 2 if not provided
}: GoalItemProps) => {
  const styles = getStyles(activeCharacter);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handlePress = () => {
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

  const handleSkip = () => {
    console.log("Skip pressed");
    // No need to handle close here as the bottom sheet will do it
  };

  const handleComplete = () => {
    console.log("Complete pressed");
    // No need to handle close here as the bottom sheet will do it
  };

  const handleSnooze = () => {
    console.log("Snooze pressed");
    // No need to handle close here as the bottom sheet will do it
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

  return (
    <View>
      {!newGoal ? (
        <>
          <TouchableOpacity
            onPress={handlePress}
            onLongPress={handleLongPress}
            delayLongPress={300}
            style={styles.goalContainer}
          >
            <View style={styles.goalLeftContainer}>
              <View style={styles.goalEmoji}>
                <Heading>{emoji}</Heading>
              </View>
              <View style={{ marginLeft: 15 }}>
                <Heading color={colors.PrimaryWhite}>{title}</Heading>
                <StatText color="#AAAAAA">{description}</StatText>
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
                onPress={onIconPress}
                icon={
                  <FontAwesome6
                    color={colors.SolaraGreen}
                    name="play"
                    size={23}
                  />
                }
              />
            </View>
          </TouchableOpacity>

          <GoalItemBottomSheet
            visible={bottomSheetVisible}
            onClose={handleCloseBottomSheet}
            emoji={emoji}
            title={title}
            description={description}
            energyCount={energyCount}
            onSkip={handleSkip}
            onComplete={handleComplete}
            onSnooze={handleSnooze}
            onEdit={handleEdit}
            activeCharacter={activeCharacter}
          />
        </>
      ) : (
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
      )}
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
