import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import {
  setupDeepLinkListeners,
  handleIncomingLink,
} from "@/utils/linking/linkingConfig";

/**
 * Custom hook to handle deep linking in the app
 */
export function useDeepLinking() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set up deep link listeners
    const cleanup = setupDeepLinkListeners(navigation);

    // Cleanup function
    return cleanup;
  }, [navigation]);

  // Return utility functions for manual link handling
  return {
    handleLink: (url: string) => handleIncomingLink(url, navigation),
    createLink: (path: string, params?: Record<string, any>) =>
      Linking.createURL(path, params),
  };
}
