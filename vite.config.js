import { defineConfig } from "vite";
import { resolve } from "path";
import pugPlugin from "vite-plugin-pug";

export default defineConfig({
  plugins: [
    pugPlugin({
      pretty: true,
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, "index.html"),
  //       contacts: resolve(__dirname, "contacts.html"),
  //       services: resolve(__dirname, "services.html"),
  //       user: resolve(__dirname, "user.html"),
  //     },
  //   },
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/vars.scss"; @import "src/scss/fonts.scss"; @import "src/scss/mixins.scss";`,
      },
    },
  },
});