import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Share } from 'react-native';
import { NotesContext } from '../../presentation/context/NotesContext';
import { ThemeContext } from '../../presentation/context/ThemeContext';
import { useFont } from '../../presentation/context/FontContext';
import { useTranslation } from 'react-i18next'; 
import styles from './styles';
import * as Clipboard from 'expo-clipboard';

export default function DetalheNota({ route, navigation }) {
  const { id } = route?.params || {};
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const { fontSize, fontFamily } = useFont();
  const { t } = useTranslation(); 

  const theme = {
    bg: darkMode ? '#121212' : '#f8f8f8',
    text: darkMode ? '#e0e0e0' : '#333333',
    primary: darkMode ? '#3b82f6' : '#6200ee',
    cardBorder: darkMode ? '#333333' : '#dddddd',
  };

  const note = id ? notes.find((n) => String(n.idBloco) === String(id)) : null;

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.text }}>
          {t("noteNotFound") || "Nota não encontrada"}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backBtnText, { color: theme.text }]}>
            ← {t("back") || "Voltar"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { texto, cor, categoria, createdAt } = note;
  const backgroundColor = cor && cor !== '[NULL]' ? cor : (darkMode ? '#1e1e1e' : '#ffffff');
  const isDarkBackground = backgroundColor === '#000000' || backgroundColor === '#1e1e1e';
  const textColor = isDarkBackground ? '#ffffff' : '#121212';
  const subTextColor = isDarkBackground ? '#cccccc' : '#666666';

  async function copyToClipboard(text) {
    await Clipboard.setStringAsync(text);
    Alert.alert(t("copied") || "Copiado", t("copiedToClipboard") || "Texto copiado para a área de transferência!");
  }

  async function shareNote(text) {
    try {
      await Share.share({ message: text });
    } catch (error) {
      Alert.alert(t("error") || "Erro", t("shareError") || "Erro ao compartilhar.");
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={[styles.backBtnText, { color: theme.text }]}>
          ← {t("back") || "Voltar"}
        </Text>
      </TouchableOpacity>

      <View style={[styles.noteCard, { backgroundColor, borderColor: theme.cardBorder }]}>
        {categoria && <Text style={[styles.noteCategory, { color: subTextColor }]}>{categoria}</Text>}
        
        <Text style={[styles.noteTitle, { color: textColor }]}>
          {texto || t("noTitle") || "Sem Título"}
        </Text>
        
        {createdAt && (
          <Text style={[styles.noteDate, { color: subTextColor }]}>
            {t("addedOn") || "Adicionado em"}: {createdAt}
          </Text>
        )}
        
        <Text style={[styles.noteContent, { fontSize, fontFamily, color: textColor, marginTop: 10 }]}>
          {texto || t("noContent") || "Sem conteúdo"}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={() => copyToClipboard(texto || "")} 
          style={[styles.shareBtn, { backgroundColor: theme.primary, marginRight: 20 }]}
        >
          <Text style={styles.shareBtnText}>{t("copy") || "Copiar"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => shareNote(texto || "")} 
          style={[styles.shareBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.shareBtnText}>{t("share") || "Compartilhar"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
