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
  ImageBackground,
  Image,
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
  const [character1Opacity] = useState(new Animated.Value(0));
  const [character2Opacity] = useState(new Animated.Value(0));
  const [character3Opacity] = useState(new Animated.Value(0));
  const [character4Opacity] = useState(new Animated.Value(0));
  const { isLoading } = useCharacterContext();
  const [minDisplayTime, setMinDisplayTime] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { width, height } = Dimensions.get("window");

  // Character images
  const characterImages = [
    require("@/assets/images/characters/Deborah.png"),
    require("@/assets/images/characters/Gabriel.png"),
    require("@/assets/images/characters/Ruth.png"),
    require("@/assets/images/characters/Samson.png"),
  ];

  const characterOpacities = [
    character1Opacity,
    character2Opacity,
    character3Opacity,
    character4Opacity,
  ];

  useEffect(() => {
    // Fade in main content
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

    // Progressive character loading simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 25;
        if (newProgress <= 100) {
          // Show character based on progress
          const characterIndex = Math.floor(newProgress / 25) - 1;
          if (characterIndex >= 0 && characterIndex < 4) {
            Animated.timing(characterOpacities[characterIndex], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }
          return newProgress;
        } else {
          clearInterval(progressInterval);
          return 100;
        }
      });
    }, 600); // Character appears every 600ms

    // Minimum display time
    const timer = setTimeout(() => {
      setMinDisplayTime(true);
    }, 3000); // Slightly longer to show all characters

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Only finish when both conditions are met
    if (minDisplayTime && !isLoading && loadingProgress >= 100) {
      // Start smooth zoom-in transition effect
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.8,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundScaleAnim, {
          toValue: 1.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }
  }, [minDisplayTime, isLoading, loadingProgress]);

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ scale: backgroundScaleAnim }],
      }}
    >
      <ImageBackground
        source={require("@/assets/images/backgrounds/ZoneOneBattle.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* Character loading section */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingHorizontal: 10,
              marginTop: height * 0.1,
              marginBottom: height * 0.15,
              gap: 5, // Small gap between characters
            }}
          >
            {characterImages.map((image, index) => (
              <Animated.Image
                key={index}
                source={image}
                style={{
                  width: width * 0.22, // Smaller to fit all 4
                  height: width * 0.28, // Smaller to fit all 4
                  opacity: characterOpacities[index],
                }}
                resizeMode="contain"
              />
            ))}
          </View>

          {/* Logo at bottom */}
          <View
            style={{
              position: "absolute",
              bottom: height * 0.08,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/backgrounds/Logo.png")}
              style={{
                width: width * 0.85, // Maximum size logo
                height: width * 0.25, // Maximum size logo
              }}
              resizeMode="contain"
            />
            {/* Small progress indicator */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 8,
              }}
            >
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      loadingProgress > index * 25
                        ? "#ffffff"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
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
