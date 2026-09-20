import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astro-theme-inkstone.example.com',
  devToolbar: {
    enabled: false
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
