import React from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Ensure you have this library installed
import colors from "@/constants/colors";
import { router } from "expo-router";
import { styles } from "./IdeaButton.styles";
import { ButtonText, Heading } from "@/components/Text/TextComponents";

type IdeaButtonProps = {
  emoji?: string;
  title?: string;
  onPress: () => void;
};

export const IdeaButton = ({ emoji, title, onPress }: IdeaButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(authed)/(tabs)/(home)/goal/create/[id]",
          params: { id: "12135" },
        })
      }
      style={styles.ideaContainer}
    >
      <ButtonText>{emoji}</ButtonText>
      <ButtonText>{emoji}</ButtonText>
    </TouchableOpacity>
  );
};
