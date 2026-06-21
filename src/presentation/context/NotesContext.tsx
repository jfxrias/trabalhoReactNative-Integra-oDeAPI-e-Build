import { createContext, useState, useEffect } from "react";
import api from "../../data/api";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blocos/listar");
      setNotes(res.data);
    } catch (err) {
      console.log("Erro ao carregar notas:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
    try {

      const res = await api.post("/blocos/adicionar", {
        texto: newNote.texto,
        cor: newNote.cor,
        categoria: newNote.categoria,
      });
  
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Erro ao adicionar nota:", err.response?.data || err.message);
    }
  };

  const updateNote = async (idBloco, updatedNote) => {
    try {
      const res = await api.put(`/blocos/atualizar/${idBloco}`, {
        texto: updatedNote.texto,
        cor: updatedNote.cor,
        categoria: updatedNote.categoria,
      });
      setNotes((prev) =>
        prev.map((n) => (n.idBloco === idBloco ? res.data : n))
      );
    } catch (err) {
      console.log("Erro ao atualizar nota:", err.response?.data || err.message);
    }
  };

  const deleteNote = async (idBloco) => {
    try {
      await api.delete(`/blocos/remover/${idBloco}`);
      setNotes((prev) => prev.filter((n) => n.idBloco !== idBloco));
    } catch (err) {
      console.log("Erro ao excluir nota:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, loading, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
