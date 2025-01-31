import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Feed" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
