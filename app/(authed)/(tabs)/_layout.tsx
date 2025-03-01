import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@/utils/icons";
import { tabBarOptions } from "@/constants/tabBarOptions";

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabBarOptions}>
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
          title: "Battle",
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
        name="(friends)"
        options={{
          headerShown: false,
          title: "Friends",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
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
