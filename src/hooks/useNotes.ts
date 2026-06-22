import { useEffect, useState } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;   
  updatedAt: number;  
};

const STORAGE_KEY = "my-notes-v1";

// 2. 从 localStorage 读取数据
function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Note[];
  } catch {
    return [];
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [ready, setReady] = useState(false);

 
  useEffect(() => {
    setNotes(loadNotes());
    setReady(true);
  }, []);

  // 数据变化时自动保存
  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, ready]);

  // 添加一条新笔记
  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim() || "无标题",
      content: content.trim(),
      updatedAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]); // 最新笔记显示在最上面
  };

  // 更新笔记
  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, title: title.trim() || "无标题", content: content.trim(), updatedAt: Date.now() }
          : n
      )
    );
  };

  // 删除笔记 
  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return { notes, addNote, updateNote, removeNote, ready };
}
