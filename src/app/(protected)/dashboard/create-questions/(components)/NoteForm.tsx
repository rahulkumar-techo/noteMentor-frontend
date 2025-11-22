/**
 * 🌙 Responsive Stylish NoteForm (Dark Mode Optimized)
 * - Fully responsive grid layout
 * - Dark mode with black background and soft contrasts
 * - Elegant transitions and spacing
 * - Ideal for NoteMentor's AI Question Generator
 */

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { questionValidation, QuestionValidationType } from "../../../../../components/note/note.schema";
import { Spinner } from "../../../../../components/ui/spinner";
import { Brain } from "lucide-react";

const NoteForm = () => {
  const form = useForm<QuestionValidationType>({
    resolver: zodResolver(questionValidation),
    defaultValues: {
      topic: "",
      questionType: "mcq",
      difficulty: "medium",
      quantity: 5,
      quality: "normal",
      language: "English",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>()

  const onSubmit = (data: QuestionValidationType) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    console.log("🧾 Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center px-0 lg:px-4  transition-colors duration-300">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className=" flex items-center justify-center gap-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
           <Brain className="" color="#c9b54f" size={60} /> <span>Generate AI Questions</span>
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Customize your question set below and let AI do the rest
          </p>
        </CardHeader>

        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Topic */}
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-2">
                    <FormLabel className="dark:text-gray-200">Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Photosynthesis, Algebra, Indian History..."
                        className="dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="dark:text-gray-400">
                      Enter the topic or concept you want to generate questions for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Question Type */}
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Question Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                        <SelectItem value="mcq">MCQ</SelectItem>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="long">Long Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="dark:text-gray-400">
                      Choose the format of questions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Difficulty */}
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Difficulty
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="dark:text-gray-400">
                      Choose the question difficulty level.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-2">
                    <FormLabel className="dark:text-gray-200">
                      Number of Questions:{" "}
                      <span className="font-semibold">{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                        className="dark:[&>span]:bg-indigo-500"
                      />
                    </FormControl>
                    <FormDescription className="dark:text-gray-400">
                      Choose how many questions to generate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quality */}
              <FormField
                control={form.control}
                name="quality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Quality
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="dark:text-gray-400">
                      Higher quality provides more accurate and detailed output.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Language
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-zinc-800 dark:text-gray-100">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Hinglish">Hinglish</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="dark:text-gray-400">
                      Select the preferred language for your questions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-1 sm:col-span-2 flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.03] bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                 {typeof window !== "undefined" && isLoading ? <Spinner /> : null}
                  Generate
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteForm;
