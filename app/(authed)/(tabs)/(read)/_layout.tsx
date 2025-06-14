import { Stack } from "expo-router";

export default function ReadLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Read" }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
