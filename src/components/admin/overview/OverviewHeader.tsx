import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function OverviewHeader() {
    return (
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left Section */}
            <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    Dashboard Overview
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    At-a-glance metrics and recent activity for NoteMentor.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">

                {/* Search Bar + Export (Hidden on very small screens) */}
                <div className="hidden sm:flex items-center gap-2">
                    <Input
                        placeholder="Search users, notes..."
                        className="w-full sm:w-[200px] md:w-[260px]"
                    />
                    <Button variant="ghost" className="text-sm sm:text-sm md:text-base">
                        Export
                    </Button>
                </div>

                {/* New Note Button */}
                <Button className="text-sm sm:text-sm md:text-base w-full sm:w-auto">
                    New Note
                </Button>
            </div>
        </header>
    );
}
