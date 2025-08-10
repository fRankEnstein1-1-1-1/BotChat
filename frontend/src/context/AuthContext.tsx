import { createContext, useEffect, useState, useContext } from "react";
import type { ReactNode } from "react";
import { AuthUser, loginUser, Logout, signupUser } from "../components/apihelpers";
import toast from "react-hot-toast";
// User type
type User = {
  email: string;
  name: string;
};

// Context type
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

// 1. Create context
const AuthContext = createContext<UserAuth | null>(null);

// 2. Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false); // fix type

  useEffect(() => {
    // logic to load auth state from localStorage or similar
    async function Checkstatus() {
      const data = await AuthUser();
      if(data){
         setUser({email:data.email,name:data.email});
      setLoggedIn(true)
      }
    }
    Checkstatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email,password)
    if(data)
    {
      setUser({email:data.email,name:data.email});
      setLoggedIn(true)
    }
  };

  const logout = async () => {
  try {
    const res = await Logout();
    if (res?.message === "Logout successful") {
      setLoggedIn(false);
      setUser(null);
      toast.success("Logged out successfully!");
      window.location.href = "/login"; // redirect after logout
    }
  } catch (error) {
    toast.error("Logout failed");
    console.error(error);
  }
};


  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name,email,password)
    if(data)
    {
      setUser({email:data.email,name:data.email});
      setLoggedIn(true)
    }
  };

  const value: UserAuth = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook
export const useAuth = () => useContext(AuthContext);
