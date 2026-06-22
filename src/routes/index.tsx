import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "我的待办 - 首页" },
      { name: "description", content: "一个简单的中文待办事项多页面网站作业。" },
      { property: "og:title", content: "我的待办 - 首页" },
      { property: "og:description", content: "一个简单的中文待办事项多页面网站作业。" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">欢迎使用「我的待办」</h1>
      <p className="text-gray-700 leading-7">
        这是一个互联网技术开发栈课程的小作业，演示基础的页面跳转和交互。
        你可以在多个页面之间切换，添加、完成、删除任务，并在「笔记」页随手记录想法。
      </p>
      <p className="text-gray-700 leading-7">
        数据保存在浏览器的 localStorage 中，刷新页面也不会丢失。
      </p>
      <div className="flex gap-3 pt-2">
        <Link to="/todos" className="border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white">
          开始添加待办
        </Link>
        <Link to="/about" className="border border-gray-400 px-4 py-2 hover:bg-gray-100">
          查看笔记
        </Link>
      </div>
    </section>
  );
}
