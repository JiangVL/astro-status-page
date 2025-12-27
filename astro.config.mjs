import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel(),
});

// // https://astro.build/config
// export default defineConfig({
//   integrations: [tailwind()],
//   output: "server",
//   adapter: node({
//     mode: "standalone"
//   })
// });
