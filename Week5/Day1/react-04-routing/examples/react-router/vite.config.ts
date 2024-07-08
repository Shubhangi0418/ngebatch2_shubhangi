import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  process.env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      open: true, 
      port: 3000
    },
    define: {
      'process.env.MY_NAME': JSON.stringify(process.env.MY_NAME),
      'process.env.MY_BOOLEAN': process.env.MY_BOOLEAN,
      // if you want to expose all env variables, which is not recommended use
      // 'process.env': process.env
    }
  }
})
