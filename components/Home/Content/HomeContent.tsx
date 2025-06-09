import React, { useEffect, useRef, useCallback, useState } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import HeadingBar from "@/components/Heading/HeadingBar";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { GoalItem } from "@/components/Goal/GoalItem";
import { Chest } from "./Chest/Chest";
import colors from "@/constants/colors";
import { getHomeContentStyles } from "./HomeContent.styles";
import { User } from "@/types/User";
import { getUserGoals } from "@/lib/supabase/db/user_goals";
import { router } from "expo-router";

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
    goal_color?: string;
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
  const [dailyChestTimeRemaining, setDailyChestTimeRemaining] =
    useState<string>("Available");
  const [dailyChestProgress, setDailyChestProgress] = useState<number>(100);

  // Create animated values for each goal
  const fadeAnims = useRef(
    new Array(goals.length).fill(0).map(() => new Animated.Value(0))
  ).current;

  // Separate goals into today's and past goals - memoized to prevent recalculation on every render
  const { todaysGoals, pastGoals } = React.useMemo(() => {
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

    return { todaysGoals, pastGoals };
  }, [goals]);

  // Function to calculate daily chest countdown
  const calculateDailyChestCountdown = useCallback(() => {
    if (!userData?.last_daily_chest_opened_at) {
      const newValue = "Available";
      setDailyChestTimeRemaining((prev) =>
        prev !== newValue ? newValue : prev
      );
      setDailyChestProgress((prev) => (prev !== 100 ? 100 : prev));
      return;
    }

    const lastOpenedTime = new Date(userData.last_daily_chest_opened_at);
    const nextAvailableTime = new Date(
      lastOpenedTime.getTime() + 24 * 60 * 60 * 1000
    ); // 24 hours later
    const now = new Date();

    if (now >= nextAvailableTime) {
      const newValue = "Available";
      setDailyChestTimeRemaining((prev) =>
        prev !== newValue ? newValue : prev
      );
      setDailyChestProgress((prev) => (prev !== 100 ? 100 : prev));
      return;
    }

    const timeRemaining = nextAvailableTime.getTime() - now.getTime();
    const totalCooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const timeElapsed = totalCooldownTime - timeRemaining;
    const progressPercentage = Math.round(
      (timeElapsed / totalCooldownTime) * 100
    );

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // Only update state if the value actually changed
    setDailyChestTimeRemaining((prev) =>
      prev !== formattedTime ? formattedTime : prev
    );
    setDailyChestProgress((prev) =>
      prev !== progressPercentage ? progressPercentage : prev
    );
  }, [userData?.last_daily_chest_opened_at]);

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

  // Daily chest countdown timer effect
  useEffect(() => {
    // Calculate initial countdown
    calculateDailyChestCountdown();

    // Set up interval to update countdown every second
    const interval = setInterval(() => {
      calculateDailyChestCountdown();
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [calculateDailyChestCountdown]);

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
            router.push("/(authed)/(tabs)/(home)/chest/DailyChest/DailyChest");
          }}
          type="Daily"
          timeRemaining={dailyChestTimeRemaining}
          key="Daily"
          activeCharacter={activeCharacter}
          disabled={dailyChestTimeRemaining !== "Available"}
          progress={dailyChestProgress}
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
                goal_color={goal.goal_color}
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
                    goal_color={goal.goal_color}
                    isMissed={true}
                    goal_time_set={goal.goal_time_set}
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
