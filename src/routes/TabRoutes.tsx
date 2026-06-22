import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import MinhasNotasScreen from "../screens/MinhasNotas/MinhasNotas";
import ConfiguracoesScreen from "../screens/Configuracoes/ConfiguracoesScreen";
// Importa o contexto
import { ThemeContext } from "../presentation/context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          borderTopColor: darkMode ? "#333333" : "#E0E0E0",
        },
        tabBarActiveTintColor: "#0A84FF",
        tabBarInactiveTintColor: darkMode ? "#8E8E93" : "#8E8E93",
        headerStyle: {
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        },
        headerTintColor: darkMode ? "#FFFFFF" : "#121212",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notas" component={MinhasNotasScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}