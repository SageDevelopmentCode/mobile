import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { user } = useAuth(); // Access authenticated user

  console.log("current user in authed layout:", user);

  if (!user) {
    return <Redirect href="/onboard/auth/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
