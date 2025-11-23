import { dashboard, mobileRes } from "@/assets";
import { IMAGES } from "./images";

export const FEATURE_SECTIONS = [
  {
    id: "ai-intelligence",
    title: "AI-Powered Note Intelligence",
    description:
      "Transform raw notes into structured study material with powerful AI tools designed for students.",
    points: [
      "OCR for handwritten and printed notes",
      "Keyword extraction & semantic classification",
      "Multi-level smart summarization",
      "Auto-generated quizzes & flashcards",
      "Hindi, English & Hinglish support",
    ],
    image: IMAGES.aiSummary,
  },

  {
    id: "social-learning",
    title: "Social Learning Ecosystem",
    description:
      "A collaborative layer that connects learners, educators, and creators through notes.",
    points: [
      "Create verified learning communities",
      "Engage through replies, likes & threads",
      "Follow creators and join subject groups",
      "Public, private & class-based sharing",
    ],
    image: IMAGES.socialFeed,
  },

  {
    id: "exam-tools",
    title: "Exam-Oriented Study Tools",
    description:
      "Tailored study boosters made for exam preparation and high-performance revisions.",
    points: [
      "Adaptive quizzes tailored to weak areas",
      "Chapter-wise mock tests",
      "Auto-generated flashcards",
      "Offline reading mode",
    ],
    image: IMAGES.flashcards,
  },

  /* =====================
     NEW FEATURES
  ====================== */

  {
    id: "analytics-dashboard",
    title: "Smart Analytics Dashboard",
    description:
      "Understand your learning performance and strengths using real-time analytics and progress stats.",
    points: [
      "Accuracy & speed tracking",
      "Weak-topic prediction",
      "Time-based study insights",
      "Progress heatmaps",
    ],
    image:dashboard,
  },


  {
    id: "cloud-sync",
    title: "Instant Cloud Sync",
    description:
      "Your notes, summaries, quizzes and progress are synced securely across all devices instantly.",
    points: [
      "Auto cloud backups",
      "Sync across laptop & mobile",
      "Instant changes everywhere",
      "No data loss — ever",
    ],
    image: IMAGES.cloudSync,
  },

  {
    id: "mobile-first",
    title: "Optimized for Mobile",
    description:
      "Built mobile-first for smooth performance even on low-end devices and weak networks.",
    points: [
      "Fast loading on 4G",
      "Offline reading",
      "Touch-optimized UI",
      "Battery-efficient design",
    ],
    image: mobileRes,
  },
];
