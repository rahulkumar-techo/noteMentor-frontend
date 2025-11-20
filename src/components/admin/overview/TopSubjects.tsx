import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopSubjects() {
    const topSubjects = [
        { name: "Mathematics", notes: 1820 },
        { name: "Physics", notes: 1420 },
        { name: "Chemistry", notes: 980 },
        { name: "English", notes: 760 },
    ];

    return (
        <Card className="rounded-2xl p-4 w-full">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm sm:text-base">Top Subjects</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <ul className="space-y-3">
                    {topSubjects.map((t) => (
                        <li
                            key={t.name}
                            className="flex items-center justify-between gap-2"
                        >
                            <div>
                                <div className="font-medium text-sm sm:text-base">
                                    {t.name}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                    {t.notes} notes
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs sm:text-sm px-2 sm:px-3"
                            >
                                View
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
