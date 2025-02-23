import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Octicons } from "@/utils/icons";
import React from "react";
import { View } from "react-native";
import { styles } from "./HeroBar.styles";

type HeroBarProps = {
  onSwitchPress: () => void;
};

export const HeroBar = ({ onSwitchPress }: HeroBarProps) => {
  return (
    <View style={styles.heroBar}>
      <Title color={colors.PrimaryWhite}>Deborah</Title>
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
