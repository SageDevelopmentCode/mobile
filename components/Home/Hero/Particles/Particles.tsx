import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Generate random number between min and max
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface ParticleProps {
  color?: string;
  count?: number;
  size?: {
    min: number;
    max: number;
  };
}

const Particles = ({
  color = "rgba(255, 255, 255, 0.3)",
  count = 15,
  size = { min: 2, max: 5 },
}: ParticleProps) => {
  // Create particles
  const particles = useRef<
    Array<{
      id: number;
      initialX: number;
      initialY: number;
      size: number;
      xOffset: Animated.Value;
      yOffset: Animated.Value;
      opacity: Animated.Value;
      fadeIn: Animated.Value;
    }>
  >([]);

  // Pre-populate particles array with initial values for immediate rendering
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const initialX = random(50, width - 50);
      const initialY = random(50, height * 0.6);

      particles.current.push({
        id: i,
        initialX,
        initialY,
        size: random(size.min, size.max),
        xOffset: new Animated.Value(0),
        yOffset: new Animated.Value(0),
        opacity: new Animated.Value(random(0.5, 0.8)),
        fadeIn: new Animated.Value(0), // Start invisible for fade-in
      });
    }
  }

  // Initialize animations on mount
  useEffect(() => {
    // Clear any previous animations
    particles.current.forEach((particle) => {
      particle.xOffset.stopAnimation();
      particle.yOffset.stopAnimation();
      particle.opacity.stopAnimation();
      particle.fadeIn.stopAnimation();
    });

    // Start animations for each particle
    particles.current.forEach((particle, index) => {
      // Fade in with staggered delay
      Animated.timing(particle.fadeIn, {
        toValue: 1,
        duration: 800,
        delay: index * 40,
        useNativeDriver: true,
      }).start();

      // Start the floating animations
      startFloatingAnimation(particle);
      startPulsingAnimation(particle);
    });

    // Clean up on unmount
    return () => {
      particles.current.forEach((particle) => {
        particle.xOffset.stopAnimation();
        particle.yOffset.stopAnimation();
        particle.opacity.stopAnimation();
        particle.fadeIn.stopAnimation();
      });
    };
  }, [count, size, color]);

  // Function to start the floating animation for a particle
  const startFloatingAnimation = (particle: (typeof particles.current)[0]) => {
    // Vertical floating animation (up and down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.yOffset, {
          toValue: -random(15, 25),
          duration: random(2000, 3000),
          useNativeDriver: true,
        }),
        Animated.timing(particle.yOffset, {
          toValue: random(5, 10),
          duration: random(2000, 3000),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Horizontal swaying animation (left and right)
    // Use a different duration to create natural movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.xOffset, {
          toValue: random(15, 25),
          duration: random(2500, 3500),
          useNativeDriver: true,
        }),
        Animated.timing(particle.xOffset, {
          toValue: -random(15, 25),
          duration: random(2500, 3500),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Function to start the pulsing opacity animation
  const startPulsingAnimation = (particle: (typeof particles.current)[0]) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.opacity, {
          toValue: random(0.6, 0.9),
          duration: random(1800, 2500),
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: random(0.4, 0.7),
          duration: random(1800, 2500),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.current.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              opacity: Animated.multiply(particle.fadeIn, particle.opacity),
              transform: [
                // Position the particle at its initial coordinates plus the animated offset
                {
                  translateX: Animated.add(particle.initialX, particle.xOffset),
                },
                {
                  translateY: Animated.add(particle.initialY, particle.yOffset),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  particle: {
    position: "absolute",
    borderRadius: 100,
  },
});

export default Particles;
