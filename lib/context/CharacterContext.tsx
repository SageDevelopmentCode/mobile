import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { supabase } from "@/lib/supabase/supabase";
import { getUserCharacters } from "@/lib/supabase/db/user-characters";

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

        // Fetch user characters if we have a userId
        if (currentUserId) {
          try {
            const characters = await getUserCharacters(currentUserId);
            console.log("Context: User Characters:", characters);

            // Store the user characters in context
            setUserCharacters(characters || []);

            // If there's at least one character, set the active character to the first one's name
            if (
              characters &&
              characters.length > 0 &&
              characters[0].character?.name
            ) {
              // Set the active character to the first character's name
              const firstCharacter = characters[0];
              console.log(
                "Context: Setting active character to:",
                firstCharacter.character.name
              );
              setActiveCharacter(firstCharacter.character.name);

              // Also set the active character data
              setActiveCharacterData(firstCharacter);
            }
          } catch (error) {
            console.error("Context: Error fetching user characters:", error);
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
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}
