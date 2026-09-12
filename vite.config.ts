import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // mode가 'development'일 때만 DEV 환경변수를 true로 설정 (테스트 모드)
  const isDev = mode === 'development';

  console.log(`Vite config: mode=${mode}, isDev=${isDev}`);

  return {
    define: {
      'import.meta.env.DEV': isDev,
    },
    plugins: [react(), tailwindcss(), tsconfigPaths()],
  };
})
