"use client";

import { X, Loader2, FileImage, FileText, File } from "lucide-react";

type Props = {
  progress: number;
  speed: number;
  eta: number;
  currentFile: string;          // file uploading
  queue: string[];              // remaining files
  loading: boolean;
  onCancel: () => void;
};

export default function UploadOverlay({
  progress,
  speed,
  eta,
  currentFile,
  queue,
  loading,
  onCancel,
}: Props) {
  const isProcessing = progress >= 100 && loading;

  // icon switch
  const getIcon = (name: string) => {
    if (name.endsWith(".pdf")) return <FileText className="text-red-400 w-4 h-4" />;
    if (name.match(/\.(jpg|jpeg|png|webp)$/)) return <FileImage className="text-yellow-400 w-4 h-4" />;
    return <File className="text-gray-300 w-4 h-4" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-999 flex justify-end w-full px-4 pointer-events-none sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto bg-[#0d0d0f]/95 backdrop-blur-2xl border border-yellow-500/30 shadow-2xl rounded-xl p-5 w-full max-w-[380px] text-white animate-fadeIn">

        {/* header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-yellow-300 animate-spin" />
            <h3 className="text-yellow-300 font-semibold text-sm">
              {isProcessing ? "Processing…" : "Uploading…"}
            </h3>
          </div>

          {!isProcessing && (
            <button onClick={onCancel} className="text-yellow-300 hover:text-yellow-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* current file */}
        {!isProcessing ? (
          <div className="flex items-center gap-2 text-sm mb-2 text-gray-300">
            {getIcon(currentFile)}
            <span className="truncate">{currentFile}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-300 mb-2">Finalizing upload…</p>
        )}

        {/* queue */}
        {queue.length > 0 && !isProcessing && (
          <div className="bg-black/40 border border-gray-700 rounded-lg p-2 mb-3 max-h-24 overflow-auto space-y-1">
            {queue.map((f, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 truncate">
                {getIcon(f)}
                {f}
              </div>
            ))}
          </div>
        )}

        {/* stats */}
        {!isProcessing && (
          <p className="text-xs text-gray-400 mb-2">
            {progress}% • {(speed / 1024).toFixed(2)} MB/s • ETA {eta.toFixed(1)}s
          </p>
        )}

        {/* progress bar */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden border border-yellow-500/20">
          <div
            className="h-full bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* fade-in animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
