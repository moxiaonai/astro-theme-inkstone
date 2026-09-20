# Contributing to Astro Theme Inkstone

感谢你愿意改进 Inkstone。这个主题追求轻量、清晰、适合长期写作，所以贡献时请优先考虑可维护性和使用者的写作体验。

## 适合贡献的内容

- 修复构建、样式、移动端和可访问性问题。
- 改进中文排版、文章页阅读体验和主题切换体验。
- 补充文档、示例文章、部署说明和迁移说明。
- 优化 RSS、sitemap、`llms.txt`、`content-index.json` 等内容发现能力。
- 提供更通用的示例配置或视觉素材。

## 开发约定

```bash
pnpm install
pnpm dev
pnpm build
```

提交 PR 前请至少运行 `pnpm build`。如果改动了视觉样式，建议附上修改前后的截图或说明影响范围。

## 设计原则

- 默认保持纯静态站点，不引入服务端依赖。
- 新增依赖前请说明它解决的问题和维护成本。
- 配置入口尽量集中在 `src/theme/site.ts`。
- 样式 token 尽量放在 `src/theme/styles/theme.css`。
- 示例内容应保持通用，不包含个人隐私、真实组织或不可公开素材。
