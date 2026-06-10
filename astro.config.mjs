import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: 'https://aliahealth.eu',
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});