import { Heading, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import { View } from "react-native";
import { styles } from "./HeroBar.styles";

type HeroBarProps = {};

export const HeroBar = ({}: HeroBarProps) => {
  return (
    <View style={[{ width: "100%", paddingHorizontal: "5%" }]}>
      <View style={[styles.headingContainer]}>
        <View style={styles.line} />
        <Heading style={styles.headingText} color={colors.ZoneOneBattleText}>
          Zone 1
        </Heading>
        <View style={styles.line} />
      </View>
      <View style={styles.heroBar}>
        <Title color={colors.PrimaryWhite}>Garden of Eden</Title>
      </View>
    </View>
  );
};
