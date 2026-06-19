import { createFileRoute } from "@tanstack/react-router";
import { useTodos } from "../hooks/useTodos";

export const Route = createFileRoute("/done")({
  head: () => ({
    meta: [
      { title: "已完成 - 我的待办" },
      { name: "description", content: "查看已完成的任务，可恢复或删除。" },
      { property: "og:title", content: "已完成 - 我的待办" },
      { property: "og:description", content: "查看已完成的任务，可恢复或删除。" },
    ],
  }),
  component: DonePage,
});

function DonePage() {
  const { todos, toggleTodo, removeTodo, ready } = useTodos();
  const doneTodos = todos.filter((t) => t.done);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">已完成</h1>
        <p className="text-sm text-gray-600 mt-1">共 {doneTodos.length} 条已完成任务</p>
      </div>

      {!ready ? (
        <p className="text-gray-500">加载中…</p>
      ) : doneTodos.length === 0 ? (
        <p className="text-gray-500">还没有完成任何任务。</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-200">
          {doneTodos.map((t) => (
            <li key={t.id} className="flex items-center gap-3 px-3 py-2">
              <span className="flex-1 line-through text-gray-400">{t.text}</span>
              <button
                onClick={() => toggleTodo(t.id)}
                className="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100"
              >
                恢复
              </button>
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