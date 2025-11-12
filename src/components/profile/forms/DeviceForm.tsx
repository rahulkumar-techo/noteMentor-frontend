"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUpdateDeviceMutation } from "@/feature/user/userApi";


const schema = z.object({
  deviceType: z.enum(["mobile", "tablet", "pc"]),
  offlineMode: z.boolean(),
  storageSync: z.enum(["local", "cloud"]),
  theme: z.enum(["light", "dark", "auto"]),
});

export default function DeviceForm({ user, setOpen }: any) {
  const [updateDevice] = useUpdateDeviceMutation();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      deviceType: user?.settings?.deviceType || "mobile",
      offlineMode: user?.settings?.offlineMode || false,
      storageSync: user?.settings?.storageSync || "cloud",
      theme: user?.settings?.theme || "auto",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsSaving(true);
      toast.loading("Updating device settings...");
      await updateDevice(values).unwrap();
      toast.dismiss();
      toast.success("Device settings updated ⚙️");
      setOpen(false);
    } catch {
      toast.dismiss();
      toast.error("Failed to update device settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-white">
        <FormField control={form.control} name="deviceType" render={({ field }) => (
          <FormItem>
            <FormLabel>Device Type</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="pc">PC</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="offlineMode" render={({ field }) => (
          <FormItem>
            <FormLabel>Offline Mode</FormLabel>
            <input type="checkbox" {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} className="ml-2" />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="storageSync" render={({ field }) => (
          <FormItem>
            <FormLabel>Storage Sync</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="local">Local</option>
              <option value="cloud">Cloud</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="theme" render={({ field }) => (
          <FormItem>
            <FormLabel>Theme</FormLabel>
            <select {...field} className="w-full p-2 rounded-lg bg-white/10 border border-white/20">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
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
