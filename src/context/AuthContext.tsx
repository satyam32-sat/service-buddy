import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { loginUser } from "../services/auth.service";
import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(
  null
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(
      "servicebuddy-user"
    );

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    const response = await loginUser({
      email,
      password,
    });

    const data: User = {
      _id: response.user._id,
      name: response.user.name,
      email: response.user.email,
      phone: response.user.phone,
      role: response.user.role,
      token: response.token,
    };

    localStorage.setItem(
      "servicebuddy-user",
      JSON.stringify(data)
    );

    setUser(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("servicebuddy-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};