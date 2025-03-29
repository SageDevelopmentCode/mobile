import React from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import Auth from "./auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { session } = useAuth();

  // If user is already logged in, redirect to the home page
  if (session) {
    return <Redirect href="/(authed)/(tabs)/(home)/HomeScreen" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Auth />
    </View>
  );
}
