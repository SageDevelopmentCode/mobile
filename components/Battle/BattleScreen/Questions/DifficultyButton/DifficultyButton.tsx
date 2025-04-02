import {
  ButtonText,
  Heading,
  SubHeading,
} from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Modal, TouchableOpacity, View } from "react-native";
import { styles } from "./DifficultyButton.styles";

type DifficultyButtonProps = {
  backgroundColor: string;
  buttonDropShadow: string;
  title: string;
  onPress: () => void;
};

export const DifficultyButton = ({
  backgroundColor,
  title,
  onPress,
  buttonDropShadow,
}: DifficultyButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.difficultyButton,
        { backgroundColor: backgroundColor, shadowColor: buttonDropShadow },
      ]}
      onPress={onPress}
    >
      <Heading color={colors.PrimaryWhite}>{title}</Heading>
    </TouchableOpacity>
  );
};
