

"use client"

import React from "react"
import NoteCard from "./components/NoteCard"
import {
  Brain,
  BookOpen,
  FlaskConical,
  PenTool,
  Calculator,
  Globe2,
} from "lucide-react"
import Link from "next/link"

const DashboardPage = () => {
  const cards = [
    {
      title: "Physics Notes",
      description: "Chapter 4: Laws of Motion — concise explanations and solved examples.",
      icon: <FlaskConical className="w-5 h-5" />,
      footerAction: { label: "View Notes", onClick: () => console.log("View Physics Notes") },
    },
    {
      title: "AI Quiz",
      description: "Challenge your understanding of neural networks and deep learning.",
      icon: <Brain className="w-5 h-5" />,
      footerAction: { label: "Start Quiz", onClick: () => console.log("Quiz started") },
    },
    {
      title: "Math Practice",
      description: "Solve interactive problems on algebra, geometry, and trigonometry.",
      icon: <Calculator className="w-5 h-5" />,
      footerAction: { label: "Start Practice", onClick: () => console.log("Math Practice") },
    },
    {
      title: "English Writing",
      description: "Improve your grammar and essay writing skills with AI-guided exercises.",
      icon: <PenTool className="w-5 h-5" />,
      footerAction: { label: "Start Writing", onClick: () => console.log("English Writing") },
    },
    {
      title: "Chemistry Experiments",
      description: "Explore organic and inorganic reactions visually and interactively.",
      icon: <FlaskConical className="w-5 h-5" />,
      footerAction: { label: "Explore", onClick: () => console.log("Chemistry Experiments") },
    },
    {
      title: "Geography Insights",
      description: "Discover the world with interactive maps, videos, and concept visuals.",
      icon: <Globe2 className="w-5 h-5" />,
      footerAction: { label: "View Topics", onClick: () => console.log("Geography Insights") },
    },
  ]

  const stats = [
    { label: "Quiz Accuracy", value: 82, color: "text-green-500" },
    { label: "Completion Rate", value: 74, color: "text-blue-500" },
    { label: "Consistency", value: 91, color: "text-yellow-500" },
  ]

  return (

    <div className="min-h-screen w-full dark:bg-[#0d0d0f] py-10 px-6 md:px-12 transition-colors duration-300">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#FFD700] tracking-wide">
          Welcome to NoteMentor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your notes, attempt quizzes, and enhance your learning journey.
        </p>
        <Link href={"/dashboard/create-questions"}>Create questions</Link>
      </header>

      {/* Score Overview */}
      <section className="flex flex-wrap justify-center gap-10 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-gray-300 dark:text-gray-700" fill="transparent" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray={`${stat.value * 2.5}, 251`} className={`${stat.color} transition-all duration-700`} fill="transparent" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold text-lg dark:text-white">
                {stat.value}%
              </span>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Grid of Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center px-2">
        {cards.map((card, index) => (
          <div key={index} className="w-full max-w-md hover:-translate-y-1 transition-transform duration-300">
            <NoteCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              footerAction={card.footerAction}
            />
          </div>
        ))}
      </section>
    </div>
  )
}

export default DashboardPage
