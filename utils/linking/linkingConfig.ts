import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { parseVerseUrl } from "../sharing/verseSharing";

// Create a custom linking configuration for deep links
export const linkingConfig: LinkingOptions<any> = {
  prefixes: [
    "myapp://", // Custom scheme for deep links
    "https://yourbibleapp.com", // Replace with your actual domain
    "https://www.yourbibleapp.com", // Replace with your actual domain
  ],
  config: {
    screens: {
      // Handle authentication screens
      index: "",
      onboard: {
        screens: {
          auth: "auth",
          "auth/login": "auth/login",
        },
      },

      // Handle authenticated screens
      "(authed)": {
        screens: {
          // Handle verse sharing links
          "(tabs)": {
            screens: {
              "(read)": {
                screens: {
                  "[bookName]": {
                    screens: {
                      reading: {
                        // Handle: myapp://verse/Genesis/1/1 or https://yourbibleapp.com/verse/Genesis/1/1
                        path: "verse/:bookName/:chapter/:verse",
                        parse: {
                          bookName: (bookName: string) =>
                            decodeURIComponent(bookName),
                          chapter: (chapter: string) => parseInt(chapter, 10),
                          verse: (verse: string) => parseInt(verse, 10),
                        },
                        stringify: {
                          bookName: (bookName: string) =>
                            encodeURIComponent(bookName),
                          chapter: (chapter: number) => chapter.toString(),
                          verse: (verse: number) => verse.toString(),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * Handles incoming deep links and navigates to the appropriate screen
 */
export async function handleIncomingLink(url: string, navigation: any) {
  try {
    console.log("Handling incoming link:", url);

    // Parse the verse URL
    const verseReference = parseVerseUrl(url);

    if (verseReference) {
      console.log("Parsed verse reference:", verseReference);

      // Navigate to the reading screen with the parsed parameters
      navigation.navigate("(authed)", {
        screen: "(tabs)",
        params: {
          screen: "(read)",
          params: {
            screen: "[bookName]",
            params: {
              screen: "reading",
              params: {
                bookName: verseReference.bookName,
                chapter: verseReference.chapter.toString(),
                verse: verseReference.verse.toString(),
                translation: verseReference.translation,
              },
            },
          },
        },
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error handling incoming link:", error);
    return false;
  }
}

/**
 * Sets up deep link listeners for the app
 */
export function setupDeepLinkListeners(navigation: any) {
  // Handle the initial URL if the app was opened via a link
  const handleInitialURL = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log("App opened with initial URL:", initialUrl);
        // Add a small delay to ensure navigation is ready
        setTimeout(() => {
          handleIncomingLink(initialUrl, navigation);
        }, 1000);
      }
    } catch (error) {
      console.error("Error getting initial URL:", error);
    }
  };

  // Handle URLs when the app is already running
  const handleUrl = (event: { url: string }) => {
    console.log("App received URL while running:", event.url);
    handleIncomingLink(event.url, navigation);
  };

  // Set up listeners
  handleInitialURL();
  const subscription = Linking.addEventListener("url", handleUrl);

  // Return cleanup function
  return () => {
    subscription?.remove?.();
  };
}

/**
 * Validates if a URL can be handled by this app
 */
export function canHandleURL(url: string): boolean {
  try {
    const verseReference = parseVerseUrl(url);
    return verseReference !== null;
  } catch {
    return false;
  }
}

/**
 * Creates a custom URL scheme link for sharing
 */
export function createAppLink(
  path: string,
  params?: Record<string, any>
): string {
  return Linking.createURL(path, params);
}
