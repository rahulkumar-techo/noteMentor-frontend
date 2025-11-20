"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function RolePermissionForm() {
  const permissionGroups = {
    "User Management": [
      "View Users",
      "Create User",
      "Edit User",
      "Delete User",
    ],
    "Notes Management": [
      "View Notes",
      "Create Notes",
      "Edit Notes",
      "Delete Notes",
    ],
    "System Settings": [
      "Access Settings",
      "Manage Roles",
      "View Logs",
      "Clear Cache",
    ],
  };

  const [selected, setSelected] = useState<string[]>([]);

  const togglePermission = (perm: string) => {
    setSelected((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const toggleGroup = (perms: string[]) => {
    const allSelected = perms.every((p) => selected.includes(p));
    if (allSelected) {
      setSelected((prev) => prev.filter((p) => !perms.includes(p)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...perms])]);
    }
  };

  const handleSelectAll = () => {
    const allPerms = Object.values(permissionGroups).flat();
    setSelected(allPerms);
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  return (
    <Card className="w-full p-4 sm:p-6 rounded-2xl shadow-sm">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg sm:text-xl">
          Role & Permission Setup
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Role Name & Description */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Role Name</label>
            <Input placeholder="e.g. Admin, Teacher, Viewer" />
          </div>

          <div>
            <label className="text-sm font-medium">Role Description</label>
            <Textarea rows={3} placeholder="Short description of this role..." />
          </div>
        </div>

        <Separator />

        {/* Permission Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-between">
          <h2 className="text-base font-semibold">Permissions</h2>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Permission Groups */}
        <div className="space-y-6">
          {Object.entries(permissionGroups).map(([group, perms]) => (
            <div key={group} className="border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm sm:text-base">{group}</h3>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleGroup(perms)}
                  className="text-xs sm:text-sm px-2"
                >
                  Toggle Group
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {perms.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(perm)}
                      onCheckedChange={() => togglePermission(perm)}
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Selected Permissions:</h4>

          {selected.length ? (
            <div className="flex flex-wrap gap-2">
              {selected.map((p) => (
                <Badge key={p} variant="secondary">
                  {p}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No permissions selected.</p>
          )}
        </div>

        <Separator />

        {/* Submit */}
        <Button className="w-full sm:w-auto">Save Role</Button>
      </CardContent>
    </Card>
  );
}
