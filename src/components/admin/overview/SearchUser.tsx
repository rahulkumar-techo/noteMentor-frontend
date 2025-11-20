import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchUsers() {
  return (
    <Card className="rounded-2xl p-4 w-full">
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-sm sm:text-base">Search Users</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by name or email"
            className="text-sm py-1 sm:py-2"
          />
          <Button
            variant="ghost"
            aria-label="search"
            className="p-2 sm:p-3"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
