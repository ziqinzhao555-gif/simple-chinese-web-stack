import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useNotes, type Note } from "../hooks/useNotes";

// 路由注册
export const Route = createFileRoute("/about")({
  component: NotesPage,
});

// 主组件
function NotesPage() {

  const { notes, addNote, updateNote, removeNote } = useNotes();

  // 编辑状态
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingId && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingId]);


  //  新增笔记
  const handleAddNote = () => {
    const newNote = addNote("新笔记", "在这里写内容……");
    setEditingId(newNote.id);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  // 点击笔记卡片 
  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  //保存编辑
  const handleSaveEdit = () => {
    if (!editingId) return;
    if (!editTitle.trim()) {
      alert("标题不能为空，请写个标题吧");
      return;
    }
    updateNote(editingId, editTitle, editContent);
    setEditingId(null); // 退出编辑模式
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  // 删除笔记
  const handleDeleteNote = (id: string) => {
    if (window.confirm("确定要删除这条笔记吗？")) {
      removeNote(id);
      // 如果刚好删除的是正在编辑的那条，顺便退出编辑状态
      if (editingId === id) {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
      }
    }
  };

  //渲染界面 
  return (
    <section className="space-y-6">
      {/* ---- 顶部：标题 + 新建按钮 ---- */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">我的笔记</h1>
        <button
          onClick={handleAddNote}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + 新建笔记
        </button>
      </div>

      {/* ---- 空状态：一条笔记都没有时显示 ---- */}
      {notes.length === 0 && (
        <div className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
          <p>还没有笔记 </p>
          <p className="text-sm">点击右上角“新建笔记”开始记录吧</p>
        </div>
      )}

      {/* ---- 笔记列表 ---- */}
      <div className="space-y-4">
        {notes.map((note) => {
          const isEditing = editingId === note.id;

          return (
            <div
              key={note.id}
              className={`rounded border p-4 transition-shadow ${
                isEditing
                  ? "border-blue-500 shadow-md" // 编辑模式下高亮蓝框
                  : "border-gray-200 hover:shadow"
              }`}
            >
              {isEditing ? (
                // ----- 编辑模式（显示输入框 + 保存/取消按钮） -----
                <div className="space-y-3">
                  {/* 标题输入框 */}
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-lg font-medium focus:border-blue-500 focus:outline-none"
                    placeholder="给笔记起个标题"
                  />
                  {/* 正文文本框 */}
                  <textarea
                    ref={textareaRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="写下你的笔记内容……"
                  />
                  {/* 操作按钮组 */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      保存
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                // ----- 查看模式（卡片展示） -----
                <div>
                  {/* 标题行：左标题 + 右删除按钮 */}
                  <div className="flex items-start justify-between">
                    <h3
                      className="cursor-pointer text-lg font-semibold hover:text-blue-600"
                      onClick={() => handleStartEdit(note)}
                    >
                      {note.title || "无标题"}
                    </h3>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      删除
                    </button>
                  </div>
                  {/* 正文预览（点击也能进入编辑） */}
                  <p
                    className="mt-1 cursor-pointer text-gray-700 line-clamp-2 hover:text-blue-600"
                    onClick={() => handleStartEdit(note)}
                  >
                    {note.content || "（点击编辑内容）"}
                  </p>
                  {/* 更新时间 */}
                  <p className="mt-2 text-xs text-gray-400">
                    更新于 {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
