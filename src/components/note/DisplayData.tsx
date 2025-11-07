

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

const DisplayData = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  // Simulate loading / data fetch
  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);
    setTimeout(() => {
      setQuestions([
        "1️⃣ What is photosynthesis?",
        "2️⃣ Explain the process of chlorophyll absorption.",
        "3️⃣ Why are leaves green in color?",
        "4️⃣ Describe the importance of sunlight in photosynthesis.",
        "5️⃣ Write the chemical equation of photosynthesis.",
        "1️⃣ What is photosynthesis?",
        "2️⃣ Explain the process of chlorophyll absorption.",
        "3️⃣ Why are leaves green in color?",
        "4️⃣ Describe the importance of sunlight in photosynthesis.",
        "5️⃣ Write the chemical equation of photosynthesis.",
        "1️⃣ What is photosynthesis?",
        "2️⃣ Explain the process of chlorophyll absorption.",
        "3️⃣ Why are leaves green in color?",
        "4️⃣ Describe the importance of sunlight in photosynthesis.",
        "5️⃣ Write the chemical equation of photosynthesis.",
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full h-full border border-gray-200 shadow-md rounded-xl transition-all duration-300">
      <CardHeader className="">
        <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between">
          📋 Generated Output
          <Button
            onClick={handleGenerate}
            className="text-sm md:text-base px-3 py-1 md:px-4 md:py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[70vh] md:h-[80vh]  text-sm md:text-base">
        <ScrollArea className="h-full rounded-md pr-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin mb-2" />
              <p>Generating AI questions...</p>
            </div>
          ) : questions.length > 0 ? (
            <ul className="space-y-3 text-gray-800 dark:text-gray-100 transition-all duration-300">
              {questions.map((q, index) => (
                <li
                  key={index}
                  className="p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-800/60 hover:shadow-md transition-all duration-200 text-xs sm:text-sm md:text-base"
                >
                  {q}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>No data yet — generate questions using the form.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DisplayData;
