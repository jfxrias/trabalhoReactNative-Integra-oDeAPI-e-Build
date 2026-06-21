import React, { createContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
