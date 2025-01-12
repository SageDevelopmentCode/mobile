import React, { useEffect } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { useNavigation, useRouter } from "expo-router";

import { Octicons } from "@/utils/icons";
import colors from "@/constants/colors";

import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import Deborah from "./assets/Deborah.png";
import { Heading, Title } from "@/components/Text/TextComponents";
import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";

import { styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const navigation = useNavigation();

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
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
                  onPress={() => console.log("Icon Button Pressed")}
                  icon={<Octicons name="arrow-switch" size={20} />}
                />
              </View>
            </View>
            <Image
              source={Deborah}
              style={styles.characterImage}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <Heading color={colors.PrimaryWhite}>Hello World</Heading>
      </View>
    </View>
  );
}
