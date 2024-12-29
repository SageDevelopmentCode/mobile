import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "expo-router";

// Define types for the user and context
interface AuthUser {
  username: string;
  attributes: {
    email: string;
    [key: string]: any; // Handle additional attributes
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

// Context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser({
          username: currentUser.username,
          attributes: currentUser.attributes,
        });
        console.log("current user:", user);
      } catch (err) {
        console.log("No user is logged in:", err);
        router.replace("/onboard/auth/login"); // Redirect to login if not authenticated
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      router.replace("/onboard/auth/login");
    } catch (err) {
      console.log("Error signing out:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
