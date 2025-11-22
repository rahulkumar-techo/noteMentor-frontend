"use client";

import TopicMcqAccordion from "@/components/quizzes/Mcq";


const topics = [
  {
    id: "t1",
    title: "JavaScript Basics",
    questions: [
      {
        id: "q1",
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["let", "var", "const", "static"],
        correctAnswer: "const",
      },
      {
        id: "q2",
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
        correctAnswer: "Netscape",
      },
    ],
  },
  {
    id: "t2",
    title: "React Fundamentals",
    questions: [
      {
        id: "q3",
        question: "What hook is used for managing component state?",
        options: ["useEffect", "useState", "useContext", "useMemo"],
        correctAnswer: "useState",
      },
      {
        id: "q4",
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON X Language",
          "None of the above",
        ],
        correctAnswer: "JavaScript XML",
      },
    ],
  },
  {
    id: "t3",
    title: "Data Structures",
    questions: [
      {
        id: "q5",
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Graph", "Tree"],
        correctAnswer: "Stack",
      },
      {
        id: "q6",
        question: "Which data structure is best for BFS traversal?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        correctAnswer: "Queue",
      },
    ],
  },
];

export default function QuizPage() {
  return (
    <div className="min-h-screen ">
      <TopicMcqAccordion topics={topics} showAnswers />
    </div>
  );
}
