import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { useSearchParams } from "expo-router/build/hooks";
import { styles } from "./IdeasScreen.styles";
import { MaterialIcons } from "@/utils/icons";
import colors from "@/constants/colors";
import Background from "../assets/IdeasBackground.jpg";
import { Title } from "@/components/Text/TextComponents";
import { IdeaButton } from "@/components/Buttons/Idea/IdeaButton";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();

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
              color={colors.IdeasPrimaryColor}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Title color={colors.IdeasPrimaryColor}>Goal Ideas</Title>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
            </View>
            <View style={styles.buttonRow}>
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
            </View>
            <View style={styles.buttonRow}>
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
              <IdeaButton
                emoji="📖"
                title="Scripture"
                onPress={() => console.log("idea")}
              />
            </View>
          </View>
        </View>
      </View>
      <ImageBackground
        resizeMode="cover"
        source={Background}
        style={styles.imageBackground}
      ></ImageBackground>
    </View>
  );
}
