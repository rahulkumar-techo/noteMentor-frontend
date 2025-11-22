// components/upload/TitleDescription.tsx
// Left column: title + description using react-hook-form.

"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { NoteFormValues } from "../NoteUploadForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: UseFormReturn<NoteFormValues>;
  isUploading?: boolean;
}

export default function TitleDescription({ form, isUploading = false }: Props) {
  return (
    <div className="p-6 rounded-2xl border  shadow-sm flex flex-col gap-2.5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} disabled={isUploading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="descriptions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={isUploading} className="min-h-[140px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
