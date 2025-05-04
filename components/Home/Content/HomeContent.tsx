import React, { useEffect, useRef, useCallback } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import HeadingBar from "@/components/Heading/HeadingBar";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { Chest } from "./Chest/Chest";
import colors from "@/constants/colors";
import { getHomeContentStyles } from "./HomeContent.styles";
import { User } from "@/types/User";
import { getUserGoals } from "@/lib/supabase/db/user_goals";

interface HomeContentProps {
  activeCharacter: string;
  goals: {
    experience_reward: number | undefined;
    category: string | undefined;
    energy_count: number | undefined;
    goal_repeat: string | undefined;
    id: string | undefined;
    emoji: string;
    title: string;
    description: string;
    isNew?: boolean;
    related_verse?: string;
    goal_time_set?: string;
  }[];
  chestImage: any;
  userData: User | null;
  isLoading?: boolean;
  setGoals?: React.Dispatch<React.SetStateAction<any[]>>;
  setGoalsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeContent = ({
  activeCharacter,
  goals,
  chestImage,
  userData,
  isLoading = false,
  setGoals,
  setGoalsLoading,
}: HomeContentProps) => {
  const styles = getHomeContentStyles();

  console.log("Goals in home content", goals);
  // Create animated values for each goal
  const fadeAnims = useRef(
    new Array(goals.length).fill(0).map(() => new Animated.Value(0))
  ).current;

  // Separate goals into today's and past goals
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysGoals = goals.filter((goal) => {
    if (!goal.goal_time_set) return true; // Default to today if no timestamp
    const goalDate = new Date(goal.goal_time_set);
    return goalDate >= todayStart && goalDate <= todayEnd;
  });

  const pastGoals = goals.filter((goal) => {
    if (!goal.goal_time_set) return false;
    const goalDate = new Date(goal.goal_time_set);
    return goalDate < todayStart;
  });

  console.log(
    `Split goals: Today=${todaysGoals.length}, Past=${pastGoals.length}`
  );

  // Function to refresh goals
  const refreshGoals = useCallback(async () => {
    if (!userData || !userData.id || !setGoals || !setGoalsLoading) {
      console.log("Cannot refresh goals: missing required data or functions");
      return;
    }

    try {
      setGoalsLoading(true);
      const freshGoals = await getUserGoals(userData.id);
      setGoals(freshGoals);
      console.log("Goals refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh goals:", error);
    } finally {
      setGoalsLoading(false);
    }
  }, [userData, setGoals, setGoalsLoading]);

  // Update fadeAnims when goals length changes
  useEffect(() => {
    // Ensure we have the right number of animation values
    if (fadeAnims.length !== goals.length) {
      fadeAnims.length = 0;
      goals.forEach(() => fadeAnims.push(new Animated.Value(0)));
    }
  }, [goals]);

  // Update fadeAnims when goals change
  useEffect(() => {
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
          {/* Today's Goals Section */}
          <HeadingBar headingText={`${todaysGoals.length} Goals for Today`} />

          {todaysGoals.map((goal, index) => (
            <Animated.View
              key={`today-${index}`}
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
                id={goal.id}
                title={goal.title}
                emoji={goal.emoji}
                onPress={() => console.log(`Goal ${index} pressed`)}
                onIconPress={() => console.log(`Goal ${index} icon pressed`)}
                newGoal={goal.isNew || false}
                activeCharacter={activeCharacter}
                related_verse={goal.related_verse}
                onRefreshGoals={refreshGoals}
                goal_repeat={goal.goal_repeat}
                energy_count={goal.energy_count}
                experience_reward={goal.experience_reward}
                category={goal.category}
              />
            </Animated.View>
          ))}

          {/* Add Goal Item - Only shown in Today's section */}
          <GoalItem
            title="Add a Goal"
            emoji="🎯"
            onPress={() => console.log("Add Goal pressed")}
            onIconPress={() => console.log("Add Goal icon pressed")}
            newGoal={true}
            activeCharacter={activeCharacter}
          />

          {/* Past Goals Section - Only shown if there are past goals */}
          {pastGoals.length > 0 && (
            <>
              <View style={styles.sectionDivider} />

              <HeadingBar headingText={`${pastGoals.length} Missed Goals`} />

              {pastGoals.map((goal, index) => (
                <Animated.View
                  key={`past-${index}`}
                  style={{
                    opacity: fadeAnims[todaysGoals.length + index] || 1,
                    transform: [
                      {
                        translateY:
                          fadeAnims[todaysGoals.length + index]?.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }) || 0,
                      },
                    ],
                  }}
                >
                  <GoalItem
                    id={goal.id}
                    title={goal.title}
                    emoji={goal.emoji}
                    onPress={() => console.log(`Past Goal ${index} pressed`)}
                    onIconPress={() =>
                      console.log(`Past Goal ${index} icon pressed`)
                    }
                    newGoal={goal.isNew || false}
                    activeCharacter={activeCharacter}
                    related_verse={goal.related_verse}
                    onRefreshGoals={refreshGoals}
                    goal_repeat={goal.goal_repeat}
                    energy_count={goal.energy_count}
                    experience_reward={goal.experience_reward}
                    category={goal.category}
                    isMissed={true}
                  />
                </Animated.View>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
};
