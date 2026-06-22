# 把"关于"改成"笔记"功能

笔记功能本身（`/about` 路由下的增删改 + localStorage 持久化）已经在 `src/hooks/useNotes.ts` 和 `src/routes/about.tsx` 实现完成，顶部导航也已经是「笔记」。本次计划只补齐**首页文案/链接**和**README 文档**，让整个项目对外（GitHub）展示一致，然后通过 Lovable 的 GitHub 集成把改动同步上去。

## 改动清单

### 1. `src/routes/index.tsx`（首页）
- 把首页副标题里只提"待办"的描述补一句：可以在「笔记」页记录想法。
- 把右侧次按钮 `关于本作业` 改成 `查看笔记`，链接保持 `to="/about"`（路由路径不动，避免动到 `routeTree.gen.ts`）。

### 2. `README.md`
- 功能列表：把 `关于：作业说明` 改成 `笔记：新建 / 编辑 / 删除个人笔记，localStorage 持久化`。
- 路由表：`/about` 的说明从 `关于` 改成 `笔记`。
- 目录结构：在 `hooks/` 下补 `useNotes.ts` 说明；`about.tsx` 注释改为 `笔记页`。
- 在「功能」段落顶部加一行：本作业在原"待办"基础上新增了"笔记"模块。

### 3. 不做的改动（明确说明，避免误操作）
- **不重命名** `about.tsx` → `notes.tsx`。重命名会改动 `routeTree.gen.ts` 和所有 `<Link to="/about">`，对当前小作业收益低、风险高。URL 是 `/about`、页面内容是「笔记」，对作业演示完全够用。
- 不动 `useTodos.ts`、`todos.tsx`、`done.tsx`。
- 不引入新依赖、不接后端。

## 同步到 GitHub 的方式

Lovable 与 GitHub 已连接的情况下，**所有在 Lovable 里的代码改动会自动 commit & push 到你绑定的仓库**，不需要手动操作 git。流程：

1. 在 Lovable 里点 "Implement plan" → 本计划里的改动落到代码。
2. 等待几秒，Lovable 会自动把这次 commit 推到 GitHub 主分支。
3. 刷新 GitHub 仓库页面，就能看到新提交（commit message 通常包含本次改动概要），点开 `src/routes/about.tsx` 即可看到笔记功能源码。
4. 别人 `git clone` 后按 README 跑 `bun install && bun dev`，访问 `/about` 即可看到笔记页。

如果你希望我**顺便把 URL 也改成 `/notes`**（更直观，但要改 4-5 处链接 + 重命名路由文件），告诉我一声，我把这一步加进计划。
