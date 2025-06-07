import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./StatsHeader.styles";
import { Ionicons } from "@/utils/icons";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { StatText } from "@/components/Text/TextComponents";
import XPGem from "../../../app/(authed)/(tabs)/(home)/assets/XPGem.png";
import ShardGem from "../../../app/(authed)/(tabs)/(home)/assets/ShardGem.png";
import Goal from "../../../app/(authed)/(tabs)/(home)/assets/Goal.png";
import Denarii from "../../../app/(authed)/(tabs)/(home)/assets/Denarii.png";
import Manna from "../../../app/(authed)/(tabs)/(home)/assets/Manna.png";

type StatsHeaderProps = {
  userManna: string;
  userDenarii: string;
  characterImageSource: any;
};

export const StatsHeader = ({
  userManna,
  userDenarii,
  characterImageSource,
}: StatsHeaderProps) => {
  return (
    <View style={styles.statsHeader}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => console.log("Menu icon pressed")}>
          <Ionicons name="menu" size={30} color={colors.PrimaryWhite} />
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Image
              source={Denarii}
              style={styles.statImage}
              resizeMode="contain"
            />
            <StatText>{userDenarii}</StatText>
          </View>
          <View style={styles.statBox}>
            <Image
              source={Manna}
              style={styles.statImage}
              resizeMode="contain"
            />
            <StatText>{userManna}</StatText>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push(
              "/(authed)/(tabs)/(home)/goal/ideas/IdeasCategoriesScreen"
            )
          }
        >
          <Image source={Goal} style={styles.goalImage} resizeMode="contain" />
        </TouchableOpacity>
        {characterImageSource && (
          <TouchableOpacity
            onPress={() => console.log("Character avatar pressed")}
            style={styles.characterAvatarContainer}
          >
            <Image
              source={characterImageSource}
              style={styles.characterAvatar}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
