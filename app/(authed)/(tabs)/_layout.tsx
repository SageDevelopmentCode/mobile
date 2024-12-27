import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(dashboard)"
        options={{
          headerShown: false,
          title: "Flush",
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
