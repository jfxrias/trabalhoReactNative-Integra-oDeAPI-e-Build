import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../../data/api";
import React from "react";

export type Note = {
  idBloco: string;
  texto: string;
  cor: string;
  categoria?: string;
};

export type NotesContextType = {
  notes: Note[];
  loading: boolean;
  addNote: (newNote: Omit<Note, "idBloco">) => Promise<void>;
  updateNote: (idBloco: string, updatedNote: Note) => Promise<void>;
  deleteNote: (idBloco: string) => Promise<void>;
};

export const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blocos/listar");
      setNotes(res.data);
    } catch (err: any) {
      console.log("Erro ao carregar notas:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote: Omit<Note, "idBloco">) => {
    try {
      // gera id automaticamente
      const noteWithId: Note = {
        ...newNote,
        idBloco: String(Date.now()),
      };
      const res = await api.post("/blocos/adicionar", noteWithId);
      setNotes((prev) => [...prev, res.data]);
    } catch (err: any) {
      console.log("Erro ao adicionar nota:", err.response?.data || err.message);
    }
  };

  const updateNote = async (idBloco: string, updatedNote: Note) => {
    try {
      const res = await api.put(`/blocos/atualizar/${idBloco}`, updatedNote);
      setNotes((prev) =>
        prev.map((n) => (n.idBloco === idBloco ? res.data : n))
      );
    } catch (err: any) {
      console.log("Erro ao atualizar nota:", err.response?.data || err.message);
    }
  };

  const deleteNote = async (idBloco: string) => {
    try {
      await api.delete(`/blocos/remover/${idBloco}`);
      setNotes((prev) => prev.filter((n) => n.idBloco !== idBloco));
    } catch (err: any) {
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
