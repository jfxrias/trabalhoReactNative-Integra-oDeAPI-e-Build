import React, { createContext, useState, useContext, ReactNode } from 'react';

type FontContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
};

const FontContext = createContext<FontContextType>({} as FontContextType);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');

  return (
    <FontContext.Provider value={{ fontSize, setFontSize, fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
