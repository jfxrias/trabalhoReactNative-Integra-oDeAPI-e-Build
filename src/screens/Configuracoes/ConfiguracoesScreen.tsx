import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFont } from "../../presentation/context/FontContext";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../presentation/context/AuthContext";
import { ThemeContext } from "../../presentation/context/ThemeContext"; 
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
  const { darkMode, setDarkMode } = useContext(ThemeContext); 

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

  // Cores dinâmicas expandidas para cobrir inputs e bordas
  const dynamicStyles = {
    container: { backgroundColor: darkMode ? "#121212" : "#FFFFFF" },
    text: { color: darkMode ? "#FFFFFF" : "#121212" },
    subText: { color: darkMode ? "#AAAAAA" : "#666666" },
    section: { backgroundColor: darkMode ? "#1E1E1E" : "#F5F5F5", padding: 15, borderRadius: 8, marginBottom: 15 },
    input: { backgroundColor: darkMode ? "#2D2D2D" : "#FFFFFF", color: darkMode ? "#FFFFFF" : "#121212", borderColor: darkMode ? "#444444" : "#CCCCCC" }
  };

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.text]}>{t("settings")}</Text>
      {mensagem ? <Text style={styles.feedback}>{mensagem}</Text> : null}

      {/* SEÇÃO: DARK MODE */}
      <View style={[styles.section, dynamicStyles.section, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
        <Text style={[styles.sectionTitle, dynamicStyles.text, { marginBottom: 0 }]}>🌓 Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
          trackColor={{ false: "#767577", true: "#0A84FF" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* SEÇÃO: CONTA */}
      <View style={[styles.section, dynamicStyles.section]}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>🔑 {t("account")}</Text>
        <TextInput
          secureTextEntry
          placeholder={t("newPassword")}
          placeholderTextColor={darkMode ? "#888" : "#999"}
          value={senhaNova}
          onChangeText={setSenhaNova}
          style={[styles.input, dynamicStyles.input]}
        />
        <TouchableOpacity style={styles.button} onPress={alterarSenha}>
          <Text style={styles.buttonText}>{t("changePassword")}</Text>
        </TouchableOpacity>

        <TextInput
          placeholder={t("login")}
          placeholderTextColor={darkMode ? "#888" : "#999"}
          value={login}
          onChangeText={setLogin}
          style={[styles.input, dynamicStyles.input]}
        />
        <TouchableOpacity style={styles.button} onPress={atualizarPerfil}>
          <Text style={styles.buttonText}>{t("updateProfile")}</Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO: IDIOMA */}
      <View style={[styles.section, dynamicStyles.section]}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>🌐 {t("language")}</Text>
        <Picker
          selectedValue={idioma}
          style={[styles.input, dynamicStyles.input]}
          dropdownIconColor={darkMode ? "#FFFFFF" : "#121212"}
          onValueChange={(value) => mudarIdioma(value)}
        >
          <Picker.Item label="Português" value="pt" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Español" value="es" />
        </Picker>
      </View>

      {/* SEÇÃO: PREFERÊNCIAS DE FONTE */}
      <View style={[styles.section, dynamicStyles.section]}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>🔠 {t("fontPreferences")}</Text>
        <Text style={[styles.label, dynamicStyles.subText]}>{t("fontSize")}</Text>
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
          style={[styles.input, dynamicStyles.input]}
        />

        <Text style={[styles.label, dynamicStyles.subText]}>{t("fontType")}</Text>
        <Picker
          selectedValue={fontFamily}
          style={[styles.input, dynamicStyles.input]}
          dropdownIconColor={darkMode ? "#FFFFFF" : "#121212"}
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
        <Text style={[styles.preview, dynamicStyles.text, { fontSize, fontFamily, marginTop: 10 }]}>
          {t("previewText", { size: fontSize, font: fontFamily })}
        </Text>
      </View>

      {/* SEÇÃO: LOGOUT */}
      <View style={[styles.section, dynamicStyles.section]}>
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