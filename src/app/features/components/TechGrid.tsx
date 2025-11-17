// description: Grid layout displaying tech items for a specific category

import TechItem from "./TechItem";

export default function TechGrid({ items }: any) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {items.map((tech: any) => (
        <TechItem key={tech.name} tech={tech} />
      ))}
    </div>
  );
}
