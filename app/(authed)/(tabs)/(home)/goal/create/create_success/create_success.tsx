import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { useSearchParams } from "expo-router/build/hooks";
import { FontAwesome6 } from "@/utils/icons";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import colors from "@/constants/colors";
import { styles } from "./create_success.styles";
import Background from "../../assets/Background.jpg";
import Deborah from "../../../assets/Deborah.png";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal = searchParams.get("goal");
  const emoji = searchParams.get("emoji");

  console.log("goal", goal);
  console.log("emoji", emoji);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ActionButton
          type="PrimaryGray"
          title="Done"
          onPress={() =>
            router.push({
              pathname: "/(authed)/(tabs)/(home)/HomeScreen",
              params: {
                goal: goal,
                emoji: emoji,
              },
            })
          }
          icon={
            <FontAwesome6
              name="check"
              size={20}
              color={colors.DarkPrimaryText}
            />
          }
        />
      </View>
      <ImageBackground
        source={Background}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Image source={Deborah} style={styles.character} resizeMode="contain" />
      </ImageBackground>
    </View>
  );
}
