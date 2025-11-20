/**
 * UsersList.tsx
 * -----------------------
 * Responsive User List for NoteMentor
 *
 * - Table on md+ (desktop/tablet)
 * - Card/stack on small screens (mobile)
 * - Client-side search, sort, and pagination
 * - Uses shadcn-style primitives: Card, Badge, Button, Input, Avatar
 *
 * Usage:
 *  <UsersList /> -- uses internal mock data
 *  OR pass `users` prop for real data:
 *  <UsersList users={usersFromApi} />
 *
 * Note: This is UI + client-side logic. Replace mock data with API calls (React Query / RTK Query) as needed.
 */

"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  joinedAt: string; // ISO date
  avatar?: string;
  status?: "active" | "inactive";
};

const MOCK_USERS: User[] = [
  { id: "u1", name: "Asha Verma", email: "asha@example.com", role: "student", joinedAt: "2025-01-12", avatar: "", status: "active" },
  { id: "u2", name: "Ravi Kumar", email: "ravi@example.com", role: "teacher", joinedAt: "2024-11-03", avatar: "", status: "active" },
  { id: "u3", name: "Sneha Patel", email: "sneha@example.com", role: "student", joinedAt: "2025-03-22", avatar: "", status: "inactive" },
  { id: "u4", name: "Manish Sharma", email: "manish@example.com", role: "teacher", joinedAt: "2024-09-30", avatar: "", status: "active" },
  { id: "u5", name: "Priya R", email: "priya@example.com", role: "student", joinedAt: "2025-02-14", avatar: "", status: "active" },
  { id: "u6", name: "Karan Mehta", email: "karan@example.com", role: "admin", joinedAt: "2023-12-05", avatar: "", status: "active" },
  { id: "u7", name: "Neha Joshi", email: "neha@example.com", role: "student", joinedAt: "2025-04-01", avatar: "", status: "active" },
  { id: "u8", name: "Siddharth", email: "siddharth@example.com", role: "student", joinedAt: "2025-05-09", avatar: "", status: "inactive" },
  { id: "u9", name: "Rekha Devi", email: "rekha@example.com", role: "teacher", joinedAt: "2024-10-20", avatar: "", status: "active" },
  { id: "u10", name: "Vikram", email: "vikram@example.com", role: "student", joinedAt: "2025-06-12", avatar: "", status: "active" },
];

export default function UsersList({ users }: { users?: User[] }) {
  const data = users ?? MOCK_USERS;

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "joinedAt">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Derived / filtered data
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = data.filter((u) => {
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toString().toLowerCase().includes(q)
      );
    });

    out.sort((a, b) => {
      let lhs: string | number = "";
      let rhs: string | number = "";
      if (sortBy === "name") {
        lhs = a.name.toLowerCase();
        rhs = b.name.toLowerCase();
      } else if (sortBy === "email") {
        lhs = a.email.toLowerCase();
        rhs = b.email.toLowerCase();
      } else {
        lhs = new Date(a.joinedAt).getTime();
        rhs = new Date(b.joinedAt).getTime();
      }
      if (lhs < rhs) return sortDir === "asc" ? -1 : 1;
      if (lhs > rhs) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return out;
  }, [data, query, sortBy, sortDir]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Helpers
  function toggleSort(field: "name" | "email" | "joinedAt") {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  return (
    <Card className="rounded-2xl p-4 w-full">
      <CardHeader className="p-0 mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <CardTitle className="text-base">Users</CardTitle>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-[320px]">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email or role"
              className="pr-10"
            />
            <Button variant="ghost" aria-label="search" className="hidden sm:inline-flex">
              <SearchIcon />
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setSortBy("name");
                setSortDir("asc");
                setPage(1);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* TABLE for md+ */}
        <div className="hidden md:block">
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full divide-y">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    User
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("email")}
                  >
                    Email
                    <SortIndicator field="email" sortBy={sortBy} sortDir={sortDir} />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Role
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("joinedAt")}
                  >
                    Joined
                    <SortIndicator field="joinedAt" sortBy={sortBy} sortDir={sortDir} />
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y">
                {pageData.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {u.avatar ? (
                            <AvatarImage src={u.avatar} alt={u.name} />
                          ) : (
                            <AvatarFallback>{initials(u.name)}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>

                    <td className="px-4 py-3">
                      <RoleBadge role={u.role} />
                    </td>

                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(u.joinedAt)}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button size="sm" variant="ghost">View</Button>
                        <Button size="sm">Message</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD/STACK for small screens */}
        <div className="md:hidden space-y-3">
          {pageData.map((u) => (
            <div key={u.id} className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  {u.avatar ? <AvatarImage src={u.avatar} alt={u.name} /> : <AvatarFallback>{initials(u.name)}</AvatarFallback>}
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                  <div className="text-xs mt-1"><RoleBadge role={u.role} /></div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-muted-foreground">{formatDate(u.joinedAt)}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">View</Button>
                  <Button size="sm">Msg</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> -{" "}
            <span className="font-medium">{Math.min(page * pageSize, total)}</span> of{" "}
            <span className="font-medium">{total}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>

            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: pages }).map((_, i) => {
                const idx = i + 1;
                return (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`px-2 py-1 rounded-md text-sm ${page === idx ? "bg-primary text-white" : "text-sm text-muted-foreground hover:bg-muted/40"}`}
                  >
                    {idx}
                  </button>
                );
              })}
            </div>

            <Button
              size="sm"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Small helper components & utils ---------- */

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(); // uses user locale; change to custom format if needed
  } catch {
    return iso;
  }
}

function RoleBadge({ role }: { role: User["role"] }) {
  if (role === "student") return <Badge className="text-xs">Student</Badge>;
  if (role === "teacher") return <Badge className="text-xs">Teacher</Badge>;
  return <Badge variant="secondary" className="text-xs">Admin</Badge>;
}

function SortIndicator({ field, sortBy, sortDir }: { field: "email" | "joinedAt", sortBy: string, sortDir: string }) {
  if (sortBy !== field) return <span className="inline-block ml-2 text-muted-foreground">↕</span>;
  return <span className="inline-block ml-2">{sortDir === "asc" ? "↑" : "↓"}</span>;
}

function SearchIcon() {
  // small inline icon (lucide equivalent), avoids extra import for small button
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  );
}
