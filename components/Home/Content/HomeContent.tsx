import React from "react";
import { View } from "react-native";
import HeadingBar from "@/components/Heading/HeadingBar";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { Chest } from "./Chest/Chest";
import colors from "@/constants/colors";
import { getHomeContentStyles } from "./HomeContent.styles";

interface HomeContentProps {
  activeCharacter: string;
  goals: {
    emoji: string;
    title: string;
    description: string;
    isNew?: boolean;
  }[];
  chestImage: any;
}

export const HomeContent = ({
  activeCharacter,
  goals,
  chestImage,
}: HomeContentProps) => {
  const styles = getHomeContentStyles();

  return (
    <View style={styles.contentContainer}>
      <View style={styles.chestRow}>
        <Chest
          onPress={() => {
            console.log("Daily");
          }}
          type="Daily"
          timeRemaining="04:06"
          key="Daily"
          activeCharacter={activeCharacter}
        />
        <Chest
          onPress={() => {
            console.log("Weekly");
          }}
          type="Weekly"
          timeRemaining="05:06"
          key="Weekly"
          activeCharacter={activeCharacter}
        />
      </View>

      <ProgressBar
        height={15}
        progress={40}
        backgroundColor={colors.PrimaryWhite}
        progressColor={
          activeCharacter === "Deborah"
            ? colors.PrimaryPurpleBackground
            : colors.SolaraGreen
        }
        imageSrc={chestImage}
        leftText="0 energy today"
        rightText="Goal: 20"
        activeCharacter={activeCharacter}
      />

      <HeadingBar headingText="Goals for today" />
      {goals.map((goal, index) => (
        <GoalItem
          key={index}
          title={goal.title}
          emoji={goal.emoji}
          description={goal.description}
          onPress={() => console.log(`Goal ${index} pressed`)}
          onIconPress={() => console.log(`Goal ${index} icon pressed`)}
          newGoal={goal.isNew || false}
          activeCharacter={activeCharacter}
        />
      ))}
    </View>
  );
};
