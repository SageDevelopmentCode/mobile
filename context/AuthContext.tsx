import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";
import { useRouter } from "expo-router";

interface AuthUser {
  username: string;
  attributes: {
    email: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        // Check AsyncStorage for cached user
        const cachedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (cachedUser) {
          console.log("User data was in cache");
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);

          // Optionally, verify token validity
          const isSessionValid = await Auth.currentSession()
            .then(() => true)
            .catch(() => false);

          if (!isSessionValid) {
            await clearUserCache();
            router.replace("/onboard/auth/login");
            return;
          }
        } else {
          // Fallback to AWS Auth check
          const currentUser = await Auth.currentAuthenticatedUser();
          const userData: AuthUser = {
            username: currentUser.username,
            attributes: currentUser.attributes,
          };
          setUser(userData);

          // Cache the user
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        }
      } catch (err) {
        console.log("Error during auth initialization:", err);
        router.replace("/onboard/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      await clearUserCache();
      router.replace("/onboard/auth/login");
    } catch (err) {
      console.log("Error signing out:", err);
    }
  };

  const clearUserCache = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.log("Error clearing user cache:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
