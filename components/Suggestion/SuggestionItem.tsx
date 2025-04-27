import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { styles } from "./SuggestionItem.styles";
import { Heading, StatText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";

interface SuggestionItemProps {
  emoji?: string;
  title?: string;
  style?: any;
  verse?: string;
  energyCount?: number;
  onPress: () => void;
}

export const SuggestionItem = ({
  onPress,
  emoji,
  title,
  style,
  verse,
  energyCount = 1,
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
      {energyCount > 0 && (
        <View style={energyStyles.energyContainer}>
          <FontAwesome6
            name="bolt"
            size={14}
            color={colors.EnergyColor}
            style={energyStyles.energyIcon}
          />
          <StatText color={colors.EnergyColor}>{energyCount}</StatText>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Add styles for the energy count display
const energyStyles = StyleSheet.create({
  energyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 204, 0, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  energyIcon: {
    marginRight: 4,
  },
});
