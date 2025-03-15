import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import colors from "@/constants/colors";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Heading } from "@/components/Text/TextComponents";

export default function BattleScreen() {
  const navigation = useNavigation();

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const parentNavigation = navigation.getParent();

    parentNavigation?.setOptions({
      ...tabBarOptions, // Restore default tabBarOptions
      tabBarStyle: {
        ...tabBarOptions.tabBarStyle,
        backgroundColor: colors.GabrielGoalBackground,
      },
      tabBarActiveTintColor: colors.PrimaryWhite,
      tabBarInactiveTintColor: "#C1C1C1",
    });
  }, [navigation]);

  return (
    <View>
      <Heading>Battle Screen</Heading>
    </View>
  );
}
