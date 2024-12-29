// import { AuthenticationProvider, useAuth } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AWS_APP_CLIENT_ID, AWS_REGION, AWS_USER_POOL_ID } from "@/env-vars";
import { Amplify, Auth } from "aws-amplify";
import amplifyconfig from "../src/amplifyconfiguration.json";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider

export default function RootLayout() {
  Amplify.configure(amplifyconfig);

  return (
    <>
      <AuthProvider>
        <StatusBar style="dark" />
        <Slot />
      </AuthProvider>
    </>
  );
}
