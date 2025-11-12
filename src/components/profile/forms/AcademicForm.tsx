"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUpdateAcademicMutation } from "@/feature/user/userApi";


const schema = z.object({
  board: z.string().min(2, "Board required"),
  classOrYear: z.string().min(1, "Class/Year required"),
  languagePreference: z.enum(["english", "hindi", "hinglish"]),
  examGoal: z.string().optional(),
});

export default function AcademicForm({ user, setOpen }: any) {
  const [updateAcademic] = useUpdateAcademicMutation();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      board: user?.academic?.board || "",
      classOrYear: user?.academic?.classOrYear || "",
      languagePreference: user?.academic?.languagePreference || "english",
      examGoal: user?.academic?.examGoal || "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsSaving(true);
      toast.loading("Updating academic info...");
      await updateAcademic(values).unwrap();
      toast.dismiss();
      toast.success("Academic info updated 🎓");
      setOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-white">
        <FormField control={form.control} name="board" render={({ field }) => (
          <FormItem>
            <FormLabel>Board</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="classOrYear" render={({ field }) => (
          <FormItem>
            <FormLabel>Class or Year</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="languagePreference" render={({ field }) => (
          <FormItem>
            <FormLabel>Language Preference</FormLabel>
            <select
              {...field}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="hinglish">Hinglish</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="examGoal" render={({ field }) => (
          <FormItem>
            <FormLabel>Exam Goal</FormLabel>
            <FormControl><Input {...field} placeholder="e.g. NEET / JEE" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}
