import React from "react";
import { View } from "react-native";
import { styles } from "./StatsHeader.styles";

type StatsHeaderProps = {
  newGoal: boolean;
  emoji?: string;
  title?: string;
  description?: string;
  onPress: () => void;
  onIconPress: () => void;
};

export const StatsHeader = ({}: StatsHeaderProps) => {
  return <View></View>;
};
