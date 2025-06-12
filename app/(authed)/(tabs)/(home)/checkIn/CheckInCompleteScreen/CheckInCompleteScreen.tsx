import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SubHeading, Title } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { FontAwesome6 } from "@/utils/icons";
import colors from "@/constants/colors";
import { getCheckInCompleteScreenStyles } from "./CheckInCompleteScreen.styles";
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";
import { useAuth } from "@/context/AuthContext";
import { useCharacterContext } from "@/lib/context/CharacterContext";
import {
  getLatestUserCheckIn,
  createUserCheckIn,
  getUserCheckInCountForToday,
} from "@/lib/supabase/db/user_check_in";
import { addCurrencyToUser } from "@/lib/supabase/db/user_currency";

// Reward items with their icons, amounts, and labels
const rewardItems = [
  {
    id: "fruit",
    icon: require("../../assets/Fruit.png"),
    amount: 1100,
    label: "fruit",
    isImage: true,
  },
  {
    id: "denarii",
    icon: require("../../assets/Denarii.png"),
    amount: 250,
    label: "denarii",
    isImage: true,
  },
  {
    id: "manna",
    icon: require("../../assets/Manna.png"),
    amount: 1,
    label: "manna",
    isImage: true,
  },
  {
    id: "energy",
    icon: "bolt",
    amount: 2,
    label: "energy",
    isImage: false,
  },
];

