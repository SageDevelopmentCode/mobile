import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import HeadingBar from "@/components/Heading/HeadingBar";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { Chest } from "./Chest/Chest";
import colors from "@/constants/colors";
import { getHomeContentStyles } from "./HomeContent.styles";
import { User } from "@/types/User";

interface HomeContentProps {
  activeCharacter: string;
  goals: {
    emoji: string;
    title: string;
    description: string;
    isNew?: boolean;
  }[];
  chestImage: any;
  userData: User | null;
  isLoading?: boolean;
}

export const HomeContent = ({
  activeCharacter,
  goals,
  chestImage,
  userData,
  isLoading = false,
}: HomeContentProps) => {
  const styles = getHomeContentStyles();
  // Create animated values for each goal
  const fadeAnims = useRef(goals.map(() => new Animated.Value(0))).current;

  // Update fadeAnims when goals change
  useEffect(() => {
    // Reset the fadeAnims if goals length changes
    if (fadeAnims.length !== goals.length) {
      fadeAnims.length = 0;
      goals.forEach(() => fadeAnims.push(new Animated.Value(0)));
    }

    // Only animate if not loading
    if (!isLoading && goals.length > 0) {
      // Create an array of animations
      const animations = fadeAnims.map((anim, index) => {
        return Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          delay: index * 150, // Stagger the animations
          useNativeDriver: true,
        });
      });

      // Run the animations in sequence
      Animated.stagger(100, animations).start();
    }
  }, [goals, isLoading]);

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
        progress={userData ? (userData.energy_points / 20) * 100 : 0}
        backgroundColor={colors.PrimaryWhite}
        progressColor={
          activeCharacter === "Deborah"
            ? colors.PrimaryPurpleBackground
            : colors.SolaraGreen
        }
        imageSrc={chestImage}
        leftText={`${userData?.energy_points || 0} energy today`}
        rightText="Goal: 20"
        activeCharacter={activeCharacter}
      />

      <HeadingBar
        headingText={`${isLoading ? "..." : goals.length} Goals for today`}
      />

      {isLoading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            color={
              activeCharacter === "Deborah"
                ? colors.PrimaryPurpleBackground
                : colors.SolaraGreen
            }
          />
        </View>
      ) : (
        <>
          {goals.map((goal, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: fadeAnims[index] || 1,
                transform: [
                  {
                    translateY:
                      fadeAnims[index]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }) || 0,
                  },
                ],
              }}
            >
              <GoalItem
                title={goal.title}
                emoji={goal.emoji}
                onPress={() => console.log(`Goal ${index} pressed`)}
                onIconPress={() => console.log(`Goal ${index} icon pressed`)}
                newGoal={goal.isNew || false}
                activeCharacter={activeCharacter}
              />
            </Animated.View>
          ))}
          <GoalItem
            title="Add a Goal"
            emoji="🎯"
            onPress={() => console.log("Add Goal pressed")}
            onIconPress={() => console.log("Add Goal icon pressed")}
            newGoal={true}
            activeCharacter={activeCharacter}
          />
        </>
      )}
    </View>
  );
};
