import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router"; //
import { Animated, TouchableOpacity, View } from "react-native";
import colors from "@/constants/colors";
import { MaterialIcons } from "@/utils/icons";
import { styles } from "./goal_create.styles";

export default function CreateGoalScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          position: "absolute", // Makes the tab bar float
          backgroundColor: "rgba(30, 31, 51, 0.98)", // Semi-transparent background
          borderTopWidth: 0, // Removes the default border
          elevation: 0, // Removes shadow on Android
          borderRadius: 15,
          height: 70, // Adjust height to give space
          marginHorizontal: 20, // Adds padding on the sides
          bottom: 30, // Floats the tab bar higher from the bottom
          paddingVertical: 10, // Adds vertical padding to center content
          alignItems: "center",
          justifyContent: "center", // Ensures content is centered vertically
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          marginBottom: 3, // Ensures icons are vertically aligned
          marginTop: 7,
        },
        tabBarActiveTintColor: colors.PrimaryPurpleBackground,
        tabBarInactiveTintColor: "#6c757d",
      });
  }, [navigation]);

  const { id } = useLocalSearchParams();

  console.log("id: ", id);
  return (
    <>
      <View style={styles.container}>
        <View style={{ width: "100%", alignItems: "flex-start" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              color={colors.PrimaryWhite}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
