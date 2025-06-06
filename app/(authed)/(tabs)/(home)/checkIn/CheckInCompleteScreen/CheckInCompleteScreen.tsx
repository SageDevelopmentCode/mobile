import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SubHeading, Title } from "@/components/Text/TextComponents";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import { FontAwesome6 } from "@/utils/icons";
import colors from "@/constants/colors";
import { getCheckInCompleteScreenStyles } from "./CheckInCompleteScreen.styles";
import { ActionButton } from "@/components/Buttons/ActionButtons/ActionButton";

// Reward items with their icons and amounts
const rewardItems = [
  {
    id: "fruit",
    icon: require("../../assets/Fruit.png"),
    amount: "+1,100 fruit",
    isImage: true,
  },
  {
    id: "denarii",
    icon: require("../../assets/Denarii.png"),
    amount: "+250 denarii",
    isImage: true,
  },
  {
    id: "manna",
    icon: require("../../assets/Manna.png"),
    amount: "+1 manna",
    isImage: true,
  },
  {
    id: "energy",
    icon: "bolt",
    amount: "+5 energy",
    isImage: false,
  },
];

export default function CheckInCompleteScreen() {
  const router = useRouter();
  const styles = getCheckInCompleteScreenStyles();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations when component mounts
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
  }, [fadeAnim, slideAnim, scaleAnim]);

  const handleClaim = () => {
    // Navigate back to home after claiming rewards
    router.push("/(authed)/(tabs)/(home)");
  };

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
            {rewardItems.map((item, index) => (
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
                <SubHeading style={styles.rewardText}>{item.amount}</SubHeading>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Claim Button */}
        <ActionButton
          onPress={handleClaim}
          title="Claim"
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
