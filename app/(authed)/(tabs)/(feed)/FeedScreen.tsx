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

  const checkUserInStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("auth_user"); // Replace "user" with the key you're using
      if (user) {
        console.log("User found in AsyncStorage:", JSON.parse(user));
        return JSON.parse(user); // Convert the string back to an object if needed
      } else {
        console.log("No user found in AsyncStorage.");
        return null;
      }
    } catch (error) {
      console.log("Error checking AsyncStorage for user:", error);
      return null;
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
      <TouchableOpacity style={styles.button} onPress={checkUserInStorage}>
        <Text>Check if User is in AsyncStorage</Text>
      </TouchableOpacity>
    </View>
  );
}
