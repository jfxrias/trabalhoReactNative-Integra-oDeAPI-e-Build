import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NotesContext } from "../../presentation/context/NotesContext";
import styles from "./styles";

export default function MinhasNotasScreen() {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffff88");

  // estados para edição
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleSaveEdit = () => {
    if (!editingText.trim()) {
      Alert.alert("Erro", "O texto não pode estar vazio.");
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
          <Text style={styles.title}>Minhas Notas</Text>

          <TextInput
            placeholder="Digite uma nota"
            value={newNote}
            onChangeText={setNewNote}
            style={styles.input}
          />

          <Text style={styles.label}>Escolha a cor:</Text>
          <Picker
            selectedValue={selectedColor}
            style={styles.input}
            onValueChange={(value) => setSelectedColor(value)}
          >
         <Picker.Item label="Amarelo" value="#ffff88" />
            <Picker.Item label="Verde" value="#88ff88" />
            <Picker.Item label="Azul" value="#88ffff" />
            <Picker.Item label="Rosa" value="#ff88ff" />
            <Picker.Item label="Vermelho" value="#ff4444" />
            <Picker.Item label="Laranja" value="#ff8844" />
            <Picker.Item label="Roxo" value="#8844ff" />
            <Picker.Item label="Cinza" value="#cccccc" />
            <Picker.Item label="Preto" value="#000000" />
            <Picker.Item label="Branco" value="#ffffff" />
          </Picker>

          <Button
            title="Adicionar"
            onPress={() => {
              if (!newNote.trim()) {
                Alert.alert("Erro", "O texto não pode estar vazio.");
                return;
              }
              addNote({ texto: newNote, cor: selectedColor });
              setNewNote("");
            }}
          />

          {editingId && (
            <View style={{ marginVertical: 20 }}>
              <TextInput
                placeholder="Editar nota"
                value={editingText}
                onChangeText={setEditingText}
                style={styles.input}
              />
              <Button title="Salvar edição" onPress={handleSaveEdit} />
              <Button title="Cancelar" color="gray" onPress={() => setEditingId(null)} />
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={[styles.noteCard, { backgroundColor: item.cor || "#fff" }]}>
          <Text style={styles.noteText}>{item.texto}</Text>
          <Button
            title="Editar"
            onPress={() => {
              setEditingId(item.idBloco);
              setEditingText(item.texto);
              setSelectedColor(item.cor);
            }}
          />
          <Button
            title="Excluir"
            color="red"
            onPress={() => deleteNote(item.idBloco)}
          />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
