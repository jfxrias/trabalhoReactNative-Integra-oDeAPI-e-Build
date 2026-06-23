import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NotesContext } from '../../presentation/context/NotesContext';
import { ThemeContext } from '../../presentation/context/ThemeContext';
import { useFont } from '../../presentation/context/FontContext';
import { useTranslation } from 'react-i18next'; 
import styles from './styles';

export default function Home({ navigation }) {
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const { fontSize, fontFamily } = useFont();
  const { t } = useTranslation(); 
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(
    () =>
      notes.filter((note: any) =>
        !searchTerm || note.texto?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [notes, searchTerm]
  );

  const theme = {
    bg: darkMode ? '#121212' : '#f5f7fa',
    text: darkMode ? '#ffffff' : '#1f2937',
    inputBg: darkMode ? '#1e1e1e' : '#ffffff',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text, marginTop: 20 }]}>
        {t("homeTitle") || "Início"}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            color: theme.text,
            borderColor: darkMode ? '#333' : '#ddd',
            borderWidth: 1,
          },
        ]}
        placeholder={t("searchNote") || "Buscar nota..."} 
        placeholderTextColor={darkMode ? "#888" : "#999"}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => String(item.idBloco)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
         
          const corValida = item.cor && item.cor !== "[NULL]" ? item.cor : "#fff";
          const isDarkBackground = corValida === '#000000' || corValida === '#1e1e1e';
          const textColor = isDarkBackground ? '#ffffff' : '#1f2937';

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalheNota', { id: item.idBloco })}
            >
              <View
                style={[
                  styles.noteCard,
                  { backgroundColor: corValida, marginBottom: 15 },
                ]}
              >
                <Text
                  style={[
                    styles.noteText,
                    { fontSize, fontFamily, color: textColor },
                  ]}
                >
                  {item.texto || "Sem conteúdo"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
