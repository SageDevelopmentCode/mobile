import { Heading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./ActionButton.styles";

type ActionButtonProps = {
  backgroundColor: string;
  buttonDropShadow: string;
  title: string;
  onPress: () => void;
  textAlign?: "center" | "left" | "right";
  emoji?: string;
};

export const ActionButton = ({
  backgroundColor,
  title,
  onPress,
  buttonDropShadow,
  textAlign = "center",
  emoji,
}: ActionButtonProps) => {
  const getJustifyContent = () => {
    switch (textAlign) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
      default:
        return "center";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.difficultyButton,
        {
          backgroundColor: backgroundColor,
          shadowColor: buttonDropShadow,
          justifyContent: getJustifyContent(),
        },
      ]}
      onPress={onPress}
    >
      {emoji && <Text style={{ fontSize: 20, marginRight: 14 }}>{emoji}</Text>}
      <Heading color={colors.PrimaryWhite}>{title}</Heading>
    </TouchableOpacity>
  );
};
