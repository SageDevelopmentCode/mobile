import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./HomeScreen.styles";
import Background from "./assets/BackgroundOne.jpg"; // Updated import path
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import SquareActionButton from "@/components/Buttons/SquareActionButtons/SquareActionButtons";
import { Octicons } from "@/utils/icons";

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
                  icon={<Octicons name="arrow-switch" size={20} />}
                />
                <SquareActionButton
                  onPress={() => console.log("Icon Button Pressed")}
                  title="✅"
                />
                <SquareActionButton
                  onPress={() => console.log("Icon Button Pressed")}
                  icon={<Octicons name="arrow-switch" size={20} />}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <Text>Hello World</Text>
      </View>
    </View>
  );
}
