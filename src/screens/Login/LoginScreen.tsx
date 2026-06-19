import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "./styles";
import api from "../../data/api";
import { AuthContext } from "../../presentation/context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { login: authLogin } = useContext(AuthContext);

  const validateInputs = () => {
    if (!login.trim()) {
      Alert.alert("Erro", "O campo de e-mail é obrigatório.");
      return false;
    }
    if (!login.includes("@")) {
      Alert.alert("Erro", "Digite um e-mail válido (precisa conter @).");
      return false;
    }
    if (!senha.trim()) {
      Alert.alert("Erro", "A senha é obrigatória.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const resp = await api.post("/usuarios/login", { login, senha });
      await authLogin(resp.data.token);
      navigation.replace("Home");
    } catch (err) {
      console.log("Erro ao logar", err);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>📝 Meu Bloco de Notas</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
