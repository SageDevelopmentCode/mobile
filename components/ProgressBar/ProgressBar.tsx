import React from "react";
import { View } from "react-native";
import { styles } from "./ProgressBar.styles";

interface ProgressBarProps {
  progress: number; // Progress as a percentage (0-100)
  height?: number; // Optional height for customization
  backgroundColor?: string; // Optional background color
  progressColor?: string; // Optional progress color
}

function ProgressBar(props: ProgressBarProps) {
  const {
    progress,
    height = 30,
    backgroundColor = "#38B38E",
    progressColor = "#AFE3EF",
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
    </View>
  );
}

export default ProgressBar;
