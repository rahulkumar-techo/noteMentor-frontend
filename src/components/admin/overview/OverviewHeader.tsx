"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

export function OverviewHeader({ users = [], notes = [] }: any) {
    const [openSearch, setOpenSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Debounced query (400ms)
    const debouncedQuery = useDebounce(inputValue, 400);

    // Apply filtering AFTER debounce
    const query = debouncedQuery.toLowerCase();

    // Filter users
    const filteredUsers = users.filter(
        (u: any) =>
            u.fullname.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
    );

    // Filter notes
    const filteredNotes =
        notes.notes?.filter((n: any) =>
            n.title?.toLowerCase().includes(query)
        ) || [];

    return (
        <header className="mb-6 flex flex-col gap-4">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                        Dashboard Overview
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        At-a-glance metrics and recent activity for NoteMentor.
                    </p>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setOpenSearch(!openSearch)}
                    >
                        {openSearch ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                        <span className="ml-2 hidden sm:inline">
                            {openSearch ? "Close" : "Search"}
                        </span>
                    </Button>

                    <Button className="text-sm sm:text-sm md:text-base">New Note</Button>
                </div>
            </div>

            {/* Search Expansion Panel */}
            <AnimatePresence>
                {openSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="bg-muted/40 p-4 rounded-xl shadow-sm border"
                    >
                        <Input
                            placeholder="Search users or notes..."
                            className="text-sm py-2"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                        />

                        {/* Results */}
                        <AnimatePresence>
                            {debouncedQuery.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    className="mt-4 space-y-4"
                                >
                                    {/* Users */}
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Users</h3>

                                        {filteredUsers.length === 0 ? (
                                            <p className="text-xs text-muted-foreground">
                                                No users found.
                                            </p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {filteredUsers.map((u: any) => (
                                                    <Link
                                                        key={u._id}
                                                        href={`/admin/users/${u._id}`}
                                                        className="block p-2 rounded-lg bg-white/50 dark:bg-black/30 border shadow-sm hover:bg-primary/10 transition"
                                                    >
                                                        <div className="font-medium text-sm">
                                                            {u.fullname}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {u.email}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Notes</h3>

                                        {filteredNotes.length === 0 ? (
                                            <p className="text-xs text-muted-foreground">
                                                No notes found.
                                            </p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {filteredNotes.map((n: any) => (
                                                    <Link
                                                        key={n._id}
                                                        href={`/notes/${n._id}`}
                                                        className=" p-2 rounded-lg bg-white/50 dark:bg-black/30 border shadow-sm hover:bg-primary/10 transition flex gap-2.5 "
                                                    >
                                                        <Image src ={n?.thumbnail?.secure_url} alt="thumbnail" width={50} height={50}/>
                                                        <div>
                                                            <div className="font-medium text-sm">
                                                                {n.title}
                                                            </div>
                                                            <div className="font-medium text-sm">
                                                                {n.descriptions}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
