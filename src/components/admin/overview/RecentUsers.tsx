import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function RecentUsers() {
    return (
        <Card className="rounded-2xl p-4 w-full">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm sm:text-base">Recent Users</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-40 sm:h-48 overflow-y-auto">
                    <ul className="space-y-3 p-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex items-center justify-between rounded-lg p-2 hover:bg-muted transition text-sm"
                            >
                                <div>
                                    <div className="font-medium">User {i + 1}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                        user{i + 1}@example.com
                                    </div>
                                </div>
                                <Badge className="text-xs sm:text-sm">New</Badge>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
