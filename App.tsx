import React from "react";
import { AuthProvider } from "./src/presentation/context/AuthContext";
import PrivateRoutes from "./src/routes/PrivateRoutes";

export default function App() {
  return (
    <AuthProvider>
      <PrivateRoutes />
    </AuthProvider>
  );
}
