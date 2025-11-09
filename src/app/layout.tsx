import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NoteMentorSidebar } from "@/components/navigations/NoteMentorSidebar";
import { ThemeProvider } from "@/components/settings/theme-provider";
import NoteMentorAnimatedBackground from "@/components/heroAnimatedBg";
import Navbar from "@/components/navigations/Navbar";
import { Provider } from 'react-redux'
import { store } from "./store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Provider store={store} >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen w-full">
              <main className="relative flex-1 f h-screen overflow-y-auto w-full text-white ">
                <Navbar />
                {children}
              </main>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
