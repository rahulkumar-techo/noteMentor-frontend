/**
 * Robots allow indexing
 */

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://note-mentor-frontend.vercel.app/sitemap.xml",
  };
}
