## 项目主题：待办事项 + 多页面（中文）

一个粗糙但功能完整的小作业网站，重点展示「基础交互」「页面跳转」，并支持上传到 GitHub 后本地克隆运行。

## 页面结构（4 个路由）

1. **首页 `/`**：欢迎语 + 简介 + 进入待办按钮
2. **待办列表 `/todos`**：输入框 + 添加、勾选完成（划线）、删除；顶部显示「共 X 条，已完成 Y 条」
3. **已完成 `/done`**：仅展示已完成任务，可恢复 / 删除
4. **关于 `/about`**：作业说明 + 简单自我介绍

## 交互点

- 表单提交 + 回车添加任务
- 勾选完成 / 取消完成
- 删除任务
- 顶部导航栏跳转，当前页高亮
- `localStorage` 持久化，刷新不丢

## 技术实现

- TanStack Start 文件路由：`src/routes/index.tsx`、`todos.tsx`、`done.tsx`、`about.tsx`
- 共享数据：`src/hooks/useTodos.ts`（`useState` + `localStorage`）
- 导航栏：写在 `src/routes/__root.tsx`，用 `<Link>`
- 样式：Tailwind 默认类，黑白灰 + 简单边框，保持「粗糙」

## GitHub 展示与运行

- 编写中文 `README.md`，内容包含：
  - 项目简介、功能截图位（可选）
  - 技术栈说明（React + TanStack Start + Vite + Tailwind）
  - 本地运行命令：`bun install` → `bun dev`；附 npm 等价命令
  - 页面与交互说明
- 在 Lovable 里完成代码后，通过左下角 **+ → GitHub → Connect project** 把代码推送到自己的 GitHub 仓库
- 仓库连接后，任何人都可以 `git clone` 下来按 README 运行，也可直接在 GitHub 网页浏览代码

## 不做的事

- 不接后端 / 不开 Lovable Cloud
- 不做登录注册、不做动画、不做响应式精调
- 不引入额外组件库定制
