import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./FeedScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutButton from "@/components/Buttons/Auth/logout";

export default function FeedScreen() {
  const navigation = useNavigation();

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Feed</Text>
      <LogoutButton />
    </View>
  );
}
