import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "shopsphere";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "shopsphere" ? "shopsphere-dark" : "shopsphere"
    );
  };

  const themeInfo = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "shopsphere-dark",
  };

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  );
};
