import { Redirect } from "expo-router";

export default function AuthedIndex() {
  return <Redirect href="/(authed)/(tabs)/(home)" />;
}
