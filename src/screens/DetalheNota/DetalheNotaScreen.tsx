import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Share } from 'react-native';
import { NotesContext } from '../../presentation/context/NotesContext';
import { ThemeContext } from '../../presentation/context/ThemeContext';
import { useFont } from '../../presentation/context/FontContext';
import { useTranslation } from 'react-i18next'; 
import styles from './styles';
import * as Clipboard from 'expo-clipboard';

export default function DetalheNota({ route, navigation }) {
  const { id } = route.params;
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const { fontSize, fontFamily } = useFont();
  const { t } = useTranslation(); 

  const theme = {
    bg: darkMode ? '#121212' : '#f8f8f8',
    text: darkMode ? '#e0e0e0' : '#333',
  };

  const note = notes.find((n) => String(n.idBloco) === String(id));

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.text }}>{t("noteNotFound")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← {t("backToHome")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { texto, cor = '#FFD966', categoria, createdAt } = note;


  async function copyToClipboard(text: string) {
    await Clipboard.setStringAsync(text);
    Alert.alert(t("copied"), t("copiedToClipboard"));
  }

  async function shareNote(text: string) {
    try {
      await Share.share({ message: text });
    } catch (error) {
      Alert.alert(t("error"), t("shareError"));
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={[styles.backBtnText, { color: theme.text }]}>← {t("back")}</Text>
      </TouchableOpacity>

      <View style={[styles.noteCard, { backgroundColor: cor }]}>
        {categoria && <Text style={styles.noteCategory}>{categoria}</Text>}
        <Text style={[styles.noteTitle, { color: cor === '#000000' ? '#fff' : '#121212' }]}>{texto || t("noTitle")}</Text>
        {createdAt && <Text style={[styles.noteDate, { color: cor === '#000000' ? '#ccc' : '#666' }]}>{t("addedOn")}: {createdAt}</Text>}
        <Text style={[styles.noteContent, { fontSize, fontFamily, color: cor === '#000000' ? '#fff' : '#333' }]}>
          {texto || t("noContent")}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => copyToClipboard(note.texto)} style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>{t("copy")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareNote(note.texto)} style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>{t("share")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
