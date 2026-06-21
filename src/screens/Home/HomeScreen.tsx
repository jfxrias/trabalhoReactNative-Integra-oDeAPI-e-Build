import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NotesContext } from '../../presentation/context/NotesContext';
import { ThemeContext } from '../../presentation/context/ThemeContext';
import { useFont } from '../../presentation/context/FontContext';
import { useTranslation } from 'react-i18next'; // import para tradução
import styles from './styles';

export default function Home({ navigation }) {
  const { notes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const { fontSize, fontFamily } = useFont();
  const { t } = useTranslation(); // hook para pegar textos traduzidos

  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note: any) =>
          !searchTerm ||
          note.texto?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [notes, searchTerm]
  );

  const theme = {
    bg: darkMode ? '#1a1a2e' : '#f8f8f8',
    text: darkMode ? '#e0e0e0' : '#333',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
    
      <Text style={[styles.title, { color: theme.text }]}>{t("homeTitle")}</Text>

  
      <TextInput
        style={styles.searchInput}
        placeholder={t("searchNote")} 
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => String(item.idBloco)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetalheNota', { id: item.idBloco })
            }
          >
            <View style={[styles.card, { backgroundColor: item.cor }]}>
              <Text style={[styles.cardText, { fontSize, fontFamily }]}>
                {item.texto}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
