# phd for life (`phd4life.com`)

> 聚焦于 AI for Science、自动化智能体（Agents）、NLP / 机器学习与合成生物学的高性能现代静态博客与个人主页。

[English](../README.md) | [简体中文](./README_zh.md)

[![Site](https://img.shields.io/badge/website-phd4life.com-2dd4bf?style=flat-square)](https://phd4life.com)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro%205-ff5d01?style=flat-square)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](../LICENSE)

---

## 项目概览

**phd for life** 是一个基于 Astro 5 构建的个人主页与技术博客系统，核心聚焦三件事：

1. **研究与工程方向入口**：展示在 AI for Science、自动化智能体管线、NLP/深度学习及合成生物学领域的持续探索。
2. **开源项目与架构集**：展示 [SmartisanNaive](https://github.com/SmartisanNaive) 上的代表性开源项目（MOSS-Lab、BioFoundry、SpatialBridge、AI-Cleaner、LLM_for_EVO2、LabScript-AI）。
3. **经验积累与技术博客**：基于 Astro Content Collections 驱动的高性能英文技术博客，支持 KaTeX 数学公式预渲染、Shiki 深色语法高亮、一键复制代码与标签多维度归档。

## 视觉与动效体系

继承深空制图的美学质感，兼顾极致的加载性能：

- **配色 Token**：黑曜石深底（`#06060a`）、黑曜石次层卡片（`#0c0c12`）、青绿/薄荷绿高亮（`#2dd4bf`）。
- **字体对比**：斜体衬线体 *Fraunces* 与现代无衬线体 *DM Sans*，辅以等宽代码字体 *JetBrains Mono*。
- **动效编排**：
  - Three.js 2900+ 粒子三层景深星空 Hero 画布与平滑鼠标视差。
  - GSAP 与 ScrollTrigger 编排的章节序列（00–07 章节指示器动态监听）。
  - Lenis 丝滑惯性平滑滚动，并全面适配系统的 `prefers-reduced-motion` 减弱动效偏好。
  - 全局 Canvas 动态胶片颗粒（Film Grain）。

## 技术栈

- **框架**：Astro 5（纯静态输出 `output: 'static'`，无服务器运行时负担）
- **语言**：TypeScript
- **内容引擎**：Astro Content Collections（Zod 强类型模式校验）
- **排版与代码**：Shiki（`github-dark` 主题）、`remark-math`、`rehype-katex`
- **动效库**：Three.js、GSAP 3、Lenis
- **包管理**：Bun

## 目录结构

```text
├── astro.config.mjs         # Astro 配置（Site、Static、MDX、Sitemap、KaTeX、Shiki）
├── package.json             # 依赖声明与 npm scripts
├── tsconfig.json            # 严格 TypeScript 配置
├── public/
│   ├── favicon.svg          # 矢量图标
│   ├── robots.txt           # 爬虫指令与站点地图索引
│   └── images/projects/     # 黑曜石青绿几何 SVG 项目封面
├── docs/
│   └── README_zh.md         # 中文项目说明文档（本文档）
└── src/
    ├── content.config.ts    # 博客文章 Zod 校验定义
    ├── content/blog/        # 英文 Markdown / MDX 博客文章
    ├── data/                # 结构化数据（项目、技术栈、工作流、导航）
    ├── styles/              # 配色 Token、全局布局与 Prose 文章排版样式
    ├── scripts/             # Three.js 星空、胶片颗粒与 GSAP/Lenis 动效
    ├── layouts/             # 全局骨架 BaseLayout 与阅读布局 BlogPostLayout
    ├── components/          # 00-07 各章节组件
    └── pages/               # 页面路由（首页、博客归档、标签聚合、RSS、404）
```

## 本地快速开始

### 环境依赖

- Bun 1.1+（或 Node.js 20+）

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/SmartisanNaive/blog.git
cd blog

# 安装依赖
bun install

# 启动本地开发服务
bun dev
```

在浏览器中打开 `http://localhost:4321` 即可预览。

### 静态构建与预览

```bash
# 构建纯静态产物至 dist/ 目录
bun run build

# 本地静态预览
bun run preview
```

## 托管部署

项目产物为完全独立的静态 `dist/` 目录，可零配置部署至边缘托管服务：

- **腾讯云 EdgeOne Pages**：
  - Framework Preset：`Astro`
  - Build Command：`bun run build`
  - Output Directory：`dist`
  - Node.js Version：`20.x`（或选择 Bun 预设）
- **Cloudflare Pages / Vercel**：同理开箱即用，构建后自动进行全球 CDN 边缘节点分发。

## 开源协议

本项目采用 [MIT 许可证](../LICENSE) 开源。
