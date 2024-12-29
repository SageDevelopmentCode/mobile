// import { AuthenticationProvider, useAuth } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AWS_APP_CLIENT_ID, AWS_REGION, AWS_USER_POOL_ID } from "@/env-vars";
import { Amplify, Auth } from "aws-amplify";
// import awsconfig from "./aws-exports";

export default function RootLayout() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: AWS_APP_CLIENT_ID,
        userPoolId: AWS_USER_POOL_ID,
      },
    },
  });

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
