import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Octicons } from "@/utils/icons";
import React from "react";
import { View } from "react-native";
import { styles } from "./HeroBar.styles";

type HeroBarProps = {
  onSwitchPress?: () => void;
  characterName: string;
};

export const HeroBar = ({ onSwitchPress, characterName }: HeroBarProps) => {
  // Default handler if none provided
  const handleSwitchPress =
    onSwitchPress || (() => console.log("Switch pressed but disabled"));

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
          onPress={handleSwitchPress}
          icon={<Octicons name="arrow-switch" size={20} />}
          disabled={!onSwitchPress}
          style={{ opacity: onSwitchPress ? 1 : 0.5 }}
        />
      </View>
    </View>
  );
};
