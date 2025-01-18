import { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";

const defaultTabBarStyle = {
  position: "absolute", // Makes the tab bar float
  backgroundColor: "rgba(30, 31, 51, 0.98)", // Semi-transparent background
  borderTopWidth: 0, // Removes the default border
  elevation: 0, // Removes shadow on Android
  borderRadius: 15,
  height: 70, // Adjust height to give space
  marginHorizontal: 20, // Adds padding on the sides
  bottom: 30, // Floats the tab bar higher from the bottom
  paddingVertical: 10, // Adds vertical padding to center content
  alignItems: "center",
  justifyContent: "center", // Ensures content is centered vertically
};

interface ConfigureNavigationOptions {
  headerShown?: boolean;
  tabBarHidden?: boolean;
  tabBarStyle?: Record<string, unknown>;
}

export const useConfigureNavigation = (
  navigation: NavigationProp<any>, // Replace `any` with your specific navigation type
  options: ConfigureNavigationOptions = {}
) => {
  useEffect(() => {
    const {
      headerShown = false,
      tabBarHidden = true,
      tabBarStyle = {},
    } = options;

    // Set header options
    navigation.setOptions({
      headerShown,
    });

    // Set parent tab bar options
    const parent = navigation.getParent();
    if (tabBarHidden) {
      parent?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
    } else {
      parent?.setOptions({
        tabBarStyle: {
          ...defaultTabBarStyle,
          ...tabBarStyle, // Allow overriding styles
        },
      });
    }

    // Restore tab bar on unmount
    return () => {
      parent?.setOptions({
        tabBarStyle: defaultTabBarStyle,
      });
    };
  }, [navigation, options]);
};
