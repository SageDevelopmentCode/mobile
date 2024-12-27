import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Dashboard" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
