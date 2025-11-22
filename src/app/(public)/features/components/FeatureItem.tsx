// description: Single feature block component

import Image from "next/image";

export default function FeatureItem({ feature, index }: any) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row gap-12 items-center ${isLeft ? "" : "md:flex-row-reverse"}`}>
      
      {/* TEXT */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-semibold text-black dark:text-white">
          {feature.title}
        </h2>

        <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>

        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
          {feature.points.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1"></span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* IMAGE */}
      <div className="md:w-1/2">
        <div className="rounded-lg overflow-hidden shadow-md border border-black/10 dark:border-white/10">
          <Image
            src={feature.image}
            alt={feature.title}
            width={700}
            height={420}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
