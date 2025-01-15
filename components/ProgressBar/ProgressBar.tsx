import React from "react";
import { Image, View } from "react-native";
import { styles } from "./ProgressBar.styles";
import { SubHeading } from "../Text/TextComponents";
import colors from "@/constants/colors";

interface ProgressBarProps {
  progress: number; // Progress as a percentage (0-100)
  height?: number; // Optional height for customization
  backgroundColor?: string; // Optional background color
  progressColor?: string; // Optional progress color
  imageSrc?: any;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    progress,
    height = 30,
    backgroundColor = "#38B38E",
    progressColor = "#AFE3EF",
    imageSrc,
  } = props;

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { height, backgroundColor }]}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>
      <View style={styles.textContainer}>
        <SubHeading color={colors.PrimaryGrayDropShadow}>
          0 energy today
        </SubHeading>
        <SubHeading color={colors.PrimaryGrayDropShadow}>Goal: 20</SubHeading>
      </View>
      <View style={styles.circleResult}>
        <Image
          source={imageSrc}
          style={styles.circleImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default ProgressBar;
