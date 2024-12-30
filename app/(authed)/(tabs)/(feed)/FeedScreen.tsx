import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Auth } from "aws-amplify";
import { useAuth } from "@/context/AuthContext";
import { styles } from "./FeedScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FeedScreen() {
  const navigation = useNavigation();
  const { user } = useAuth(); // Access authenticated user

  console.log("current user in feed:", user);

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  async function handleSignOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const logAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      items.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } catch (error) {
      console.log("Error reading AsyncStorage:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Feed</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboard/auth/login")}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboard/auth/register")}
      >
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logAsyncStorage}>
        <Text>Log AsyncStorage</Text>
      </TouchableOpacity>
    </View>
  );
}
