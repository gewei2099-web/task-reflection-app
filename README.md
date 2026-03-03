# 个人任务反思系统 v1

纯前端 PWA：任务记录、情绪反思、长期目标与 LLM 行为分析。**无需电脑常开**，部署一次后手机直接使用。

## 技术栈

- 前端：React + Vite + PWA
- 存储：localStorage（全部在本机）
- LLM：手机浏览器直接调用第三方 OpenAI 兼容 API

## 推送到 GitHub

首次将代码推送到 GitHub 的步骤：

**1. 在 GitHub 创建仓库**

- 打开 [github.com/new](https://github.com/new)
- 仓库名填 `task-reflection-app`（或自定义）
- 选择 Public，不勾选「Add a README」，创建

**2. 本地初始化并推送**

在项目根目录 `task-reflection-app/` 下执行：

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/你的用户名/task-reflection-app.git
git push -u origin main
```

若项目已在其他目录用 git 管理过，只需添加 remote 并推送：

```bash
git remote add origin https://github.com/你的用户名/task-reflection-app.git
git push -u origin main
```

---

## 部署（一次）

将前端构建为静态文件，托管到任意支持静态网站的免费服务：

### 方式一：GitHub Pages

**前提**：项目已推送到 GitHub，仓库名为 `task-reflection-app`。

**步骤 1**：构建（会自动输出到项目根目录的 `docs/`）

```bash
cd frontend
npm install
npm run build:pages
```

`build:pages` 会使用 `base: '/task-reflection-app/'` 和 `outDir: ../docs`。若仓库名不同，可改为：
`npx vite build --base /你的仓库名/ --outDir ../docs`

**步骤 2**：推送并开启 Pages

```bash
git add docs
git commit -m "deploy"
git push
```

然后在仓库 **Settings → Pages**：Source 选 **Deploy from a branch**，Branch 选 `main`，Folder 选 **`/docs`**。

等待 1～2 分钟后，访问 `https://你的用户名.github.io/task-reflection-app/`。

---

**个人主页**（`https://用户名.github.io/` 根路径）：用 `npx vite build --base / --outDir ../docs` 代替 `build:pages`。

### 方式二：Vercel / Netlify

```bash
cd frontend
npm install
npm run build
```

在 Vercel / Netlify 中导入项目，构建目录设为 `frontend`，输出目录设为 `dist`。

## 使用步骤

1. **打开应用**：手机浏览器访问你的部署地址（如 `https://xxx.github.io/task-reflection-app/`）
2. **添加到主屏幕**：浏览器菜单中选择「添加到主屏幕」→ 作为 PWA 使用
3. **配置 LLM**：进入「设置」，填写 API Key、接口地址、模型名称，数据仅存于本机
4. **开始记录**：写今日反思、查看历史、生成深度分析

## 功能

- 今日概览（7 天平均分、情绪统计）
- 今日反思记录（任务、情绪、认知、目标一致性等）
- 历史记录（按日期倒序、删除、详情）
- 长期目标
- LLM 深度行为分析（手机直接请求第三方 API）

## 数据与安全

- 所有数据仅存储在浏览器 localStorage，不上传服务器
- API Key 仅存于本机，仅在分析时用于请求你配置的 API 地址
- 部分 API 可能因 CORS 限制无法在浏览器直接调用，需选择支持跨域的服务商
