

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useUpdateNoteSettingsMutation } from "@/feature/note/noteApi";
import useApiMessage from "@/hooks/api-message";

const noteSettingsSchema = z.object({
    visibility: z.enum(["private", "public", "shared"]).optional(),
    sharedWith: z.union([z.array(z.string()), z.string()]).optional(),
    shareLink: z.string().optional(),
    allowComments: z.boolean().optional(),
    allowDownloads: z.boolean().optional(),
});

type NoteSettingsForm = z.infer<typeof noteSettingsSchema>;

type Props = {
    noteId: string;
    defaultValues?: Partial<NoteSettingsForm>;
};

export default function NoteSettings({ noteId, defaultValues }: Props) {
    const form = useForm<NoteSettingsForm>({
        resolver: zodResolver(noteSettingsSchema),
        defaultValues: {
            visibility: defaultValues?.visibility ?? "public",
            sharedWith: Array.isArray(defaultValues?.sharedWith)
                ? defaultValues?.sharedWith.join(", ")
                : (defaultValues?.sharedWith as string) ?? "",
            shareLink: defaultValues?.shareLink ?? "",
            allowComments: defaultValues?.allowComments ?? true,
            allowDownloads: defaultValues?.allowDownloads ?? true,
        },
    });

    const [updateSettings, { isLoading, isSuccess, isError, error, data }] = useUpdateNoteSettingsMutation();
    useApiMessage({ isSuccess, isError, error, successMessage: data?.message })
    console.log(data)

    const onSubmit = async (values: NoteSettingsForm) => {
        try {
            // Convert sharedWith from comma-separated string → array before API
            const formattedValues = {
                ...values,
                sharedWith:
                    typeof values.sharedWith === "string"
                        ? values.sharedWith
                            .split(",")
                            .map((id) => id.trim())
                            .filter((id) => id.length > 0)
                        : values.sharedWith,
            };
            await updateSettings({ id: noteId, settings: formattedValues }).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl w-full mx-auto md:p-4 p-3 text-sm sm:text-base">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#FFD700]">Note Settings</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    {/* Visibility */}
                    <FormField
                        control={form.control}
                        name="visibility"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Visibility</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full text-sm">
                                            <SelectValue placeholder="Choose visibility" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="shared">Shared</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Shared With */}
                    <FormField
                        control={form.control}
                        name="sharedWith"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Shared With (comma-separated IDs)</FormLabel>
                                <FormControl>
                                    <Input {...field} className="text-sm" placeholder="userId1, userId2" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Share Link */}
                    <FormField
                        control={form.control}
                        name="shareLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Share Link</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} className="text-sm" placeholder="https://... or leave empty" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="allowComments"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <div>
                                        <FormLabel className="text-sm font-medium">Allow Comments</FormLabel>
                                        <p className="text-xs text-gray-400">Enable comments on this note</p>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="allowDownloads"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <div>
                                        <FormLabel className="text-sm font-medium">Allow Downloads</FormLabel>
                                        <p className="text-xs text-gray-400">Allow users to download this note</p>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                        <Button type="submit" size="sm" disabled={isLoading} className="text-sm px-4 py-2">
                            {isLoading ? "Saving..." : "Save Settings"}
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => form.reset()} className="text-sm px-4 py-2">
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}