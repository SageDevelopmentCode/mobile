import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";

export default function FeedScreen() {
  const navigation = useNavigation();

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
      <Text>Hello Feed</Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
