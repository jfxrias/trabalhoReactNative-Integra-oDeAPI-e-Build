import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "./TabRoutes";
import DetalheNotaScreen from "../screens/DetalheNota/DetalheNotaScreen";
// Importa o contexto
import { ThemeContext } from "../presentation/context/ThemeContext";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        },
        headerTintColor: darkMode ? "#FFFFFF" : "#121212",
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DetalheNota" 
        component={DetalheNotaScreen} 
        options={{ title: "Detalhes da Nota" }} 
      />
    </Stack.Navigator>
  );
}