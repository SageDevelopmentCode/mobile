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
  style?: any;
  verse?: string;
  onPress: () => void;
}

export const SuggestionItem = ({
  onPress,
  emoji,
  title,
  style,
  verse,
}: SuggestionItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.goalContainer, style]}>
      <View style={styles.goalLeftContainer}>
        <View style={styles.goalEmoji}>
          <Heading>{emoji}</Heading>
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Heading
            color={colors.DarkSecondaryText}
            style={{ flexWrap: "wrap", flexShrink: 1 }}
            numberOfLines={2}
          >
            {title}
          </Heading>
        </View>
      </View>
    </TouchableOpacity>
  );
};
