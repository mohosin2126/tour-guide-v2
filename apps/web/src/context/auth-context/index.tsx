import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, AuthResult, RegisterInput, User } from "@/types";
import Cookies from "js-cookie";
import api from "@/hooks/auth/use-api";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        Cookies.remove("token");
        Cookies.remove("user");
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData: RegisterInput): Promise<AuthResult> => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token: newToken, user: newUser } = response.data;

      Cookies.set("token", newToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(newUser), { expires: 1 });

      setToken(newToken);
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      return {
        success: false,
        error: err.response?.data?.error || "Registration failed",
      };
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken, user: newUser } = response.data;

      Cookies.set("token", newToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(newUser), { expires: 1 });

      setToken(newToken);
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      return {
        success: false,
        error: err.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser), { expires: 1 });
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isGuide: user?.role === "guide",
    isUser: user?.role === "user",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
