import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./StatsHeader.styles";
import { Ionicons } from "@/utils/icons";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { StatText } from "@/components/Text/TextComponents";
import XPGem from "../../../app/(authed)/(tabs)/(home)/assets/XPGem.png";
import ShardGem from "../../../app/(authed)/(tabs)/(home)/assets/ShardGem.png";
import Star from "../../../app/(authed)/(tabs)/(home)/assets/Star.png";
import Goal from "../../../app/(authed)/(tabs)/(home)/assets/Goal.png";

type StatsHeaderProps = {
  userGems: string;
  userShards: string;
  userStars: string;
};

export const StatsHeader = ({
  userGems,
  userShards,
  userStars,
}: StatsHeaderProps) => {
  return (
    <View style={styles.statsHeader}>
      <TouchableOpacity onPress={() => console.log("Menu icon pressed")}>
        <Ionicons name="menu" size={30} color={colors.PrimaryWhite} />
      </TouchableOpacity>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Image source={XPGem} style={styles.statImage} resizeMode="contain" />
          <StatText>{userGems}</StatText>
        </View>
        <View style={styles.statBox}>
          <Image
            source={ShardGem}
            style={styles.statImage}
            resizeMode="contain"
          />
          <StatText>{userShards}</StatText>
        </View>
        <View style={styles.statBox}>
          <Image source={Star} style={styles.statImage} resizeMode="contain" />
          <StatText>{userStars}</StatText>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push(
            "/(authed)/(tabs)/(home)/goal/ideas/IdeasCategoriesScreen"
          )
        }
      >
        <Image source={Goal} style={styles.goalImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
