

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NoteMentorSidebar } from "@/components/navigations/NoteMentorSidebar";
import { ThemeProvider } from "@/components/settings/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area"
import ClientProvider from "@/components/provider/ClientProvider";
import { dashboard_metaData } from "@/SEO/app-metadata";


export const metadata: Metadata = dashboard_metaData;

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <ClientProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            <NoteMentorSidebar />
            <main className="flex-1 overflow-y-auto text-black dark:text-white dark:bg-black relative">
              <div className="sticky top-0 z-50 text-black dark:text-white dark:bg-black/80 backdrop-blur-sm md:hidden p-2 border-b border-gray-800">
                <SidebarTrigger />
              </div>
              <div className="px-1 py-6 md:px-6">
                <div className="md:max-h-[93vh] overflow-y-auto">{children}</div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </ClientProvider>
    </main>
  );
}

