import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://learn.paobu.org',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
