"use client"
import Hero from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Team } from "@/components/home/Team";
import { CTA } from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NoteMentor",
  operatingSystem: "Web",
  applicationCategory: "EducationalApplication",
  url: "https://note-mentor-frontend.vercel.app",
  description:
    "AI-powered tool that converts handwritten notes into summaries and quizzes.",
};

export default function NoteMentorHome() {
  const sections = [
    <Hero key="hero" />,
    <TrustedBy key="trusted" />,
    <Features key="features" />,
    <HowItWorks key="how" />,
    <ProductShowcase key="showcase" />,
    <Team key="team" />,
    <CTA key="cta" />,
  ];

  return (

    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white transition-colors duration-300">
        {/* <Header /> */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-5 ">
          {sections.map((Comp, index) => (
            <section key={index}>{Comp}</section>
          ))}
        </main>

        <Footer />
      </div>
    </>

  );
}

