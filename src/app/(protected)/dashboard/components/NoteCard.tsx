/**
 * Reusable NoteCard Component (NoteMentor)
 * Features:
 * - Fully customizable (title, description, icon, image, footer)
 * - Supports dark mode
 * - Responsive with hover animation
 * - Ideal for dashboards, notes, subjects, and quizzes
 */

"use client"

import React from "react"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NoteCardProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  image?: string
  footerAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  description,
  icon,
  image,
  footerAction,
  className,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-[#FFD700]/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-[#121214] text-gray-900 dark:text-white",
        className
      )}
    >
      {/* Header */}
      <CardHeader className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#FFD700]/10">
        <div className="flex items-center gap-3">
          {icon && <div className="text-[#FFD700]">{icon}</div>}
          <CardTitle className="text-lg font-semibold tracking-wide">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      {/* Image */}
      {image && (
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      {description && (
        <CardContent className="p-4 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </CardContent>
      )}

      {/* Footer */}
      {footerAction && (
        <CardFooter className="p-4 border-t border-gray-100 dark:border-[#FFD700]/10">
          <Button
            onClick={footerAction.onClick}
            variant="outline"
            className="w-full border-gray-300 dark:border-[#FFD700]/40 dark:text-[#FFD700] hover:bg-gray-100 dark:hover:bg-[#FFD700] dark:hover:text-black transition-all"
          >
            {footerAction.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default NoteCard
