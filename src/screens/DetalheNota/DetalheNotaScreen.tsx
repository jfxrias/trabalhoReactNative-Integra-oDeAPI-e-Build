import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NotesContext } from '../../presentation/context/NotesContext';
import { ThemeContext } from '../..//presentation/context/ThemeContext';
import { useFont } from '../../presentation/context/FontContext';
import styles from './styles';

export default function DetalheNota({ route, navigation }) {
  const { id } = route.params;
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const { fontSize, fontFamily } = useFont();

  const theme = {
    bg: darkMode ? '#1a1a2e' : '#f8f8f8',
    text: darkMode ? '#e0e0e0' : '#333',
  };

  const note = notes.find((n) => String(n.idBloco) === String(id));

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.text }}>Nota não encontrada</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { texto, cor = '#FFD966', categoria, createdAt } = note;

  function copyToClipboard(text: string) {
    Alert.alert('Copiado', 'Conteúdo copiado para a área de transferência!');
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={[styles.noteCard, { backgroundColor: cor }]}>
        {categoria && <Text style={styles.noteCategory}>{categoria}</Text>}
        <Text style={styles.noteTitle}>{texto || '(sem título)'}</Text>
        {createdAt && <Text style={styles.noteDate}>Adicionado em: {createdAt}</Text>}
        <Text style={[styles.noteContent, { fontSize, fontFamily }]}>
          {texto || 'Sem conteúdo.'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => copyToClipboard(note.texto)} style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>Copiar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>Exportar PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>Enviar Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
