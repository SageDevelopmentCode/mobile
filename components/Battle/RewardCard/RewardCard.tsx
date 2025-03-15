import { Heading, SubHeading, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import { Image, View } from "react-native";
import { styles } from "./RewardCard.styles";

type RewardCardProps = {
  quantity: number;
  rewardSrc: any;
};

export const RewardCard = ({ quantity, rewardSrc }: RewardCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={rewardSrc}
        style={styles.chestImage}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <SubHeading color={colors.ZoneOneBattleButtonBackground}>
          {quantity}x
        </SubHeading>
      </View>
    </View>
  );
};
