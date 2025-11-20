"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function RecentUsers({ users }: any) {
    const userList = users || [];

    return (
        <Card className="rounded-2xl p-4 w-full">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm sm:text-base">
                    Recent Users
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-40 sm:h-48 overflow-y-auto">
                    <ul className="space-y-3 p-2">
                        {userList.map((user: any, idx: number) => (
                            <li
                                key={user._id}
                                className="flex items-center justify-between rounded-lg p-2 hover:bg-muted transition text-sm"
                            >
                                <div>
                                    <div className="font-medium truncate">{user.fullname}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground truncate">
                                        {user.email}
                                    </div>
                                </div>

                                <Badge className="text-xs sm:text-sm capitalize">
                                    {user.role}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
