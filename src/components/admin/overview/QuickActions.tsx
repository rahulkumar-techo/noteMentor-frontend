import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
    return (
        <Card className="rounded-2xl p-4 w-full">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm sm:text-base">Quick Actions</CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-2">
                <div className="flex flex-col gap-2">
                    <Button className="w-full text-sm sm:text-base">Create New Note</Button>
                    <Button variant="outline" className="w-full text-sm sm:text-base">Invite Teacher</Button>
                    <Button variant="ghost" className="w-full text-sm sm:text-base">Export CSV</Button>
                </div>
            </CardContent>
        </Card>
    );
}
