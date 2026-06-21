import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "./styles";
import api from "../../data/api";
import { AuthContext } from "../../presentation/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login: authLogin } = useContext(AuthContext);

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "O campo de e-mail é obrigatório.");
      return false;
    }
    if (!email.includes("@")) {
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
     const resp = await api.post("/usuarios/login", { login: email, senha });

console.log("Resposta do backend:", resp.data);


      const token = resp.data.token;
      const idUsuario = resp.data.idUsuario;

      if (!token || !idUsuario) {
        Alert.alert("Erro", "Token ou ID não retornados pelo servidor.");
        return;
      }

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", String(idUsuario));

      await authLogin(token, String(idUsuario), resp.data);
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Não foi possível realizar o login.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>📝Anotaí</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
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
