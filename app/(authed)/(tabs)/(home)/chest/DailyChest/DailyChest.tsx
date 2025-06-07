import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "expo-router";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./DailyChest.styles";
import { MaterialIcons } from "@/utils/icons";
import colors from "@/constants/colors";
import ChestOpenBackground from "@/assets/images/backgrounds/ChestOpen.jpg";
import { Title, Heading, SubHeading } from "@/components/Text/TextComponents";
import DenariiImage from "@/assets/images/currency/Denarii.png";
import MannaImage from "@/assets/images/currency/Manna.png";
import FruitImage from "@/assets/images/currency/Fruit.png";

const { width, height } = Dimensions.get("window");

interface Reward {
  id: string;
  type: "fruit" | "denarii" | "manna";
  amount: number;
  image: any;
  name: string;
}

const getRandomAmount = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rewards: Reward[] = [
  {
    id: "1",
    type: "fruit",
    amount: getRandomAmount(500, 1000),
    image: FruitImage,
    name: "Fruit",
  },
  {
    id: "2",
    type: "denarii",
    amount: getRandomAmount(100, 200),
    image: DenariiImage,
    name: "Denarii",
  },
  {
    id: "3",
    type: "manna",
    amount: getRandomAmount(1, 5),
    image: MannaImage,
    name: "Manna",
  },
];

export default function DailyChestScreen() {
  const navigation = useNavigation();
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [showRewards, setShowRewards] = useState(true);
  const [isScreenReady, setIsScreenReady] = useState(false);

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    // Small delay to ensure screen is fully mounted before starting animations
    const timer = setTimeout(() => {
      setIsScreenReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
      });
    };
  }, [navigation]);

  useEffect(() => {
    if (isScreenReady && showRewards) {
      startRewardAnimation();
    }
  }, [isScreenReady, currentRewardIndex]);

  const startRewardAnimation = () => {
    // Reset animations
    scaleAnim.setValue(0);
    fadeAnim.setValue(0);
    bounceAnim.setValue(0);

    // Start animation sequence
    Animated.sequence([
      // Fade in and scale up
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Bounce effect
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleTapReward = () => {
    if (currentRewardIndex < rewards.length - 1) {
      // Move to next reward
      Animated.sequence([
        // Scale down current reward
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setCurrentRewardIndex(currentRewardIndex + 1);
      });
    } else {
      // All rewards claimed - celebrate and close
      celebrateAndFinish();
    }
  };

  const celebrateAndFinish = () => {
    // Simple fade out and navigate back
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleScreenTap = () => {
    if (showRewards) {
      handleTapReward();
    }
  };

  const currentReward = rewards[currentRewardIndex];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleScreenTap}
    >
      <View style={styles.topContainer}>
        {/* Rewards Display */}
        {showRewards && isScreenReady && (
          <View style={styles.rewardsContainer}>
            <Animated.View
              style={[
                styles.rewardCard,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }, { translateY: bounceAnim }],
                },
              ]}
            >
              {/* Reward Image */}
              <Animated.Image
                source={currentReward.image}
                style={[
                  styles.rewardImage,
                  {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              />

              {/* Reward Text */}
              <Animated.View
                style={[
                  styles.rewardTextContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: bounceAnim }],
                  },
                ]}
              >
                <Title color={colors.DarkPrimaryText}>
                  +{currentReward.amount.toLocaleString()} {currentReward.name}
                </Title>
              </Animated.View>
            </Animated.View>

            {/* Tap instruction */}
            <View style={styles.tapInstruction}>
              <Title style={styles.tapText}>
                {currentRewardIndex < rewards.length - 1
                  ? "Tap to claim"
                  : "Tap to finish"}
              </Title>
            </View>
          </View>
        )}
      </View>

      <ImageBackground
        resizeMode="cover"
        source={ChestOpenBackground}
        style={styles.imageBackground}
      />
    </TouchableOpacity>
  );
}
