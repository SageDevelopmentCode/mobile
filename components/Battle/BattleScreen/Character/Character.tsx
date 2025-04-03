import { Animated, Image, TouchableOpacity, View } from "react-native";
import { ButtonText } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { styles } from "./Character.styles";
import React from "react";

type CharacterProps = {
  characterName: string;
  level: number;
  health: number;
  maxHealth: number;
  typeImage: any;
  characterImage: any;
  onPress?: () => void;
  animatedValue?: Animated.Value; // Add this prop
  isPlayer?: boolean; // To differentiate between player and enemy
};

export const Character = ({
  characterName,
  level,
  health,
  maxHealth,
  typeImage,
  characterImage,
  onPress,
  animatedValue,
  isPlayer = false,
}: CharacterProps) => {
  const healthPercentage = (health / maxHealth) * 100;

  // Animation style for character image
  const animatedStyle = animatedValue
    ? {
        transform: isPlayer
          ? [
              // Player moves forward to attack with enhanced effects
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.15, 0.3, 1],
                  outputRange: [0, 10, 60, 0, 0], // Faster forward motion with overshoot
                }),
              },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 0.1, 0.2, 0.3, 1],
                  outputRange: [0, -15, -5, 0, 0], // Jump up and then down
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.15, 0.2, 0.3, 1],
                  outputRange: [1, 1.2, 1.3, 1.1, 1, 1], // Pulsing scale effect
                }),
              },
              {
                rotate: animatedValue.interpolate({
                  inputRange: [0, 0.1, 0.2, 1],
                  outputRange: ["0deg", "5deg", "0deg", "0deg"], // Slight rotation for dynamic feeling
                }),
              },
            ]
          : [
              // Enemy shake/vibrate animation when hit
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                  outputRange: [0, -10, 8, -6, 4, -2, 1, 0, 0], // Vibration pattern
                }),
              },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                  outputRange: [0, -5, 3, -2, 1, 0, 0], // Small vertical shake
                }),
              },
              {
                rotate: animatedValue.interpolate({
                  inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                  outputRange: [
                    "0deg",
                    "-3deg",
                    "2deg",
                    "-1deg",
                    "1deg",
                    "0deg",
                    "0deg",
                  ], // Slight rotation
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.1, 1],
                  outputRange: [1, 0.95, 1, 1], // Brief shrink on impact
                }),
              },
            ],
      }
    : {};

  return (
    <View>
      <View style={styles.healthBarContainer}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCenter}>
            <Image
              source={typeImage}
              style={styles.typeImage}
              resizeMode="contain"
            />
            <ButtonText color={colors.PrimaryWhite}>Lv {level}</ButtonText>
          </View>
          <ButtonText color={colors.PrimaryWhite}>
            {health}/{maxHealth}
          </ButtonText>
        </View>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progress,
              {
                width: `${healthPercentage}%`,
                backgroundColor: colors.HealthBarGreen,
              },
            ]}
          />
        </View>
      </View>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity style={styles.characterImage} onPress={onPress}>
          <Image
            source={characterImage}
            style={styles.character}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.characterName}>
        <ButtonText color={colors.PrimaryWhite}>{characterName}</ButtonText>
      </View>
    </View>
  );
};
