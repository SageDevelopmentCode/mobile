import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import colors from "@/constants/colors";

interface StatBarProps {
  name: string;
  value: number;
  color: string;
  maxValue: number;
  index?: number;
}

export const StatBar = ({
  name,
  value,
  color,
  maxValue,
  index = 0,
}: StatBarProps) => {
  // Calculate fill height percentage
  const fillPercentage = (value / maxValue) * 100;

  // Animation value for filling the bar
  const fillAnim = useRef(new Animated.Value(0)).current;

  // Start animation when component mounts, with a staggered delay based on index
  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: 1,
      duration: 1000,
      delay: index * 120, // Staggered animation
      useNativeDriver: false,
    }).start();
  }, [index]);

  // Interpolate fill animation to gradually increase height from bottom
  const animatedHeight = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", `${fillPercentage}%`],
  });

  return (
    <View style={styles.statColumn}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: color,
              height: animatedHeight,
            },
          ]}
        />
      </View>
      <Text style={styles.statName}>{name}</Text>
      <View style={styles.statValueContainer}>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statColumn: {
    alignItems: "center",
    marginHorizontal: 15,
    width: 40,
    height: 230, // Increased overall height to accommodate taller bars
    justifyContent: "flex-start",
  },
  barContainer: {
    height: 150, // Increased height from 120px to 150px
    width: 30,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    position: "relative", // For absolute positioning of the fill
  },
  barFill: {
    width: "100%",
    borderRadius: 5,
    position: "absolute", // Position at the bottom
    bottom: 0,
    left: 0,
  },
  statName: {
    color: colors.PrimaryWhite,
    marginTop: 12,
    fontSize: 11,
    textAlign: "center",
    width: 50,
    height: 30, // Fixed height for multi-line names
  },
  statValueContainer: {
    backgroundColor: colors.PrimaryWhite,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    marginTop: 5,
    minWidth: 45,
    alignItems: "center",
  },
  statValue: {
    color: colors.DarkPrimaryText,
    fontWeight: "bold",
    fontSize: 12,
  },
});
