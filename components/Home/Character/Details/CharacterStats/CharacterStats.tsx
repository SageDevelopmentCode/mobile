import React, { useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import colors from "@/constants/colors";
import { StatBar } from "./StatBar";
import { Title } from "@/components/Text/TextComponents";
import { UserCharacterProps, UserCharacterStats } from "@/types/UserCharacter";

interface StatData {
  name: string;
  value: number;
  color: string;
  maxValue: number;
}

export const CharacterStats = ({
  attack,
  defense,
  special_attack,
  special_defense,
  speed,
  hit_points,
}: UserCharacterStats) => {
  // Animation values for bars appearing
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Start animations when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Mock data for character stats with maxValue of 1,000
  const stats: StatData[] = [
    { name: "HP", value: hit_points, color: "#FFD699", maxValue: 1000 },
    { name: "Attack", value: attack, color: "#BF8EFF", maxValue: 1000 },
    { name: "Defense", value: defense, color: "#7DD1F8", maxValue: 1000 },
    {
      name: "Special\nAttack",
      value: special_attack,
      color: "#80F9B7",
      maxValue: 1000,
    },
    {
      name: "Special\nDefense",
      value: special_defense,
      color: "#FF9D9D",
      maxValue: 1000,
    },
    { name: "Speed", value: speed, color: "#FFEB99", maxValue: 1000 },
  ];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scaleY: scaleAnim }],
        },
      ]}
    >
      <Title color={colors.PrimaryWhite} style={styles.title}>
        Stats
      </Title>
      <View style={styles.statsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
          scrollEventThrottle={16}
        >
          <View style={styles.barsRow}>
            {stats.map((stat, index) => (
              <StatBar
                key={index}
                name={stat.name}
                value={stat.value}
                color={stat.color}
                maxValue={stat.maxValue}
                index={index}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 290,
    width: "100%",
  },
  title: {
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 16,
  },
  statsWrapper: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {},
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 230,
  },
});
