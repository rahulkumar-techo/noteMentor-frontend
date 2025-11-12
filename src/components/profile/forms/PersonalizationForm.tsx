"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUpdatePersonalizationMutation } from "@/feature/user/userApi";


const schema = z.object({
  learningSpeed: z.enum(["fast", "moderate", "slow"]),
  goalType: z.enum(["score_improvement", "concept_clarity", "revision"]),
  focusDuration: z.coerce.number().min(10),
  noteUploadType: z.enum(["handwritten", "typed", "mixed"]),
});

export default function PersonalizationForm({ user, setOpen }: any) {
  const [updatePersonalization] = useUpdatePersonalizationMutation();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      learningSpeed: user?.personalization?.learningSpeed || "moderate",
      goalType: user?.personalization?.goalType || "concept_clarity",
      focusDuration: user?.personalization?.focusDuration || 30,
      noteUploadType: user?.personalization?.noteUploadType || "handwritten",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsSaving(true);
      toast.loading("Updating learning preferences...");
      await updatePersonalization(values).unwrap();
      toast.dismiss();
      toast.success("Personalization updated 🧠");
      setOpen(false);
    } catch {
      toast.dismiss();
      toast.error("Failed to update personalization");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-white">
        <FormField control={form.control} name="learningSpeed" render={({ field }) => (
          <FormItem>
            <FormLabel>Learning Speed</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="fast">Fast</option>
              <option value="moderate">Moderate</option>
              <option value="slow">Slow</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="goalType" render={({ field }) => (
          <FormItem>
            <FormLabel>Goal Type</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="score_improvement">Score Improvement</option>
              <option value="concept_clarity">Concept Clarity</option>
              <option value="revision">Revision</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="focusDuration" render={({ field }) => (
          <FormItem>
            <FormLabel>Focus Duration (minutes)</FormLabel>
            <FormControl><input type="number" {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="noteUploadType" render={({ field }) => (
          <FormItem>
            <FormLabel>Note Upload Type</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="handwritten">Handwritten</option>
              <option value="typed">Typed</option>
              <option value="mixed">Mixed</option>
            </select>
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
