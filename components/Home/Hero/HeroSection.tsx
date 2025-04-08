import React, { useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { HeroBar } from "./HeroBar/HeroBar";
import { getHeroSectionStyles } from "./HeroSection.styles";
import Particles from "./Particles/Particles";

interface HeroSectionProps {
  characterName: string;
  characterImage: any;
  backgroundImage: any;
  onCharacterPress: () => void;
  onSwitchPress: () => void;
}

export const HeroSection = ({
  characterName,
  characterImage,
  backgroundImage,
  onCharacterPress,
  onSwitchPress,
}: HeroSectionProps) => {
  const styles = getHeroSectionStyles();

  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Start the floating animation
  useEffect(() => {
    const startFloatingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startFloatingAnimation();

    // Clean up animation on unmount
    return () => {
      floatAnim.stopAnimation();
    };
  }, []);

  // Interpolate the float animation to translate Y
  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3], // Move up 10 pixels
  });

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.heroContent}>
        <HeroBar characterName={characterName} onSwitchPress={onSwitchPress} />

        <TouchableOpacity
          onPress={onCharacterPress}
          style={styles.characterImage}
        >
          <Animated.Image
            source={characterImage}
            style={[styles.character, { transform: [{ translateY }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Define static styles for the glow effect
const characterGlowStyles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: "70%",
    height: "70%",
    borderRadius: 100,
    alignSelf: "center",
    top: "25%",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
});
