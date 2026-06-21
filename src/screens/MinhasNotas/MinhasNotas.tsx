import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NotesContext } from "../../presentation/context/NotesContext";
import { useTranslation } from "react-i18next"; // import para tradução
import styles from "./styles";

export default function MinhasNotasScreen() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffff88");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const { t } = useTranslation(); 

  const handleSaveEdit = () => {
    if (!editingText.trim()) {
      Alert.alert(t("error"), t("emptyTextAlert"));
      return;
    }
    if (editingId) {
      updateNote(editingId, { texto: editingText, cor: selectedColor });
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.idBloco}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>{t("myNotes")}</Text>

          <TextInput
            placeholder={t("addNote")}
            value={newNote}
            onChangeText={setNewNote}
            style={styles.input}
          />

          <Text style={styles.label}>{t("chooseColor")}</Text>
          <Picker
            selectedValue={selectedColor}
            style={styles.input}
            onValueChange={(value) => setSelectedColor(value)}
          >
            <Picker.Item label={t("yellow")} value="#ffff88" />
            <Picker.Item label={t("green")} value="#88ff88" />
            <Picker.Item label={t("blue")} value="#88ffff" />
            <Picker.Item label={t("pink")} value="#ff88ff" />
            <Picker.Item label={t("red")} value="#ff4444" />
            <Picker.Item label={t("orange")} value="#ff8844" />
            <Picker.Item label={t("purple")} value="#8844ff" />
            <Picker.Item label={t("gray")} value="#cccccc" />
            <Picker.Item label={t("black")} value="#000000" />
            <Picker.Item label={t("white")} value="#ffffff" />
          </Picker>

          <Button
            title={t("addNote")}
            onPress={() => {
              if (!newNote.trim()) {
                Alert.alert(t("error"), t("emptyTextAlert"));
                return;
              }
              addNote({ texto: newNote, cor: selectedColor });
              setNewNote("");
            }}
          />

          {editingId && (
            <View style={{ marginVertical: 20 }}>
              <TextInput
                placeholder={t("edit")}
                value={editingText}
                onChangeText={setEditingText}
                style={styles.input}
              />
              <Button title={t("save")} onPress={handleSaveEdit} />
              <Button title={t("cancel")} color="gray" onPress={() => setEditingId(null)} />
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={[styles.noteCard, { backgroundColor: item.cor || "#fff" }]}>
          <Text style={styles.noteText}>{item.texto}</Text>
          <Button
            title={t("edit")}
            onPress={() => {
              setEditingId(item.idBloco);
              setEditingText(item.texto);
              setSelectedColor(item.cor);
            }}
          />
          <Button
            title={t("delete")}
            color="red"
            onPress={() => deleteNote(item.idBloco)}
          />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
