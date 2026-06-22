import React, { useContext } from "react";
import { AuthContext } from "../presentation/context/AuthContext";
import { ThemeContext } from "../presentation/context/ThemeContext"; 
import StackRoutes from "./StackRoutes";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createNativeStackNavigator();

const lightColors = { background: '#FFFFFF', card: '#F5F5F5', text: '#121212' };
const darkColors = { background: '#121212', card: '#1E1E1E', text: '#FFFFFF' };

export default function PrivateRoutes() {
  const { userToken } = useContext(AuthContext);
  
  const { darkMode } = useContext(ThemeContext);

  const customLightTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, ...lightColors }
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: { ...DarkTheme.colors, ...darkColors }
  };

  return (
    <NavigationContainer theme={darkMode ? customDarkTheme : customLightTheme}>
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