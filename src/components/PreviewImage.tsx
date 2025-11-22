"use client";

import { useEffect, useRef, useState } from "react";

export default function PreviewImage({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  // ZOOM STATES
  const [scale, setScale] = useState(1);            // zoom level
  const [pos, setPos] = useState({ x: 0, y: 0 });   // image translate
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  /* -------------------------------------------
      Prevent Background Scroll + ESC close
  ------------------------------------------- */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  /* -------------------------------------------
      ZOOM HANDLERS
  ------------------------------------------- */

  const zoomIn = () => setScale((p) => Math.min(p + 0.25, 3));
  const zoomOut = () => setScale((p) => Math.max(p - 0.25, 1));

  const resetZoom = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const onDoubleClick = () => {
    scale === 1 ? setScale(2) : resetZoom();
  };

  /* -------------------------------------------
      DRAG HANDLERS (when zoomed)
  ------------------------------------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setDragging(true);
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const onMouseUp = () => setDragging(false);

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Inner Modal (stop propagation) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] w-auto rounded-xl overflow-hidden shadow-xl animate-zoomIn bg-black"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/70 text-white text-xl px-3 py-1 rounded-full hover:bg-black/90 z-50"
        >
          ✕
        </button>

        {/* ZOOM CONTROLS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
          <button
            onClick={zoomOut}
            className="text-white text-lg font-bold px-3 py-1 hover:text-yellow-300"
          >
            −
          </button>
          <button
            onClick={resetZoom}
            className="text-white text-sm px-3 py-1 hover:text-yellow-300"
          >
            Reset
          </button>
          <button
            onClick={zoomIn}
            className="text-white text-lg font-bold px-3 py-1 hover:text-yellow-300"
          >
            +
          </button>
        </div>

        {/* IMAGE */}
        <img
          ref={imgRef}
          src={src}
          onDoubleClick={onDoubleClick}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => setDragging(false)}
          alt="Preview"
          className="select-none cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
            transition: dragging ? "none" : "transform 0.25s ease",
          }}
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
            transform: scale(0.98);
            opacity: 0.8;
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
          animation: zoomIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
