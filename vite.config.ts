import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    open: true, // Automatically opens the visualizer in your browser
  }), ],
  server:{
    proxy:{
      '/main/api/profile/getInfo':{
        target: 'https://speaktest.exesfull.com/main/api/profile/getInfo',
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/proxy/, '')
      }
    }
  }
})
