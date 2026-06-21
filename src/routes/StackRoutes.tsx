import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "./TabRoutes";
import DetalheNotaScreen from "../screens/DetalheNota/DetalheNotaScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Main"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
 
      <Stack.Screen name="DetalheNota" component={DetalheNotaScreen} />
    </Stack.Navigator>
  );
}
