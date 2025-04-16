import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Redirect, Slot, useSegments, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { CharacterProvider } from "@/lib/context/CharacterContext";

// This component handles authentication routing after the layout is mounted
function AuthHandler() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Skip this effect on first render to avoid immediate navigation
    if (isLoading) return;

    const inAuthGroup = segments[0] === "onboard";

    // If not authenticated and not already on an auth screen
    if (!session && !inAuthGroup) {
      router.replace("/onboard/auth/login");
    }
    // If authenticated but on an auth screen
    else if (session && inAuthGroup) {
      router.replace("/");
    }
  }, [session, segments, isLoading]);

  // Show a loading indicator while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Always render the Slot to ensure the layout is mounted before navigation
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CharacterProvider>
        <StatusBar style="dark" />
        <AuthHandler />
      </CharacterProvider>
    </AuthProvider>
  );
}
