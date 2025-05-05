import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { GoalReflectionScreen } from "@/components/Goal/GoalReflectionScreen";
import { getUserGoals } from "@/lib/supabase/db/user_goals";
import { useCharacterContext } from "@/lib/context/CharacterContext";

// Create a wrapper component that handles the refresh functionality
export default function GoalReflectionRoute() {
  const router = useRouter();
  const { userData } = useCharacterContext();

  // Function to refresh goals that we'll pass to our component
  // This mirrors the HomeContent refreshGoals implementation
  const handleRefreshGoals = useCallback(async () => {
    if (!userData || !userData.id) {
      console.log("Cannot refresh goals: missing required data");
      return;
    }

    try {
      console.log("Refreshing goals from reflection screen");
      // Fetch new goals - even though we don't use the result here,
      // this will update the cache that HomeScreen uses
      await getUserGoals(userData.id);

      // Navigate back to trigger UI update
      router.back();
    } catch (error) {
      console.error("Error refreshing goals:", error);
    }
  }, [userData, router]);

  return <GoalReflectionScreen onRefreshGoals={handleRefreshGoals} />;
}
