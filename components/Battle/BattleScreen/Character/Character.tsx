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
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 0.1, 0.2, 1],
              outputRange: isPlayer
                ? [0, 50, 0, 0] // Player moves right then back
                : [0, -20, 0, 0], // Enemy recoils left then back
            }),
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.1, 0.2, 1],
              outputRange: [1, 1.1, 1, 1], // Slight scale up during attack
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
