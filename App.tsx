import React from "react";
import { AuthProvider } from "./src/presentation/context/AuthContext";
import { NotesProvider } from "./src/presentation/context/NotesContext";
import { ThemeProvider } from "./src/presentation/context/ThemeContext";
import { FontProvider } from "./src/presentation/context/FontContext";
import PrivateRoutes from "./src/routes/PrivateRoutes";
import "./src/components/i18InglesPortuguesEspanhol";


export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <ThemeProvider>
          <FontProvider>
            <PrivateRoutes />
          </FontProvider>
        </ThemeProvider>
      </NotesProvider>
    </AuthProvider>
  );
}
