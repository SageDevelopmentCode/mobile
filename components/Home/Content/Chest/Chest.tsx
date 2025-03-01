import { StatText, SubHeading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { capitalizeFirstLetter } from "@/utils/format/capitalizeFirstLetter";
import CommonChest from "../../../../assets/images/chests/CommonChest.png";
import RareChest from "../../../../assets/images/chests/RareChest.png";
import { getStyles } from "./Chest.styles";

type ChestProps = {
  onPress: () => void;
  type: "Daily" | "Weekly" | "Monthly";
  timeRemaining: string;
  activeCharacter: string;
};

export const Chest = ({
  onPress,
  type,
  timeRemaining,
  activeCharacter,
}: ChestProps) => {
  const styles = getStyles(activeCharacter);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.chestContainer]}>
      <View
        style={[
          styles.chest,
          type === "Weekly" ? { borderColor: colors.PrimaryBlue } : {},
        ]}
      >
        <Image
          source={type === "Weekly" ? RareChest : CommonChest}
          style={styles.chestImage}
          resizeMode="contain"
        />
      </View>
      <View>
        <SubHeading color={colors.PrimaryWhite}>
          {capitalizeFirstLetter(type)} Chest
        </SubHeading>
        <StatText color={colors.PrimaryGrayDropShadow}>
          {timeRemaining}
        </StatText>
      </View>
    </TouchableOpacity>
  );
};
