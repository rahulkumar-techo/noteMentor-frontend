"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "@/components/navigations/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../settings/theme-provider";
import ProtectedPage from "../wrappers/ProtectedPage";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        {/* Navbar decides internally whether to hide on certain routes */}
        <Navbar />
        <Toaster />
       <ProtectedPage>
         {children}
       </ProtectedPage>
      </Provider>
    </ThemeProvider>
  );
}
