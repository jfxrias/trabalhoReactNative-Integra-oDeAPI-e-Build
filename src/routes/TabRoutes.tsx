import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import MinhasNotasScreen from "../screens/MinhasNotas/MinhasNotas";
import ConfiguracoesScreen from "../screens/Configuracoes/ConfiguracoesScreen";
import LoginScreen from "../screens/Login/LoginScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notas" component={MinhasNotasScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}
