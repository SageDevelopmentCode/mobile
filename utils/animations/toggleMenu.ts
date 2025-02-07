import { Animated } from "react-native";

const toggleMenu = (
  menuVisible: boolean,
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
  slideAnim: Animated.Value
) => {
  if (menuVisible) {
    // Close menu
    Animated.timing(slideAnim, {
      toValue: 800, // Move off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false)); // Set visibility to false after animation
  } else {
    setMenuVisible(true); // Set visibility to true before animation
    Animated.timing(slideAnim, {
      toValue: 0, // Bring into view
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
};

export default toggleMenu;
