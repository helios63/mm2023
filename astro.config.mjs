import { sanityIntegration } from "@sanity/astro";
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
// import sanity from "astro-sanity";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sanityIntegration({
    projectId: 's4uuoklk',
    dataset: 'production',
    apiVersion: '2023-02-08',
    useCdn: false
  })],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
