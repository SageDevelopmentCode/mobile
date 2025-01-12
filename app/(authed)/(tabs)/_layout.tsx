import colors from "@/constants/colors";
import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@/utils/icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute", // Makes the tab bar float
          backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent background
          borderTopWidth: 0, // Removes the default border
          elevation: 0, // Removes shadow on Android
          borderRadius: 15,
          height: 70, // Adjust height to give space
          marginHorizontal: 20, // Adds padding on the sides
          bottom: 35, // Floats the tab bar higher from the bottom
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
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(play)"
        options={{
          headerShown: false,
          title: "Fight",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="play" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(feed)"
        options={{
          headerShown: false,
          title: "For You",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(read)"
        options={{
          headerShown: false,
          title: "Bible",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bible" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
