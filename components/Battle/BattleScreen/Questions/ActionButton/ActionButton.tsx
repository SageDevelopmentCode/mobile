import { Heading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./ActionButton.styles";

type ActionButtonProps = {
  backgroundColor: string;
  buttonDropShadow: string;
  title: string;
  onPress: () => void;
};

export const ActionButton = ({
  backgroundColor,
  title,
  onPress,
  buttonDropShadow,
}: ActionButtonProps) => {
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
