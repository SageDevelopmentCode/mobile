import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Redirect, Slot, useSegments, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import {
  CharacterProvider,
  useCharacterContext,
} from "@/lib/context/CharacterContext";

// Splash Screen Content Component (needs to be inside CharacterProvider)
function SplashScreenContent({ onFinish }: { onFinish: () => void }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [backgroundScaleAnim] = useState(new Animated.Value(1));
  const [loadingOpacity] = useState(new Animated.Value(0));
  const { isLoading } = useCharacterContext();
  const [minDisplayTime, setMinDisplayTime] = useState(false);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    // Fade in and scale up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Show loading indicator after 1 second
    setTimeout(() => {
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1000);

    // Minimum display time of 2.5 seconds
    const timer = setTimeout(() => {
      setMinDisplayTime(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only finish when both conditions are met:
    // 1. Minimum display time has passed
    // 2. Data loading is complete
    if (minDisplayTime && !isLoading) {
      // Start smooth zoom-in transition effect
      Animated.parallel([
        // Fade out the content smoothly
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600, // Slightly faster for cleaner feel
          useNativeDriver: true,
        }),
        // Subtle scale up for elegant zoom effect
        Animated.timing(scaleAnim, {
          toValue: 1.8, // More subtle 1.8x scale for cleaner look
          duration: 600,
          useNativeDriver: true,
        }),
        // Gentle background scale for smooth depth effect
        Animated.timing(backgroundScaleAnim, {
          toValue: 1.3, // Very subtle background scale
          duration: 600,
          useNativeDriver: true,
        }),
        // Fade out loading indicator
        Animated.timing(loadingOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Finish after animation completes
        onFinish();
      });
    }
  }, [minDisplayTime, isLoading]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scale: backgroundScaleAnim }],
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 42,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontSize: 54,
            fontWeight: "bold",
            color: "#4ade80",
            textAlign: "center",
            letterSpacing: 3,
            marginBottom: 40,
          }}
        >
          SAGE
        </Text>

        {/* Loading indicator */}
        <Animated.View
          style={{
            opacity: loadingOpacity,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#4ade80" />
          <Text
            style={{
              fontSize: 16,
              color: "#ffffff",
              marginTop: 12,
              opacity: 0.8,
            }}
          >
            Loading your data...
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

// Splash Screen Component (will use existing CharacterProvider)
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return <SplashScreenContent onFinish={onFinish} />;
}

// This component handles authentication routing after the layout is mounted
function AuthHandler() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Handle navigation immediately when authenticated
    if (isLoading) return;

    const inAuthGroup = segments[0] === "onboard";

    // If not authenticated and not already on an auth screen
    if (!session && !inAuthGroup) {
      router.replace("/onboard/auth/login");
    }
    // If authenticated but on an auth screen, navigate to home tab specifically
    else if (session && inAuthGroup) {
      router.replace("/(authed)/(tabs)/(home)");
    }
    // If authenticated and we're not in the right place, navigate immediately
    else if (session && segments[0] !== "(authed)") {
      router.replace("/(authed)/(tabs)/(home)");
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

  return (
    <View style={{ flex: 1 }}>
      {/* Render the app content */}
      <Slot />

      {/* Overlay the splash screen on top */}
      {showSplash && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </View>
      )}
    </View>
  );
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
