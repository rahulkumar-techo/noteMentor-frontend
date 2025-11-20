import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsGrid() {
    const stats = [
        { title: "New Users", value: 1240, delta: "+8%" },
        { title: "Notes Created", value: 8320, delta: "+12%" },
        { title: "Active Students", value: 452, delta: "-2%" },
        { title: "Uploads", value: 2150, delta: "+5%" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
            {stats.map((s) => (
                <Card key={s.title} className="rounded-2xl p-4 shadow-sm">
                    <CardHeader className="p-0">
                        <CardTitle className="text-xs sm:text-sm font-medium">
                            {s.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 mt-2">
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-xl sm:text-2xl font-bold">
                                    {s.value.toLocaleString()}
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                    {s.delta}
                                </div>
                            </div>
                            <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                Live
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
