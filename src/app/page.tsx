"use client"

import React from "react";

import Hero from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Team } from "@/components/home/Team";
import { CTA } from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

// GSAP removed — no animation hook needed

/* -----------------------------
Main Page Component
----------------------------- */
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
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white transition-colors duration-300">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-5">
        {sections.map((Comp, index) => (
          <section key={index}>{Comp}</section>
        ))}
      </main>

      <Footer />
    </div>
  );
}