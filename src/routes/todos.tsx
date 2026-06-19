import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export const Route = createFileRoute("/todos")({
  head: () => ({
    meta: [
      { title: "待办列表 - 我的待办" },
      { name: "description", content: "添加、勾选完成、删除待办任务。" },
      { property: "og:title", content: "待办列表 - 我的待办" },
      { property: "og:description", content: "添加、勾选完成、删除待办任务。" },
    ],
  }),
  component: TodosPage,
});

function TodosPage() {
  const { todos, addTodo, toggleTodo, removeTodo, ready } = useTodos();
  const [input, setInput] = useState("");

  const total = todos.length;
  const doneCount = todos.filter((t) => t.done).length;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">待办列表</h1>
        <p className="text-sm text-gray-600 mt-1">
          共 {total} 条，已完成 {doneCount} 条
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入一条新任务，回车添加"
          className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-gray-900"
        />
        <button
          type="submit"
          className="border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white"
        >
          添加
        </button>
      </form>

      {!ready ? (
        <p className="text-gray-500">加载中…</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">还没有任务，快添加一个吧。</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-200">
          {todos.map((t) => (
            <li key={t.id} className="flex items-center gap-3 px-3 py-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
                className="h-4 w-4"
              />
              <span className={"flex-1 " + (t.done ? "line-through text-gray-400" : "")}>
                {t.text}
              </span>
              <button
                onClick={() => removeTodo(t.id)}
                className="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}