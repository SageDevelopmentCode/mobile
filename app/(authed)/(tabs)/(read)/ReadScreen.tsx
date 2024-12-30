import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./ReadScreen.styles";
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";

export default function ReadScreen() {
  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.version}>
          <Title color={colors.DarkPrimaryText}>Bible</Title>
        </View>
      </View>
    </View>
  );
}
