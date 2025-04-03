import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@/utils/icons";

type AttackEffectProps = {
  position: { x: number; y: number };
  size?: number;
  color?: string;
  onAnimationComplete?: () => void;
};

export const AttackEffect = ({
  position,
  size = 80,
  color = colors.PrimaryPurpleBackground || "#7B4CFF",
  onAnimationComplete,
}: AttackEffectProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // Fade in and out
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          delay: 100,
        }),
      ]),
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Rotate
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [fadeAnim, scaleAnim, rotateAnim, onAnimationComplete]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: position.x - size / 2,
          top: position.y - size / 2,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { rotate }],
          width: size,
          height: size,
        },
      ]}
    >
      <FontAwesome6 name="star" size={size * 0.8} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});
