import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./HeroBar.styles";

type HeroBarProps = {
  characterName: string;
  level: number;
  currentXP: number;
  maxXP: number;
};

export const HeroBar = ({
  characterName,
  level,
  currentXP,
  maxXP,
}: HeroBarProps) => {
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <View style={styles.heroBar}>
      <Title color={colors.PrimaryWhite}>{characterName}</Title>
      <View style={styles.levelSection}>
        <Text style={styles.levelText}>Lv. {level}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>
    </View>
  );
};
