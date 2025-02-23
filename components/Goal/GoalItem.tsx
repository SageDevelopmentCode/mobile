import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Ensure you have this library installed
import { styles } from "./GoalItem.styles";
import { Heading, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import SquareActionButton from "../Buttons/SquareActionButtons/SquareActionButtons";
import { router } from "expo-router";

type GoalItemProps = {
  newGoal: boolean;
  emoji?: string;
  title?: string;
  description?: string;
  onPress: () => void;
  onIconPress: () => void;
};

export const GoalItem = ({
  emoji,
  title,
  description,
  onPress,
  onIconPress,
  newGoal,
}: GoalItemProps) => {
  return (
    <View>
      {!newGoal ? (
        <TouchableOpacity onPress={onPress} style={styles.goalContainer}>
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
              backgroundColor: "rgba(240, 240, 240, 0.05)",
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
