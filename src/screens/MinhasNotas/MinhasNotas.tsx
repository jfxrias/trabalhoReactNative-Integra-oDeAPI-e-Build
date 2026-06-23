import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { NotesContext } from "../../presentation/context/NotesContext";
import { ThemeContext } from "../../presentation/context/ThemeContext";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const COR_OPCOES = [
  "#FFF9C4", "#C8E6C9", "#BBDEFB", "#FFCDD2", "#E1BEE7",
  "#FFE0B2", "#F5F5F5", "#F48FB1", "#B2DFDB", "#80DEEA",
  "#D1C4E9", "#DCEDC8", "#FFECB3", "#CFD8DC", "#FFAB91",
  "#B39DDB", "#AED581", "#90CAF9", "#A5D6A7", "#CE93D8",
  "#000000"
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
    bg: darkMode ? "#121212" : "#f5f7fa",
    text: darkMode ? "#ffffff" : "#1f2937",
    inputBg: darkMode ? "#1e1e1e" : "#ffffff",
    borderColor: darkMode ? "#333333" : "#e4e4e7",
    primary: darkMode ? "#3b82f6" : "#2563eb",
  };

  const handleSaveEdit = () => {
    if (editingId && editingText.trim()) {
      updateNote(editingId, {
        idBloco: editingId,
        texto: editingText,
        cor: selectedColor,
      });
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t("myNotes") || "Minhas Notas"}
      </Text>

      <TextInput
        placeholder={
          editingId ? t("edit") || "Editar nota" : t("addNote") || "Adicionar nota"
        }
        placeholderTextColor={darkMode ? "#888" : "#999"}
        value={editingId ? editingText : newNote}
        onChangeText={editingId ? setEditingText : setNewNote}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            color: theme.text,
            borderColor: theme.borderColor,
            borderWidth: 1,
          },
        ]}
      />

      <Text style={[styles.label, { color: theme.text, marginBottom: 10 }]}>
        {t("chooseColor") || "Escolha uma cor"}
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 15 }}>
        {COR_OPCOES.map((cor) => (
          <TouchableOpacity
            key={cor}
            onPress={() => setSelectedColor(cor)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: cor,
              borderWidth: selectedColor === cor ? 3 : 1,
              borderColor: selectedColor === cor ? "#000" : "#ccc",
              marginRight: 10,
              marginBottom: 10,
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
        onPress={
          editingId
            ? handleSaveEdit
            : () => {
                if (newNote.trim()) {
                  addNote({ texto: newNote, cor: selectedColor });
                  setNewNote("");
                }
              }
        }
      >
        <Text style={styles.primaryBtnText}>
          {editingId ? t("save") || "Salvar" : t("addNote") || "Adicionar"}
        </Text>
      </TouchableOpacity>

      {editingId && (
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: "gray", marginTop: 10 }]}
          onPress={() => {
            setEditingId(null);
            setEditingText("");
          }}
        >
          <Text style={styles.primaryBtnText}>{t("cancel") || "Cancelar"}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={notes}
        keyExtractor={(item, index) =>
          item.idBloco ? String(item.idBloco) : String(index)
        }
        renderItem={({ item }) => {
          const corValida = item.cor && item.cor !== "[NULL]" ? item.cor : "#FFF9C4";
          const textoValido = item.texto || t("noContent") || "Sem conteúdo";

          return (
            <View style={[styles.noteCard, { backgroundColor: corValida }]}>
              <Text style={styles.noteText}>{textoValido}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item.idBloco);
                    setEditingText(item.texto || "");
                    setSelectedColor(corValida);
                  }}
                >
                  <Text style={styles.actionText}>{t("edit") || "Editar"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.idBloco)}>
                  <Text style={styles.actionText}>{t("delete") || "Excluir"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
