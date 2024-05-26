import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfig } from 'vite';

/* // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
 */
const config: UserConfig = {
  server: {
    host: '0.0.0.0',
  },
};
export default config;