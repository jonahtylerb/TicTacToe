import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "unocss/vite";
import {
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetTypography(),
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTagify(),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
