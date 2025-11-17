// description: Fully modular NoteMentor Feature Page (clean version)

"use client";

import FeatureHeader from "./components/FeatureHeader";
import FeatureList from "./components/FeatureList";
import TechSection from "./components/TechSection";

export default function FeaturesPage() {
  return (
    <main className="bg-white dark:bg-black transition-colors">
      <FeatureHeader />
      <FeatureList />
      <TechSection />
    </main>
  );
}
