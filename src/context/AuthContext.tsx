// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";
  

type user = {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
};
const u = {
  user: null,
  login: async () => {
    return Promise<void>
  },
  logout: async () => {return {}},
  isLoggedIn: false,
};

const AuthContext = createContext<user | null>(u);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) console.log("yesslogged");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(isLoggedIn)
      if(!currentUser) console.log("hhe")
      setIsLoggedIn(true);
      console.log(isLoggedIn)
    });
    return () => unsubscribe();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoggedIn(true)
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    setIsLoggedIn(false);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn,setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
