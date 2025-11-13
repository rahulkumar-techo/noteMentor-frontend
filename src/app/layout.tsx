import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/settings/theme-provider";
import ClientProvider from "@/components/provider/ClientProvider";




export const metadata: Metadata = {
  title: "NoteMentor Dashboard",
  description: "Learn smarter with NoteMentor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased bg-black text-white`}
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
