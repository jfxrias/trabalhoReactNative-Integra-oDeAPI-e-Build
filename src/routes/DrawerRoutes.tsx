import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import MinhasNotasScreen from "../screens/MinhasNotas/MinhasNotas";
import ConfiguracoesScreen from "../screens/Configuracoes/ConfiguracoesScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notas" component={MinhasNotasScreen} />
      <Drawer.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Drawer.Navigator>
  );
}
