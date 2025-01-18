import React from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
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
                  color={colors.PrimaryBlue}
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
              pathname: "/(authed)/(home)/goal/create/[id]",
              params: { id: "12135" },
            })
          }
          style={[
            styles.goalContainer,
            {
              backgroundColor: colors.EmojiGrayBackground,
              shadowColor: colors.PrimaryGrayDropShadow,
              paddingVertical: 10,
            },
          ]}
        >
          <View style={styles.goalLeftContainer}>
            <View
              style={[
                styles.goalEmoji,
                { backgroundColor: colors.PrimaryGrayDropShadow },
              ]}
            >
              <Heading>🎯</Heading>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Heading color={colors.DarkPrimaryText}>Add a Goal</Heading>
            </View>
          </View>
          <View style={styles.goalRightContainer}>
            <SquareActionButton
              style={{
                backgroundColor: colors.DarkPurpleButton,
                shadowColor: colors.DarkPurpleButtonDropShadow,
              }}
              onPress={() =>
                router.push({
                  pathname: "/(authed)/(home)/goal/create/[id]",
                  params: { id: "12135" },
                })
              }
              icon={
                <FontAwesome6
                  color={colors.PrimaryWhite}
                  name="plus"
                  size={20}
                />
              }
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
