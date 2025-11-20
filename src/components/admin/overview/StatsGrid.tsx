"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsGrid({ users, notes, matrix }: any) {
    const totalUsers = users?.length || 0;
    const totalNotes = notes?.total || 0;


    // 🔥 FIX: Get current month index correctly
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const current = matrix?.matrix?.find((m: any) => m.month === currentMonth) || {
        usersRegistered: 0,
        notesCreated: 0,
    };

    const stats = [
        {
            title: "New Users (This Month)",
            value: current.usersRegistered,
        },
        {
            title: "Notes Created (This Month)",
            value: current.notesCreated,
        },
        {
            title: "Total Users",
            value: totalUsers,
        },
        {
            title: "Total Notes",
            value: totalNotes,
        },
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
                                    {s.value?.toLocaleString()}
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

