// app/Layout.tsx
'use client'

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/theme";
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import '@/app/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, colorMode] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <div className="page-content">
              {children}
            </div>
          </main>
        </div>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
