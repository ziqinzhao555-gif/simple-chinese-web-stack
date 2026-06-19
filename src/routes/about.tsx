import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于 - 我的待办" },
      { name: "description", content: "关于本作业的说明。" },
      { property: "og:title", content: "关于 - 我的待办" },
      { property: "og:description", content: "关于本作业的说明。" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">关于本作业</h1>
      <p className="text-gray-700 leading-7">
        这是「互联网技术开发栈」课程的一个小练习，目标是演示最基础的：
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>多个页面之间的跳转（首页 / 待办列表 / 已完成 / 关于）</li>
        <li>表单输入和按钮点击等基础交互</li>
        <li>使用 localStorage 在浏览器端保存数据</li>
      </ul>
      <h2 className="text-lg font-semibold pt-4">技术栈</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>React + TypeScript</li>
        <li>TanStack Start / Router（文件路由）</li>
        <li>Vite 构建</li>
        <li>Tailwind CSS</li>
      </ul>
    </section>
  );
}