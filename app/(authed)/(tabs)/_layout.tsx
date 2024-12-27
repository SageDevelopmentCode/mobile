import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(dashboard)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(play)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(feed)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(read)"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
