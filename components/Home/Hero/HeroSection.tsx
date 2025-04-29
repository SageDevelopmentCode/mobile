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

  // Loading animation
  const loadingFadeAnim = useRef(new Animated.Value(0)).current;
  const loadingScaleAnim = useRef(new Animated.Value(0.8)).current;

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

    // Start loading animation
    Animated.parallel([
      Animated.timing(loadingFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(loadingScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      // Reset animation values when component updates
      loadingFadeAnim.setValue(0);
      loadingScaleAnim.setValue(0.8);
    };
  }, [characterImage]);

  // Handle image load completion
  const handleImageLoaded = () => {
    // Fade out the loading indicator
    Animated.parallel([
      Animated.timing(loadingFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(loadingScaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setImageLoading(false);
    });
  };

  // Interpolate the float animation to translate Y
  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3], // Move up 3 pixels
  });

  // Check if this is a remote image (has uri property) or local image
  const isRemoteImage =
    characterImage &&
    typeof characterImage === "object" &&
    "uri" in characterImage;

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
            {/* Character Image */}
            {characterImage && !imageError ? (
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
                onLoad={handleImageLoaded}
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
                  {
                    transform: [{ translateY }, { scale: scaleAnim }],
                    opacity: fadeAnim,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 300,
                    height: 300,
                  },
                ]}
              >
                <View style={loadingContainerStyle.container}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              </Animated.View>
            )}

            {/* Loading Overlay */}
            {imageLoading && !imageError && (
              <Animated.View
                style={[
                  loadingContainerStyle.overlay,
                  {
                    opacity: loadingFadeAnim,
                    transform: [{ scale: loadingScaleAnim }],
                  },
                ]}
              >
                <View style={loadingContainerStyle.container}>
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

// Define loading style separately
const loadingContainerStyle = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

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
