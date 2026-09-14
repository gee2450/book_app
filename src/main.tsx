import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
import App from './app/App.tsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.documentElement;

let baseHeight = window.innerHeight;

function updateViewportHeight() {
  const currentHeight = window.innerHeight;
  const visualHeight = window.visualViewport?.height ?? currentHeight;

  // 키보드가 열려서 viewport가 줄어든 경우
  const keyboardOpen = baseHeight - visualHeight > 150;

  if (!keyboardOpen) {
    baseHeight = currentHeight;
  }

  root.style.setProperty(
    "--app-vh",
    `${baseHeight * 0.01}px`,
  );
}

updateViewportHeight();

window.addEventListener("resize", updateViewportHeight);
window.visualViewport?.addEventListener("resize", updateViewportHeight);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && (<ReactQueryDevtools initialIsOpen={true} />)}
    </QueryClientProvider>
  </StrictMode>
  ,
)
