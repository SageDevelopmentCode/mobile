import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import colors from "@/constants/colors";

interface BuffStatBarProps {
  name: string;
  baseValue: number;
  buffedValue: number;
  color: string;
  maxValue: number;
}

export const BuffStatBar = ({
  name,
  baseValue,
  buffedValue,
  color,
  maxValue,
}: BuffStatBarProps) => {
  const baseAnim = useRef(new Animated.Value(0)).current;
  const buffAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate base stat first
    Animated.timing(baseAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      // Then animate buff after base stat is done
      Animated.timing(buffAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const basePercentage = (baseValue / maxValue) * 100;
  const buffedPercentage = ((buffedValue - baseValue) / maxValue) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.baseBar,
            {
              width: baseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", `${basePercentage}%`],
              }),
              backgroundColor: color,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.buffBar,
            {
              width: buffAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", `${buffedPercentage}%`],
              }),
              backgroundColor: `${color}80`, // 50% opacity
            },
          ]}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.value, { color }]}>
          {baseValue} → {buffedValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginHorizontal: 8,
  },
  barContainer: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    flexDirection: "row",
  },
  baseBar: {
    height: "100%",
  },
  buffBar: {
    height: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  name: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "600",
  },
  value: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
