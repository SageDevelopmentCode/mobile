import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { supabase } from "@/lib/supabase/supabase";
import {
  getUserCharacters,
  getUserActiveCharacterForWeek,
} from "@/lib/supabase/db/user_characters";
import { getUserById } from "@/lib/supabase/db/user";
import { User } from "@/types/User";

// Keys for secure storage
const USER_DATA_KEY = "userData";
const USER_ID_KEY = "userId";

type CharacterContextType = {
  activeCharacterData: any;
  setActiveCharacterData: (data: any) => void;
  userCharacters: any[];
  setUserCharacters: (characters: any[]) => void;
  activeCharacter: string;
  setActiveCharacter: (name: string) => void;
  isLoading: boolean;
  userData: User | null;
  setUserData: (data: User | null) => void;
  refreshUserData: () => Promise<void>;
};

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
}

type CharacterProviderProps = {
  children: ReactNode;
};

export function CharacterProvider({ children }: CharacterProviderProps) {
  const [activeCharacterData, setActiveCharacterData] = useState<any>(null);
  const [userCharacters, setUserCharacters] = useState<any[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<string>("Deborah");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Function to refresh user data
  const refreshUserData = async () => {
    if (userId) {
      try {
        const data = await getUserById(userId);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Context: Error refreshing user data:", error);
      }
    }
  };

  // Load character data on context initialization
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // First try to get data from secure storage
        const storedUserData = await SecureStore.getItemAsync(USER_DATA_KEY);
        const storedUserId = await SecureStore.getItemAsync(USER_ID_KEY);

        let currentUserId = null;

        if (storedUserData && storedUserId) {
          // If we have stored data, use it
          const userData = JSON.parse(storedUserData);
          console.log("Context: Using locally stored user data");
          console.log("Context: User ID from storage:", storedUserId);

          currentUserId = storedUserId;
        } else {
          // If not, fetch from Supabase
          console.log("Context: No stored user data, fetching from Supabase");
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            console.log("Context: Fetched user from Supabase");
            const userId = user.id;
            console.log("Context: User ID:", userId);

            // Store the data for future use
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
            await SecureStore.setItemAsync(USER_ID_KEY, userId);

            currentUserId = userId;
          }
        }

        // Set the userId in state
        setUserId(currentUserId);

        // Fetch user data from the users table
        if (currentUserId) {
          try {
            const user = await getUserById(currentUserId);
            if (user) {
              setUserData(user);
            } else {
              console.log("Context: No user data found for ID:", currentUserId);
            }
          } catch (error) {
            console.error("Context: Error fetching user data:", error);
          }

          // Fetch user's active character for the week if we have a userId
          try {
            const activeCharacter = await getUserActiveCharacterForWeek(
              currentUserId
            );

            console.log("Context: Active character:", activeCharacter);
            console.log(
              "Context: Active character mood:",
              activeCharacter?.user_character_mood
            );

            if (activeCharacter && activeCharacter.character?.name) {
              console.log(
                "Context: Setting active character to:",
                activeCharacter.character.name
              );
              setActiveCharacter(activeCharacter.character.name);
              setActiveCharacterData(activeCharacter);
            } else {
              console.log("Context: No active character found for this week");
              // Fallback: fetch all characters and use the first one
              try {
                const characters = await getUserCharacters(currentUserId);
                setUserCharacters(characters || []);

                if (
                  characters &&
                  characters.length > 0 &&
                  characters[0].character?.name
                ) {
                  const firstCharacter = characters[0];
                  console.log(
                    "Context: Fallback - Setting active character to:",
                    firstCharacter.character.name
                  );
                  setActiveCharacter(firstCharacter.character.name);
                  setActiveCharacterData(firstCharacter);
                }
              } catch (fallbackError) {
                console.error(
                  "Context: Error fetching fallback characters:",
                  fallbackError
                );
              }
            }
          } catch (error) {
            console.error(
              "Context: Error fetching active character for week:",
              error
            );
          }
        }
      } catch (error) {
        console.error("Context: Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const value = {
    activeCharacterData,
    setActiveCharacterData,
    userCharacters,
    setUserCharacters,
    activeCharacter,
    setActiveCharacter,
    isLoading,
    userData,
    setUserData,
    refreshUserData,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}
