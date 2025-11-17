// description: List renderer for all features

import { FEATURE_SECTIONS } from "../(constants)/features";
import FeatureItem from "./FeatureItem";

export default function FeatureList() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-32 space-y-28">
      {FEATURE_SECTIONS.map((feature, index) => (
        <FeatureItem key={feature.id} index={index} feature={feature} />
      ))}
    </section>
  );
}
