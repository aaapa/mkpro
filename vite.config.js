import { defineConfig } from "vite";
import { resolve } from "path";
import pugPlugin from "vite-plugin-pug";
import autoprefixer from "autoprefixer";
import sassGlobImports from "vite-plugin-sass-glob-import";

export default defineConfig({
  plugins: [
    pugPlugin({
      pretty: true,
    }),
    sassGlobImports(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contacts: resolve(__dirname, "contacts.html"),
        catalog: resolve(__dirname, "catalog.html"),
      }
    },
    assetsDir: "",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/vars.scss"; @import "src/scss/fonts.scss"; @import "src/scss/mixins.scss";`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["> 0.5%", "last 20 versions"]
        })
      ]
    }
  }
});