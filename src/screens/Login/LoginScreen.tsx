import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "./styles";
import api from "../../data/api";
import { AuthContext } from "../../presentation/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next"; 

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const { t } = useTranslation(); 

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert(t("error"), t("emailRequired"));
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert(t("error"), t("invalidEmail"));
      return false;
    }
    if (!senha.trim()) {
      Alert.alert(t("error"), t("passwordRequired"));
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
        Alert.alert(t("error"), t("missingTokenOrId"));
        return;
      }

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", String(idUsuario));

      await authLogin(token, String(idUsuario), resp.data);
    } catch (err: any) {
      Alert.alert(
        t("error"),
        err.response?.data?.message || t("loginFailed")
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>📝 Anotaí</Text>
      <Text style={styles.title}>{t("login")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t("senha")}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title={t("entrar")} onPress={handleLogin} />
    </View>
  );
}
