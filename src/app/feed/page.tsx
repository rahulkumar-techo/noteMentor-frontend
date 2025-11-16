"use client"

import FeedList from "./(components)/FeedLists"

const Feed = () => {
    return (
        <main className="max-w-3xl mx-auto p-4 min-h-screen bg-slate-50 dark:bg-black">
            <header className="mb-6">
                <h1 className="text-2xl font-extrabold">Explore • NoteMentor</h1>
                <p className="text-sm text-slate-500 dark:text-neutral-400">Mixed feed of notes, questions and suggestions</p>
            </header>

            <section>
                <FeedList />
            </section>
        </main>
    )
}

export default Feed