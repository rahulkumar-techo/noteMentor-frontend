"use client";

/**
 * ProfileForm.tsx
 * ------------------------------------------------------
 * Editable Shadcn form using React Hook Form + Zod + React Hot Toast.
 * Provides full type safety, validation, and responsive form layout.
 */

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const profileSchema = z.object({
  fullname: z.string().min(2, "Full name required"),
  board: z.string().optional(),
  classOrYear: z.string().optional(),
  languagePreference: z.enum(["english", "hindi", "hinglish"]).optional(),
  learningSpeed: z.enum(["fast", "moderate", "slow"]).optional(),
  goalType: z.enum(["score_improvement", "concept_clarity", "revision"]).optional(),
  focusDuration: z.string().optional(),
  theme: z.enum(["auto", "light", "dark"]).optional(),
});

export default function ProfileForm({
  user,
  setOpen,
}: {
  user: any;
  setOpen: (val: boolean) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      board: user?.academic?.board || "",
      classOrYear: user?.academic?.classOrYear || "",
      languagePreference: user?.academic?.languagePreference || "english",
      learningSpeed: user?.personalization?.learningSpeed || "moderate",
      goalType: user?.personalization?.goalType || "concept_clarity",
      focusDuration: String(user?.personalization?.focusDuration || "30"),
      theme: user?.settings?.theme || "auto",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      setIsSaving(true);
      toast.loading("Updating your profile...");

      // Simulate API call (replace with RTK mutation or axios.patch)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.dismiss();
      toast.success("Profile updated successfully 🎉");
      setOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Try again!");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-white"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Board */}
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board</FormLabel>
              <FormControl>
                <Input {...field} placeholder="CBSE / ICSE / State Board" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class / Year */}
        <FormField
          control={form.control}
          name="classOrYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class or Year</FormLabel>
              <FormControl>
                <Input {...field} placeholder="10th / 12th / 1st Year" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Language */}
        <FormField
          control={form.control}
          name="languagePreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language Preference</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="hinglish">Hinglish</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Learning Speed */}
        <FormField
          control={form.control}
          name="learningSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Speed</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select speed" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="slow">Slow</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Goal Type */}
        <FormField
          control={form.control}
          name="goalType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="score_improvement">Score Improvement</SelectItem>
                  <SelectItem value="concept_clarity">Concept Clarity</SelectItem>
                  <SelectItem value="revision">Revision</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Focus Duration */}
        <FormField
          control={form.control}
          name="focusDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Duration (minutes)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="5" max="180" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Theme */}
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Preference</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
