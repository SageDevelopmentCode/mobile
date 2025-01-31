import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { styles } from "./FriendsScreen.styles";

export default function FriendsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth(); // Access authenticated user

  console.log("current user in feed:", user);

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Friends</Text>
    </View>
  );
}
