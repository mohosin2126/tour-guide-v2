import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { ThemeContextType } from "@/types";

type Mode = "light" | "dark";

const ThemeContext = createContext<ThemeContextType | null>(null);

const getInitialMode = (): Mode => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("mode");
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  const changeTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeContext;
