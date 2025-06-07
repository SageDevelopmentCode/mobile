import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { styles } from "./DailyChest.styles";
import { MaterialIcons } from "@/utils/icons";
import colors from "@/constants/colors";
import ChestOpenBackground from "@/assets/images/backgrounds/ChestOpen.jpg";
import { Title } from "@/components/Text/TextComponents";

export default function DailyChestScreen() {
  const navigation = useNavigation();

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
        <View
          style={{ width: "100%", alignItems: "flex-start", marginBottom: 40 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              color={colors.DarkPrimaryText}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Title color={colors.DarkPrimaryText}>Daily Chest</Title>
        </View>
      </View>
      <ImageBackground
        resizeMode="cover"
        source={ChestOpenBackground}
        style={styles.imageBackground}
      />
    </View>
  );
}
