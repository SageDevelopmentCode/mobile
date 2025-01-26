import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "@/constants/colors";
import { styles } from "./IdeaButton.styles";
import {
  ButtonText,
  Heading,
  SubHeading,
} from "@/components/Text/TextComponents";

type IdeaButtonProps = {
  emoji: string;
  title: string;
  onPress: () => void;
};

export const IdeaButton = ({ emoji, title, onPress }: IdeaButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.ideaContainer}>
      <Heading color={colors.IdeasPrimaryColor}>{emoji}</Heading>
      <Heading style={{ marginLeft: 15 }} color={colors.IdeasPrimaryColor}>
        {title}
      </Heading>
    </TouchableOpacity>
  );
};
