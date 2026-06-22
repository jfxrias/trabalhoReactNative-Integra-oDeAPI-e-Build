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
      notes.filter(
        (note: any) =>
          !searchTerm ||
          note.texto?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [notes, searchTerm]
  );

  const theme = {
    bg: darkMode ? '#121212' : '#f8f8f8',
    text: darkMode ? '#ffffff' : '#333333',
    inputBg: darkMode ? '#1e1e1e' : '#ffffff',
    inputBorder: darkMode ? '#333333' : '#cccccc',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
    
      <Text style={[styles.title, { color: theme.text }]}>{t("homeTitle")}</Text>

      <TextInput
        style={[styles.searchInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.inputBorder }]}
        placeholder={t("searchNote")} 
        placeholderTextColor={darkMode ? "#888" : "#999"}
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
            {/* Mantemos a cor customizada do card, mas garantimos que o texto se adapte se a cor for muito escura */}
            <View style={[styles.card, { backgroundColor: item.cor || (darkMode ? '#1e1e1e' : '#fff') }]}>
              <Text style={[styles.cardText, { fontSize, fontFamily, color: item.cor === '#000000' ? '#fff' : '#121212' }]}>
                {item.texto}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}