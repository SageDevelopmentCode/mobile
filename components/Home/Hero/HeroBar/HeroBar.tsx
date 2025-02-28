import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Octicons } from "@/utils/icons";
import React from "react";
import { View } from "react-native";
import { styles } from "./HeroBar.styles";

type HeroBarProps = {
  onSwitchPress: () => void;
  characterName: string;
};

export const HeroBar = ({ onSwitchPress, characterName }: HeroBarProps) => {
  return (
    <View style={styles.heroBar}>
      <Title color={colors.PrimaryWhite}>{characterName}</Title>
      <View style={styles.actions}>
        <SquareActionButton
          onPress={() => console.log("Icon Button Pressed")}
          title="✅"
        />
        <SquareActionButton
          onPress={() => console.log("Icon Button Pressed")}
          title="🌱"
        />
        <SquareActionButton
          onPress={onSwitchPress}
          icon={<Octicons name="arrow-switch" size={20} />}
        />
      </View>
    </View>
  );
};
