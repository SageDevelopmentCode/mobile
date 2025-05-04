import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Home" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="goal/create/[id]" />
      <Stack.Screen
        name="goal/reflection"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
