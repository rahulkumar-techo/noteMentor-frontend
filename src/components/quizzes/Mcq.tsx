/**
 * 📚 Topic MCQ Accordion (Shadcn UI)
 * - Each topic expands to show multiple MCQ questions
 * - Each question allows single option selection
 * - Dark mode + gold-accent styling
 * - Ideal for subject/topic-based quizzes
 */

"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
}

interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

interface TopicMcqAccordionProps {
  topics: Topic[];
  showAnswers?: boolean;
}

export default function TopicMcqAccordion({
  topics,
  showAnswers = false,
}: TopicMcqAccordionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const handleSelect = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-4">
        🧠 Practice by Topic
      </h2>

      <Accordion type="multiple" className="w-full space-y-2">
        {topics.map((topic) => (
          <AccordionItem
            key={topic.id}
            value={topic.id}
            className="border border-gray-800 rounded-xl bg-[#0d0d0f]/60 backdrop-blur-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold text-left hover:text-[#FFD700]">
              {topic.title}
            </AccordionTrigger>

            <AccordionContent className="px-4 py-4 space-y-4">
              {topic.questions.map((q) => (
                <div
                  key={q.id}
                  className="border border-gray-800 rounded-lg p-3 space-y-2"
                >
                  <p className="font-medium text-gray-200">{q.question}</p>

                  <div className="space-y-2">
                    {q.options.map((option) => {
                      const isSelected = selectedAnswers[q.id] === option;
                      const isCorrect = q.correctAnswer === option;

                      return (
                        <Button
                          key={option}
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left text-sm border-gray-700 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all",
                            isSelected &&
                              "border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10",
                            showAnswers &&
                              isCorrect &&
                              "border-green-500 text-green-400"
                          )}
                          onClick={() => handleSelect(q.id, option)}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>

                  {showAnswers && (
                    <p className="text-sm mt-2 text-gray-400">
                      ✅ Correct Answer:{" "}
                      <span className="text-[#FFD700] font-medium">
                        {q.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
