import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/settings/theme-provider";
import ClientProvider from "@/components/provider/ClientProvider";
import { app_metadata } from "@/SEO/app-metadata";




export const metadata: Metadata =app_metadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased dark:bg-black text-white`}
      >
          <ClientProvider>
            <div className="flex h-screen w-full">
              <main className="relative flex-1 h-screen overflow-y-auto w-full text-white">
                {children}
              </main>
            </div>
          </ClientProvider>
      </body>
    </html>
  );
}
