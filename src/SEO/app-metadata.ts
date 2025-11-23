
export const app_metadata = {
  title: "NoteMentor – AI Notes to Summaries & Quizzes",
  description:
    "AI-powered study tool for students. Convert handwritten notes to summaries, quizzes, mindmaps & more.",
  keywords: [
    "NoteMentor",
    "AI notes app",
    "OCR handwriting",
    "study app",
    "quiz generator",
    "ai summaries",
  ],
  metadataBase: new URL("https://note-mentor-frontend.vercel.app"),
  alternates: {
    canonical: "https://note-mentor-frontend.vercel.app",
  },
  openGraph: {
    title: "NoteMentor – AI Study Assistant",
    description:
      "Convert handwritten notes to summaries, quizzes & mindmaps with AI.",
    url: "https://note-mentor-frontend.vercel.app",
    siteName: "NoteMentor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-IN",
    type: "website",
  },
};
