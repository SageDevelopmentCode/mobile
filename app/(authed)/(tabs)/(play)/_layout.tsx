import { Stack } from "expo-router";

export default function PlayLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Play" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="battle/BattleScreen.tsx" />
    </Stack>
  );
}
