# 我的待办（My Todos）

一个用于「互联网技术开发栈」课程作业的简单中文网站，演示基础的页面跳转和交互。

## 功能

本作业在原"待办"基础上新增了"笔记"模块。

- 首页：项目介绍
- 待办列表：添加任务、勾选完成、删除任务
- 已完成：查看已完成任务，可恢复或删除
- 笔记：新建 / 编辑 / 删除个人笔记，localStorage 持久化
- 数据使用浏览器 `localStorage` 持久化，刷新不丢失

## 技术栈

- React + TypeScript
- TanStack Start / Router（文件路由）
- Vite
- Tailwind CSS

## 本地运行

推荐使用 [Bun](https://bun.sh)：

```bash
bun install
bun dev
```

如果你只装了 Node.js，也可以用 npm：

```bash
npm install
npm run dev
```

启动后打开终端提示的本地地址（一般是 http://localhost:3000 ）即可访问。

## 页面路由

| 路径 | 说明 |
| ---- | ---- |
| `/` | 首页 |
| `/todos` | 待办列表 |
| `/done` | 已完成 |
| `/about` | 笔记 |

## 目录结构（核心部分）

```
src/
  routes/
    __root.tsx     # 全局布局 + 顶部导航
    index.tsx      # 首页
    todos.tsx      # 待办列表
    done.tsx       # 已完成
    about.tsx      # 笔记页
  hooks/
    useTodos.ts    # 待办数据 + localStorage 持久化
    useNotes.ts    # 笔记数据 + localStorage 持久化
```

## 在 GitHub 上查看 / 运行

1. 在 GitHub 仓库页面可以直接浏览所有源代码
2. 点击右上角 `Code → Download ZIP`，或者用 `git clone` 克隆到本地
3. 按上面的「本地运行」章节安装依赖并启动