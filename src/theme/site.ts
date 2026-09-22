export const site = {
  title: 'Astro Theme Inkstone',
  shortTitle: 'Inkstone',
  tagline: 'Astro × Obsidian 写作主题',
  description: 'Inkstone 是一款面向 Obsidian 本地写作、Astro 静态发布和中文技术博客的优雅主题。',
  url: 'https://astro-theme-inkstone.example.com',
  lang: 'zh-CN',
  author: 'moxiaonai',
  authorUrl: '/about.html',
  defaultImage: '/images/site/social-card.svg',
  keywords: [
    'Inkstone',
    'Astro Theme',
    'Obsidian',
    'Markdown',
    'MDX',
    '个人博客',
    '技术博客',
    '静态站点',
    '中文博客',
    '数字花园'
  ],
  topics: [
    {
      name: 'Astro 静态博客',
      description: '用 Astro、Markdown 和内容集合搭建可维护的静态博客。'
    },
    {
      name: 'Obsidian 写作工作流',
      description: '把本地知识库、文章草稿、图片附件和静态发布流程串起来。'
    },
    {
      name: '长期写作与内容发现',
      description: '通过分类、标签、归档、RSS、sitemap、llms.txt 和结构化索引沉淀内容。'
    }
  ],
  hero: {
    greeting: '在砚台上打磨你的文字',
    phrases: [
      '用 Obsidian 写作，用 Astro 发布',
      '把 Markdown 笔记变成优雅的静态博客',
      '为中文技术文章、项目记录和长期思考而设计'
    ],
    cta: {
      label: '了解 Inkstone',
      href: '/about.html'
    }
  },
  nav: [
    { label: '博客', href: '/blog.html' },
    { label: '分类', href: '/categories.html' },
    { label: '项目', href: '/projects.html' },
    { label: '搜索', href: '/search.html' },
    { label: '关于', href: '/about.html' },
    { label: '赞助', href: '/sponsor.html' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/moxiaonai/astro-theme-inkstone' },
    { label: 'RSS', href: '/rss.xml' }
  ],
  friends: [
    { label: 'Astro', href: 'https://astro.build/', description: '静态站点与内容集合' },
    { label: 'Obsidian', href: 'https://obsidian.md/', description: '本地 Markdown 写作' },
    { label: 'Cloudflare Pages', href: 'https://pages.cloudflare.com/', description: '推荐静态部署平台' }
  ]
} as const;

export const projects = [
  {
    id: 'digital-garden',
    title: 'Digital Garden',
    description: '把笔记、文章和项目记录整理成一个可长期生长的个人知识花园。',
    url: '/projects.html',
    repo: 'garden',
    cover: '/images/projects/digital-garden.svg',
    stars: 'Notes',
    accent: 'green'
  },
  {
    id: 'obsidian-astro',
    title: 'Obsidian Astro',
    description: '从本地 Markdown 到静态站点的写作发布工作流示例。',
    url: '/projects.html',
    repo: 'writing',
    cover: '/images/projects/obsidian-astro.svg',
    stars: 'Astro',
    accent: 'orange'
  },
  {
    id: 'theme-lab',
    title: 'Theme Lab',
    description: '展示 Inkstone 的颜色 token、卡片、排版和深浅色切换细节。',
    url: '/projects.html',
    repo: 'theme',
    cover: '/images/projects/theme-lab.svg',
    stars: 'Design',
    accent: 'blue'
  },
  {
    id: 'rss-lab',
    title: 'RSS Lab',
    description: 'RSS、sitemap、llms.txt 和结构化索引的内容发现实验。',
    url: '/projects.html',
    repo: 'feeds',
    cover: '/images/projects/rss-lab.svg',
    stars: 'SEO',
    accent: 'orange'
  },
  {
    id: 'notes-kit',
    title: 'Notes Kit',
    description: '一套适合技术文章、踩坑记录和项目复盘的 Markdown 写作模板。',
    url: '/projects.html',
    repo: 'notes',
    cover: '/images/projects/notes-kit.svg',
    stars: 'MD',
    accent: 'blue'
  },
  {
    id: 'local-workbench',
    title: 'Local Workbench',
    description: '围绕本地预览、内容校验和静态部署的轻量工作台。',
    url: '/projects.html',
    repo: 'local',
    cover: '/images/projects/local-workbench.svg',
    stars: 'Static',
    accent: 'green'
  }
] as const;
