import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@/utils/icons";
import { SubHeading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { styles } from "./ToggleMenuButton.styles";

type ToggleMenuButtonProps = {
  label: string;
  onPress: () => void;
};

export default function ToggleMenuButton({
  label,
  onPress,
}: ToggleMenuButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.actionContainer}>
        <SubHeading color={colors.PrimaryWhite}>{label}</SubHeading>
        <FontAwesome6 name="pencil" size={20} color={colors.PrimaryWhite} />
      </View>
    </TouchableOpacity>
  );
}
