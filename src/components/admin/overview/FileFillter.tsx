import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

export function FiltersPanel() {
    return (
        <Card className="rounded-2xl p-4 w-full">
            {/* Header */}
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm sm:text-base">
                    Filters
                </CardTitle>
            </CardHeader>

            {/* Tabs */}
            <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full">

                    {/* Tab Buttons */}
                    <TabsList className="grid w-full grid-cols-3 gap-1 sm:gap-2">
                        <TabsTrigger
                            value="all"
                            className="text-xs sm:text-sm py-1 sm:py-2"
                        >
                            All
                        </TabsTrigger>

                        <TabsTrigger
                            value="students"
                            className="text-xs sm:text-sm py-1 sm:py-2"
                        >
                            Students
                        </TabsTrigger>

                        <TabsTrigger
                            value="teachers"
                            className="text-xs sm:text-sm py-1 sm:py-2"
                        >
                            Teachers
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Content */}
                    <TabsContent
                        value="all"
                        className="p-2 sm:p-3 text-xs sm:text-sm text-muted-foreground"
                    >
                        Showing all users
                    </TabsContent>

                    <TabsContent
                        value="students"
                        className="p-2 sm:p-3 text-xs sm:text-sm text-muted-foreground"
                    >
                        Student only
                    </TabsContent>

                    <TabsContent
                        value="teachers"
                        className="p-2 sm:p-3 text-xs sm:text-sm text-muted-foreground"
                    >
                        Teacher only
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
