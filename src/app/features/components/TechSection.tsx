// description: Full section to display all categories of technologies used in NoteMentor

import Link from "next/link";
import { TECH_STACK } from "../(constants)/techData";
import TechGrid from "./TechGrid";

export default function TechSection() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-28">
            <h2 className="text-4xl font-semibold text-black dark:text-white text-center">
                Technologies That Power NoteMentor
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mt-4">
                Built using a modern, scalable tech stack optimized for AI, real-time features,
                and high performance even on low-end mobile devices.
            </p>

            <div className="mt-16 space-y-20">
                {TECH_STACK.map((section) => (
                    <div key={section.category}>
                        <h3 className="text-2xl font-semibold text-black dark:text-white">
                            {section.category}
                        </h3>

                        <TechGrid items={section.tech} />
                    </div>
                ))}
                <Link href={"https://simpleicons.org/"}
                    className="text-blue-600 underline" 
                >
                    click here to see simpleicons
                </Link>
            </div>
        </section>
    );
}
