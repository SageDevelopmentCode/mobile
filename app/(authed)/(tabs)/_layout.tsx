import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="(play)"
        options={{
          headerShown: false,
          title: "Play",
        }}
      />
      <Tabs.Screen
        name="(feed)"
        options={{
          headerShown: false,
          title: "For You",
        }}
      />
      <Tabs.Screen
        name="(read)"
        options={{
          headerShown: false,
          title: "Read",
        }}
      />
    </Tabs>
  );
}
