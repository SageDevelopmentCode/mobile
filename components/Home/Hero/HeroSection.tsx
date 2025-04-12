import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { HeroBar } from "./HeroBar/HeroBar";
import { getHeroSectionStyles } from "./HeroSection.styles";
import Particles from "./Particles/Particles";

interface HeroSectionProps {
  characterName: string;
  characterImage: any; // Can be a local image or { uri: string }
  backgroundImage: any;
  onCharacterPress: () => void;
  onSwitchPress: () => void;
  fadeAnim?: Animated.Value;
  scaleAnim?: Animated.Value;
  backgroundFadeAnim?: Animated.Value;
  isTransitioning?: boolean;
}

export const HeroSection = ({
  characterName,
  characterImage,
  backgroundImage,
  onCharacterPress,
  onSwitchPress,
  fadeAnim = new Animated.Value(1),
  scaleAnim = new Animated.Value(1),
  backgroundFadeAnim = new Animated.Value(1),
  isTransitioning = false,
}: HeroSectionProps) => {
  const styles = getHeroSectionStyles();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Animation for loading indicator
  const loadingFadeAnim = useRef(new Animated.Value(0)).current;

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

  // When character image changes, reset loading state
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);

    // Start fade-in animation for loading indicator
    Animated.timing(loadingFadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [characterImage]);

  // When loading state changes, animate the loading indicator
  useEffect(() => {
    if (!imageLoading) {
      // Fade out loading indicator when image is loaded
      Animated.timing(loadingFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoading]);

  // Interpolate the float animation to translate Y
  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3], // Move up 3 pixels
  });

  // Log the character image to debug
  console.log("Character Image in HeroSection:", characterImage);

  // Check if this is a remote image (has uri property) or local image
  const isRemoteImage =
    characterImage &&
    typeof characterImage === "object" &&
    "uri" in characterImage;
  console.log("Is remote image:", isRemoteImage);

  // Determine if we need to show placeholder or image
  const showPlaceholder = !characterImage || imageError;

  return (
    <Animated.View style={{ opacity: backgroundFadeAnim }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.heroContent}>
          <HeroBar
            characterName={characterName}
            onSwitchPress={!isTransitioning ? onSwitchPress : undefined}
          />

          <TouchableOpacity
            onPress={!isTransitioning ? onCharacterPress : undefined}
            style={styles.characterImage}
            activeOpacity={isTransitioning ? 1 : 0.8}
          >
            {!showPlaceholder ? (
              <Animated.Image
                source={characterImage}
                style={[
                  styles.character,
                  {
                    transform: [{ translateY }, { scale: scaleAnim }],
                    opacity: fadeAnim,
                  },
                  // Add explicit dimensions for remote images
                  isRemoteImage ? { width: 300, height: 300 } : null,
                ]}
                resizeMode="contain"
                onLoadStart={() => setImageLoading(true)}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  console.error(
                    "Error loading character image:",
                    e.nativeEvent.error
                  );
                  console.error(
                    "Image source was:",
                    JSON.stringify(characterImage)
                  );
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            ) : (
              <Animated.View
                style={[
                  styles.character,
                  characterPlaceholderStyles.container,
                  {
                    transform: [{ translateY }, { scale: scaleAnim }],
                    opacity: fadeAnim,
                  },
                ]}
              >
                <View style={characterPlaceholderStyles.circle}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              </Animated.View>
            )}

            {/* Loading Overlay */}
            {imageLoading && !imageError && !showPlaceholder && (
              <Animated.View
                style={[
                  characterPlaceholderStyles.loadingOverlay,
                  { opacity: loadingFadeAnim },
                ]}
              >
                <View style={characterPlaceholderStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

// Define styles for the placeholder and loading indicator
const characterPlaceholderStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  loadingContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
