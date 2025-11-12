

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NoteMentorSidebar } from "@/components/navigations/NoteMentorSidebar";
import { ThemeProvider } from "@/components/settings/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area"
import ClientProvider from "@/components/provider/ClientProvider";

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

    <main>
      {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
      <ClientProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            {/* Sidebar (collapsible) */}
            <NoteMentorSidebar />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-[#0d0d0f] relative">
              <div className="sticky top-0 z-50 bg-[#0d0d0f]/80 backdrop-blur-sm md:hidden p-2 border-b border-gray-800">
                <SidebarTrigger />
              </div>
              <div className="px-1 py-6 md:px-6 ">
                <ScrollArea className=" md:max-h-[10vh]">
                  {children}
                </ScrollArea>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </ClientProvider>
      {/* </ThemeProvider> */}
    </main>
  );
}
