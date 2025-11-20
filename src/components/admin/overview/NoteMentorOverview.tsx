"use client";
import { FiltersPanel } from "./FileFillter";
import { MonthlyActivity } from "./MonthlyActivity";
import { OverviewHeader } from "./OverviewHeader";
import { QuickActions } from "./QuickActions";
import { RecentUsers } from "./RecentUsers";
import { SearchUsers } from "./SearchUser";
import { StatsGrid } from "./StatsGrid";
import { TopSubjects } from "./TopSubjects";
import { Separator } from "@/components/ui/separator";

export default function NoteMentorOverview() {

    // get all users;

    // get all notes;

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto w-full">
            <OverviewHeader />
            <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
                <section className="lg:col-span-3 space-y-6">
                    <StatsGrid />
                    <MonthlyActivity />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TopSubjects />
                        <RecentUsers />
                    </div>
                </section>
                <aside className="lg:col-span-1 space-y-6">
                    <QuickActions />
                    <FiltersPanel />
                    <SearchUsers />
                </aside>
            </main>
            <Separator className="my-6" />
            <footer className="text-xs sm:text-sm text-muted-foreground text-center">
                🩷 Notementor
            </footer>
        </div>
    );
}
