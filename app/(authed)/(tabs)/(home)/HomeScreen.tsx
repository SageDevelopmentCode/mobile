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
        ></ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <Text>Hello World</Text>
      </View>
    </View>
  );
}
