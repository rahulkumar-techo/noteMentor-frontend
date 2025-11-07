/**
 * ⚙️ Settings Page (NoteMentor)
 * - List-style settings layout (no card)
 * - Fully responsive + dark mode compatible
 * - Type-safe with React Hook Form + Zod
 */

"use client";

import React from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

// ✅ Schema (no .default() for cleaner typing)
export const deviceValidation = z.object({
    deviceType: z.enum(["mobile", "tablet", "pc"]),
    offlineMode: z.boolean(),
    storageSync: z.enum(["local", "cloud"]),
    theme: z.enum(["light", "dark", "auto"]),
});

export type DeviceValidationType = z.infer<typeof deviceValidation>;

const SettingsPage = () => {
    const { setTheme } = useTheme()
    const form = useForm<DeviceValidationType>({
        resolver: zodResolver(deviceValidation),
        defaultValues: {
            deviceType: "mobile",
            offlineMode: false,
            storageSync: "cloud",
            theme: "auto",
        },
    });
    const handleThemeChange = (value: "light" | "dark" | "auto") => {
        form.setValue("theme", value);
        setTheme(value === "auto" ? "system" : value);
    };

    const onSubmit: SubmitHandler<DeviceValidationType> = (data) => {

        console.log("⚙️ Saved Settings:", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center py-8 transition-colors duration-300">
            <div className="w-full px-4">
                <h1 className="text-3xl font-semibold mb-6 text-center">
                    ⚙️ App Settings
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2 border border-gray-200 dark:border-zinc-800 rounded-xl divide-y divide-gray-200 dark:divide-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm"
                    >
                        {/* Device Type */}
                        <FormField
                            control={form.control}
                            name="deviceType"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                                    <div>
                                        <FormLabel className="font-medium text-gray-800 dark:text-gray-200">
                                            Device Type
                                        </FormLabel>
                                        <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose your primary device type.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-32 dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700">
                                                <SelectValue placeholder="Device" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                                                <SelectItem value="mobile">Mobile</SelectItem>
                                                <SelectItem value="tablet">Tablet</SelectItem>
                                                <SelectItem value="pc">PC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Storage Sync */}
                        <FormField
                            control={form.control}
                            name="storageSync"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                                    <div>
                                        <FormLabel className="font-medium text-gray-800 dark:text-gray-200">
                                            Storage Sync
                                        </FormLabel>
                                        <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                                            Select where your data should be saved.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-32 dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700">
                                                <SelectValue placeholder="Storage" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                                                <SelectItem value="local">Local</SelectItem>
                                                <SelectItem value="cloud">Cloud</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Theme */}
                        <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                                    <div>
                                        <FormLabel className="font-medium text-gray-800 dark:text-gray-200">
                                            Theme
                                        </FormLabel>
                                        <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose your preferred display mode.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select
                                            onValueChange={(val) => handleThemeChange(val as "light" | "dark" | "auto")}
                                            value={field.value}>
                                            <SelectTrigger className="w-32 dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700">
                                                <SelectValue placeholder="Theme" />
                                            </SelectTrigger>
                                            <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="auto">Auto</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Offline Mode */}
                        <FormField
                            control={form.control}
                            name="offlineMode"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                                    <div>
                                        <FormLabel className="font-medium text-gray-800 dark:text-gray-200">
                                            Offline Mode
                                        </FormLabel>
                                        <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                                            Enable offline access for NoteMentor.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Save Button */}
                        <div className="flex justify-center py-4">
                            <Button
                                type="submit"
                                className="px-8 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300"
                            >
                                Save Settings
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SettingsPage;
