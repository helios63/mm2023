import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sanity({
    projectId: 's4uuoklk',
    dataset: 'production',
    apiVersion: '2023-02-08',
    useCdn: false,
  })],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
