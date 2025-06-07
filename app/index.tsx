import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/(authed)/(tabs)/(home)" />;
  }

  return <Redirect href="/onboard/auth/login" />;
}
