import { StatText, SubHeading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./Chest.styles";
import { capitalizeFirstLetter } from "@/utils/format/capitalizeFirstLetter";
import CommonChest from "../../../../assets/images/chests/CommonChest.png";
import RareChest from "../../../../assets/images/chests/RareChest.png";
import UncommonChest from "../../../../assets/images/chests/UncommonChest.png";

type ChestProps = {
  onPress: () => void;
  type: "Daily" | "Weekly" | "Monthly";
  timeRemaining: string;
};

export const Chest = ({ onPress, type, timeRemaining }: ChestProps) => {
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
        <StatText color={colors.GrayText}>{timeRemaining}</StatText>
      </View>
    </TouchableOpacity>
  );
};
