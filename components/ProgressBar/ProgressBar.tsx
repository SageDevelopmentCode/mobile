import React from "react";
import { Image, View } from "react-native";
import { SubHeading } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { getStyles } from "./ProgressBar.styles";

interface ProgressBarProps {
  progress: number; // Progress as a percentage (0-100)
  height?: number; // Optional height for customization
  backgroundColor?: string; // Optional background color
  progressColor?: string; // Optional progress color
  imageSrc?: any;
  leftText?: string;
  rightText?: string;
  activeCharacter: string;
}

function ProgressBar(props: ProgressBarProps) {
  const {
    progress,
    height = 30,
    backgroundColor,
    progressColor,
    imageSrc,
    leftText,
    rightText,
    activeCharacter,
  } = props;

  const styles = getStyles(activeCharacter);

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
        <SubHeading color={colors.PrimaryGrayDropShadow}>{leftText}</SubHeading>
        <SubHeading color={colors.PrimaryGrayDropShadow}>
          {rightText}
        </SubHeading>
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
