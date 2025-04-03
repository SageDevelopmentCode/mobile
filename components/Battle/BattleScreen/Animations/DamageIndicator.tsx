import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";

type DamageIndicatorProps = {
  damage: number;
  position: { x: number; y: number };
  isHeal?: boolean;
  onAnimationComplete?: () => void;
};

export const DamageIndicator = ({
  damage,
  position,
  isHeal = false,
  onAnimationComplete,
}: DamageIndicatorProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Move up
      Animated.timing(moveAnim, {
        toValue: -60,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Scale animation (pop in, then shrink)
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 850,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Call the completion callback if provided
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [fadeAnim, moveAnim, scaleAnim, onAnimationComplete]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: position.x,
          top: position.y,
          opacity: fadeAnim,
          transform: [{ translateY: moveAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <Text style={[styles.text, isHeal ? styles.healText : styles.damageText]}>
        {isHeal ? "+" : "-"}
        {Math.abs(damage)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  damageText: {
    color: colors.BattleTimer || "#ff4d4d",
  },
  healText: {
    color: colors.HealthBarGreen || "#4dff4d",
  },
});
