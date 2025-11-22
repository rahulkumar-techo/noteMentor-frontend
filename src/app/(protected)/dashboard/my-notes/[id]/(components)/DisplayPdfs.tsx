"use client";

export function PdfViewer({ fileUrl }: { fileUrl: string }) {
  if (!fileUrl)
    return <p className="text-red-500 dark:text-red-400">No PDF file provided.</p>;

  return (
    <div
      className="
        w-full bg-white dark:black 
        border border-gray-300 dark:border-neutral-700
        p-4 rounded-xl text-gray-800 dark:text-white
      "
    >
      <h2 className="text-lg font-semibold text-yellow-500 dark:text-yellow-400 mb-3">
        PDF Viewer
      </h2>

      <div className="relative w-full rounded-xl overflow-hidden border border-yellow-500/30">
        <iframe
          src={fileUrl}
          className="w-full h-[80vh]"
          title="PDF Document"
          loading="lazy"
        />
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        If the PDF doesn’t load,{" "}
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-500 underline"
        >
          click here
        </a>
        .
      </p>
    </div>
  );
}
