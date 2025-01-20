import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { styles } from "./SuggestionItem.styles";
import { Heading } from "../Text/TextComponents";
import colors from "@/constants/colors";

interface SuggestionItemProps {
  emoji?: string;
  title?: string;
  onPress: () => void;
}

export const SuggestionItem = ({
  onPress,
  emoji,
  title,
}: SuggestionItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.goalContainer}>
      <View style={styles.goalLeftContainer}>
        <View style={styles.goalEmoji}>
          <Heading>{emoji}</Heading>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Heading color={colors.DarkSecondaryText}>{title}</Heading>
        </View>
      </View>
    </TouchableOpacity>
  );
};
