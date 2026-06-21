import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  userToken: string | null;
  userId: string | null;
  user: any;
  login: (token: string, userId: string, userData?: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  setUser: (userData: any) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("userId");
        const userData = await AsyncStorage.getItem("user");

        if (token) setUserToken(token);
        if (id) setUserId(id);
        if (userData) setUser(JSON.parse(userData));
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (token: string, id: string, userData?: any) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", id);
    setUserToken(token);
    setUserId(id);
    if (userData) {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "userId", "user"]);
    setUserToken(null);
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userId, user, login, logout, loading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
