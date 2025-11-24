// ---------------------------------------------------------
// 🌐 BASE URL (works for Localhost + Production)
// ---------------------------------------------------------
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://note-mentor-frontend.vercel.app";


// ---------------------------------------------------------
// 📌 COMMON PROPERTIES (reused)
// ---------------------------------------------------------
const COMMON_KEYWORDS = [
  "NoteMentor",
  "AI notes app",
  "OCR handwriting",
  "study app",
  "quiz generator",
  "ai summaries",
];

const COMMON_ICONS = {
  icon: "/favicons/favicon.ico",
  apple: "/favicons/icon-192.png",
};

const COMMON_OG_IMAGES = [
  {
    url: `${BASE_URL}/favicons/nm-logo.png`,
    width: 1200,
    height: 630,
  },
];


// ---------------------------------------------------------
// 🏠 APP METADATA (Landing pages)
// ---------------------------------------------------------
export const app_metadata = {
  title: "NoteMentor – AI Notes to Summaries & Quizzes",
  description:
    "AI-powered study tool for students. Convert handwritten notes to summaries, quizzes, mindmaps & more.",
  keywords: COMMON_KEYWORDS,

  metadataBase: new URL(BASE_URL),

  manifest: "/favicons/site.webmanifest",

  icons: COMMON_ICONS,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "NoteMentor – AI Study Assistant",
    description:
      "Convert handwritten notes to summaries, quizzes & mindmaps with AI.",
    url: BASE_URL,
    siteName: "NoteMentor",
    images: COMMON_OG_IMAGES,
    locale: "en-IN",
    type: "website",
  },
};


// ---------------------------------------------------------
// 📊 DASHBOARD METADATA (After login)
// ---------------------------------------------------------
export const dashboard_metaData = {
  title: "NoteMentor Dashboard",
  description:
    "AI-powered study tool for students. Convert handwritten notes to summaries, quizzes, mindmaps & more.",
  keywords: COMMON_KEYWORDS,

  metadataBase: new URL(BASE_URL),

  manifest: "/favicons/site.webmanifest",

  icons: COMMON_ICONS,

  alternates: {
    canonical: "/dashboard",
  },

  openGraph: {
    title: "NoteMentor – AI Study Assistant",
    description:
      "Convert handwritten notes to summaries, quizzes & mindmaps with AI.",
    url: `${BASE_URL}/dashboard`,
    siteName: "NoteMentor",
    images: COMMON_OG_IMAGES,
    locale: "en-IN",
    type: "website",
  },
};
