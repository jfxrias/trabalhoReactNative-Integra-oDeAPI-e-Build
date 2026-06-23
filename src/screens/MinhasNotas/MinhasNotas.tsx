import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { NotesContext } from "../../presentation/context/NotesContext";
import { ThemeContext } from "../../presentation/context/ThemeContext";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const COR_OPCOES = [
  { label: "Amarelo", value: "#FFF9C4" },
  { label: "Verde", value: "#C8E6C9" },
  { label: "Azul", value: "#B3E5FC" },
  { label: "Salmão", value: "#FFCDD2" },
  { label: "Lavanda", value: "#E1BEE7" },
  { label: "Laranja", value: "#FFE0B2" },
  { label: "Branco", value: "#FFFFFF" },
];

export default function MinhasNotas() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FFF9C4");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const { t } = useTranslation();

  const theme = {
    bg: darkMode ? '#121212' : '#f5f7fa',
    text: darkMode ? '#ffffff' : '#1f2937',
    inputBg: darkMode ? '#1e1e1e' : '#ffffff',
    borderColor: darkMode ? '#333333' : '#e4e4e7',
    primary: darkMode ? '#3b82f6' : '#2563eb',
  };

  const handleSaveEdit = () => {
    if (!editingText.trim()) return;
    if (editingId) {
      updateNote(editingId, { idBloco: editingId, texto: editingText, cor: selectedColor });
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <FlatList
      style={{ backgroundColor: theme.bg, flex: 1 }}
      data={notes}
      keyExtractor={(item) => item.idBloco || Math.random().toString()}
      ListHeaderComponent={
        <View style={{ padding: 15 }}>
          <Text style={[styles.title, { color: theme.text }]}>{t("myNotes")}</Text>
          
          <View style={{ backgroundColor: theme.inputBg, padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: theme.borderColor }}>
            <TextInput
              placeholder={editingId ? t("edit") : t("addNote")}
              placeholderTextColor={darkMode ? "#888" : "#999"}
              value={editingId ? editingText : newNote}
              onChangeText={editingId ? setEditingText : setNewNote}
              multiline
              style={[styles.input, { backgroundColor: darkMode ? '#27272a' : '#f4f4f5', color: theme.text }]}
            />

            <Text style={[styles.label, { color: theme.text, marginBottom: 10 }]}>{t("chooseColor")}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}>
              {COR_OPCOES.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => setSelectedColor(item.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: item.value,
                    borderWidth: selectedColor === item.value ? 3 : 1,
                    borderColor: selectedColor === item.value ? (darkMode ? '#fff' : '#000') : '#ccc',
                  }}
                />
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, { backgroundColor: theme.primary }]} 
              onPress={editingId ? handleSaveEdit : () => { addNote({ texto: newNote, cor: selectedColor }); setNewNote(""); }}
            >
              <Text style={styles.primaryBtnText}>{editingId ? t("save") : t("addNote")}</Text>
            </TouchableOpacity>
            
            {editingId && (
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: 'gray', marginTop: 10 }]} onPress={() => setEditingId(null)}>
                <Text style={styles.primaryBtnText}>{t("cancel")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      }
      renderItem={({ item }) => {
        const isDarkBackground = item.cor === '#000000' || item.cor === '#1e1e1e';
        const textColor = isDarkBackground ? '#ffffff' : '#1f2937';

        return (
          <View style={[styles.noteCard, { 
            backgroundColor: item.cor || "#ffff88", 
            marginHorizontal: 16 
          }]}>
            <Text style={[styles.noteText, { color: textColor }]}>{item.texto}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => { 
                setEditingId(item.idBloco!); 
                setEditingText(item.texto); 
                setSelectedColor(item.cor);
              }}>
                <Text style={[styles.actionText, { color: textColor, opacity: 0.7 }]}>{t("edit")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.idBloco!)}>
                <Text style={[styles.actionText, { color: textColor, opacity: 0.7 }]}>{t("delete")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}