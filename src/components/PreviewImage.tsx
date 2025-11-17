"use client"
import { useEffect } from "react";

export default function ImagePreview({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalPaddingRight = document.body.style.paddingRight;

    // Prevent layout shift by adding scrollbar compensation
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Freeze body scroll completely
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Handle wheel + touch scroll blocking
    const preventScroll = (e: Event) => e.preventDefault();

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      // Restore everything
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.paddingRight = originalPaddingRight;

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fadeIn p-4">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition-transform"
      >
        ✕
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[90vh] shadow-2xl rounded-xl overflow-hidden animate-zoomIn">
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }

        .animate-zoomIn {
          animation: zoomIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
