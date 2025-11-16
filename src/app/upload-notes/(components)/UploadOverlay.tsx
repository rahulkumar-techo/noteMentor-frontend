"use client";

import { X, Loader2 } from "lucide-react";

export default function UploadOverlay({
  progress,
  speed,
  eta,
  onCancel,
  loading,
}: {
  progress: number;
  speed: number;
  eta: number;
  loading: boolean;
  onCancel: () => void;
}) {
  const isProcessing = progress >= 100 && loading;

  return (
    <div
      className="
        fixed bottom-4 right-4 z-[9999]
        flex justify-end
        w-full px-4
        pointer-events-none
        sm:bottom-6 sm:right-6
      "
    >
      <div
        className="
          pointer-events-auto
          bg-[#0d0d0f]/90 backdrop-blur-xl
          border border-yellow-500/30 
          shadow-xl rounded-xl 
          p-4 sm:p-5
          w-full max-w-[340px] sm:max-w-[360px]
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-spin" />

            <h3 className="text-yellow-300 font-semibold text-sm sm:text-base">
              {isProcessing ? "Processing…" : "Uploading…"}
            </h3>
          </div>

          {!isProcessing && (
            <button
              onClick={onCancel}
              className="text-yellow-300 hover:text-yellow-400 transition"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Stats */}
        {!isProcessing ? (
          <p className="text-xs sm:text-sm text-gray-300">
            {progress}% • {(speed / 1024).toFixed(2)} MB/s • ETA {eta.toFixed(1)}s
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-300">
            Finalizing upload…
          </p>
        )}

        {/* Progress Bar */}
        <div
          className="
            w-full h-2 sm:h-3 
            bg-neutral-800 
            rounded-full overflow-hidden 
            mt-3 border border-yellow-500/20
          "
        >
          <div
            className="
              h-full bg-gradient-to-r 
              from-yellow-300 via-yellow-400 to-yellow-500
              transition-all duration-300
            "
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
