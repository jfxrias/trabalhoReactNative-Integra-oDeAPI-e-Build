import React, { useContext } from "react";
import { AuthContext } from "../presentation/context/AuthContext";
import StackRoutes from "./StackRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createNativeStackNavigator();

export default function PrivateRoutes() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken ? (
        <StackRoutes />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
