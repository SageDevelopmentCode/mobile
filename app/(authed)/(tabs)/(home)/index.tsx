import { default as HomeScreen } from "./HomeScreen";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreenWithRefresh() {
  // Use a key to force re-render of HomeScreen when needed
  const [refreshKey, setRefreshKey] = useState(0);

  // This will trigger a re-render when the screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      // Screen is now focused, increment the key to force refresh
      setRefreshKey((prev) => prev + 1);
      return () => {
        // Cleanup when screen loses focus
      };
    }, [])
  );

  // Pass the key to HomeScreen to force a full remount when it changes
  return <HomeScreen key={refreshKey} />;
}
