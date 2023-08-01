import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "node:url"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("src", import.meta.url)),
            config: path.resolve(__dirname, 'src/config'),
            com: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    hack: `true; @import (reference) '${path.resolve(__dirname, "./src/common/styles/mixins.less")}';`
                }
            }
        }
    }
})