export default function CheckInCompleteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const styles = getCheckInCompleteScreenStyles();
  const { session } = useAuth();
  const { refreshUserData } = useCharacterContext();
  const [isFirstCheckIn, setIsFirstCheckIn] = useState<boolean>(false);
  const [rewardsLoaded, setRewardsLoaded] = useState<boolean>(false);
  const [isCreatingCheckIn, setIsCreatingCheckIn] = useState<boolean>(false);
  const [todayCheckInCount, setTodayCheckInCount] = useState<number>(0);

  // Get answers from previous screens
  const selectedMood = params.selectedMood as string;
  const selectedHeart = params.selectedHeart as string;
  const selectedLove = params.selectedLove as string;
  const characterName = params.characterName as string;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Check if this is the user's first check-in and get today's check-in count
  useEffect(() => {
    const checkCheckInStatus = async () => {
      if (session?.user?.id) {
        try {
          // Check if this is the first check-in ever
          const latestCheckIn = await getLatestUserCheckIn(session.user.id);
          console.log("latestCheckIn", latestCheckIn);
          setIsFirstCheckIn(latestCheckIn === null);

          // Get today's check-in count
          const todayCount = await getUserCheckInCountForToday(session.user.id);
          console.log("todayCheckInCount", todayCount);
          setTodayCheckInCount(todayCount);
        } catch (error) {
          console.error("Error checking check-in status:", error);
          setIsFirstCheckIn(false);
          setTodayCheckInCount(0);
        } finally {
          setRewardsLoaded(true);
        }
      }
    };

    checkCheckInStatus();
  }, [session]);

  useEffect(() => {
    // Start animations when component mounts and rewards are loaded
    if (rewardsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, slideAnim, scaleAnim, rewardsLoaded]);

  const handleClaim = async () => {
    if (!session?.user?.id || isCreatingCheckIn) return;

    setIsCreatingCheckIn(true);

    try {
      // Map emoji hex codes to their corresponding labels
      const moodOptions = [
        { hex: "1f929", label: "Amazing" },
        { hex: "1f642", label: "Pretty good" },
        { hex: "1f610", label: "Okay" },
        { hex: "1f634", label: "Tired" },
        { hex: "1f623", label: "Awful" },
        { hex: "1f971", label: "Exhausted" },
      ];

      const heartOptions = [
        { hex: "1f932", label: "Open" },
        { hex: "1f50d", label: "Seeking" },
        { hex: "1f64f", label: "Grateful" },
        { hex: "1f636", label: "Distant" },
        { hex: "1f6ab", label: "Rebellious" },
        { hex: "1f494", label: "Broken" },
      ];

      const loveOptions = [
        { hex: "1f64c", label: "Serving" },
        { hex: "1f91d", label: "Forgiving" },
        { hex: "1f31f", label: "Uplifting" },
        { hex: "23f2", label: "Patient" },
        { hex: "1f644", label: "Selfish" },
        { hex: "1f32b", label: "Isolated" },
      ];

      // Find the corresponding labels for selected answers
      const moodAnswer =
        moodOptions.find((option) => option.hex === selectedMood)?.label ||
        "Unknown";
      const heartAnswer =
        heartOptions.find((option) => option.hex === selectedHeart)?.label ||
        "Unknown";
      const loveAnswer =
        loveOptions.find((option) => option.hex === selectedLove)?.label ||
        "Unknown";

      // Prepare the questions and answers data with actual questions and answer labels
      const questionsAnswers = {
        question1: {
          question: "How are you feeling today?",
          answer: moodAnswer,
          emoji: selectedMood,
        },
        question2: {
          question: "How is your heart toward God today?",
          answer: heartAnswer,
          emoji: selectedHeart,
        },
        question3: {
          question: "How are you loving others like Jesus today?",
          answer: loveAnswer,
          emoji: selectedLove,
        },
        characterName: characterName,
      };

      // Calculate rewards based on displayed rewards
      const fruitReward =
        displayedRewards.find((item) => item.id === "fruit")?.amount || 0;
      const denariiReward =
        displayedRewards.find((item) => item.id === "denarii")?.amount || 0;
      const mannaReward =
        displayedRewards.find((item) => item.id === "manna")?.amount || 0;
      const energyReward =
        displayedRewards.find((item) => item.id === "energy")?.amount || 0;

      // Create the check-in record
      const checkInData = {
        user_id: session.user.id,
        denarii_earned: denariiReward,
        manna_earned: mannaReward,
        fruit_earned: fruitReward,
        energy_earned: energyReward,
        questions_answers: questionsAnswers,
        bonus_rewards: null, // Can be used for future bonus logic
      };

      console.log("Creating check-in with data:", checkInData);

      await createUserCheckIn(checkInData);

      // Add currency to user's balance
      await addCurrencyToUser(
        session.user.id,
        checkInData.denarii_earned,
        checkInData.manna_earned,
        checkInData.fruit_earned
      );

      console.log("Check-in created and currency added successfully!");

      // Refresh user data to update currency display
      await refreshUserData();

      // Navigate back to home after successfully creating check-in
      router.push("/(authed)/(tabs)/(home)");
    } catch (error) {
      console.error("Error creating check-in:", error);
      // You might want to show an error message to the user here
      // For now, we'll still navigate back
      router.push("/(authed)/(tabs)/(home)");
    } finally {
      setIsCreatingCheckIn(false);
    }
  };

  // Filter rewards based on check-in limits
  const displayedRewards = rewardItems.filter((item) => {
    if (item.id === "manna") {
      return isFirstCheckIn;
    }
    if (item.id === "energy" && todayCheckInCount >= 5) {
      return false; // No energy after 5 check-ins today
    }
    if (item.id === "denarii" && todayCheckInCount >= 10) {
      return false; // No denarii after 10 check-ins today
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.CheckInGreen}
      />

      <View style={styles.content}>
        {/* Animated Content */}
        <Animated.View
          style={[
            styles.centeredContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Celebrating Emoji */}
          <View style={styles.emojiContainer}>
            <Twemoji hex="1f973" size={60} style={styles.celebratingEmoji} />
          </View>

          {/* Title */}
          <Title color={colors.PrimaryWhite} style={styles.title}>
            Check in completed!
          </Title>

          {/* Reward Items */}
          <View style={styles.rewardsContainer}>
            {displayedRewards.map((item, index) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.rewardItem,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, 50 + index * 10],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.rewardIconContainer}>
                  {item.isImage ? (
                    <Image source={item.icon} style={styles.rewardIcon} />
                  ) : (
                    <FontAwesome6
                      name={item.icon as any}
                      size={28}
                      color="#FFD700"
                    />
                  )}
                </View>
                <SubHeading style={styles.rewardText}>
                  +{item.amount.toLocaleString()} {item.label}
                </SubHeading>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Claim Button */}
        <ActionButton
          onPress={handleClaim}
          disabled={isCreatingCheckIn}
          title={isCreatingCheckIn ? "Claiming..." : "Claim"}
          backgroundColor={colors.PrimaryWhite}
          buttonDropShadow={colors.PrimaryWhiteDropShadow}
          titleColor={colors.CheckInGreen}
          icon={
            <FontAwesome6 name="check" size={20} color={colors.CheckInGreen} />
          }
        />
      </View>
    </SafeAreaView>
  );
}
