import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFont } from "../../presentation/context/FontContext";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../presentation/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../data/api"; 
import styles from "./styles";

export default function Configuracoes() {
  const [idioma, setIdioma] = useState("pt");
  const [mensagem, setMensagem] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [login, setLogin] = useState("");
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useFont();
  const { t, i18n } = useTranslation();

  const { userId, user, setUser, logout } = useContext(AuthContext);

  const alterarSenha = async () => {
    try {
      const resp = await api.post(`/configuracoes/alterar-senha/${userId}`, {
        senhaNova,
      });
      setMensagem(resp.data.mensagem);
    } catch {
      setMensagem(t("errorChangePassword"));
    }
  };

  const atualizarPerfil = async () => {
    try {
      const resp = await api.put(`/configuracoes/perfil/${userId}`, { login });
      setMensagem(resp.data.mensagem);

     
      setUser({
        ...user,
        login: resp.data.login,
        token: resp.data.token,
      });
      await AsyncStorage.setItem("token", resp.data.token);
    } catch {
      setMensagem(t("errorUpdateProfile"));
    }
  };

  const mudarIdioma = async (novoIdioma: string) => {
    setIdioma(novoIdioma);
    i18n.changeLanguage(novoIdioma);
    try {
      const resp = await api.put(`/configuracoes/idioma/${userId}`, {
        idioma: novoIdioma,
      });
      setMensagem(resp.data.mensagem);

      setUser({
        ...user,
        idioma: resp.data.idioma,
      });
    } catch {
      setMensagem(t("errorChangeLanguage"));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("settings")}</Text>
      {mensagem ? <Text style={styles.feedback}>{mensagem}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔑 {t("account")}</Text>
        <TextInput
          secureTextEntry
          placeholder={t("newPassword")}
          value={senhaNova}
          onChangeText={setSenhaNova}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={alterarSenha}>
          <Text style={styles.buttonText}>{t("changePassword")}</Text>
        </TouchableOpacity>

        <TextInput
          placeholder={t("login")}
          value={login}
          onChangeText={setLogin}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={atualizarPerfil}>
          <Text style={styles.buttonText}>{t("updateProfile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 {t("language")}</Text>
        <Picker
          selectedValue={idioma}
          style={styles.input}
          onValueChange={(value) => mudarIdioma(value)}
        >
          <Picker.Item label="Português" value="pt" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Español" value="es" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔠 {t("fontPreferences")}</Text>
        <Text style={styles.label}>{t("fontSize")}</Text>
        <TextInput
          keyboardType="numeric"
          value={String(fontSize)}
          onChangeText={(val) => {
            const num = parseInt(val, 10);
            if (!isNaN(num)) {
              setFontSize(num);
            } else {
              setFontSize(0);
            }
          }}
          style={styles.input}
        />

        <Text style={styles.label}>{t("fontType")}</Text>
        <Picker
          selectedValue={fontFamily}
          style={styles.input}
          onValueChange={(value) => setFontFamily(value)}
        >
          <Picker.Item label="Arial" value="Arial" />
          <Picker.Item label="Verdana" value="Verdana" />
          <Picker.Item label="Times New Roman" value="Times New Roman" />
          <Picker.Item label="Courier New" value="Courier New" />
          <Picker.Item label="Georgia" value="Georgia" />
          <Picker.Item label="Tahoma" value="Tahoma" />
          <Picker.Item label="Trebuchet MS" value="Trebuchet MS" />
          <Picker.Item label="Impact" value="Impact" />
          <Picker.Item label="Comic Sans MS" value="Comic Sans MS" />
          <Picker.Item label="Lucida Console" value="Lucida Console" />
          <Picker.Item label="Palatino Linotype" value="Palatino Linotype" />
          <Picker.Item label="Segoe UI" value="Segoe UI" />
          <Picker.Item label="Helvetica" value="Helvetica" />
        </Picker>
        <Text style={[styles.preview, { fontSize, fontFamily }]}>
          {t("previewText", { size: fontSize, font: fontFamily })}
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>{t("logout")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
