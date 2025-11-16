// components/avatar/CustomAvatar.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  src?: string | null;
  alt?: string;
  size?: number; // px
  className?: string;
  fallbackColor?: string;
};

export default function CustomAvatar({
  src,
  alt = "User",
  size = 40,
  className = "",
  fallbackColor,
}: Props) {
  const [hasError, setHasError] = useState(false);

  const initials = (alt || "U")
    .split(" ")
    .map((s) => s.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // deterministic color by alt string (simple hash)
  const pickColor = () => {
    if (fallbackColor) return fallbackColor;
    let hash = 0;
    for (let i = 0; i < alt.length; i++) hash = alt.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue} 60% 75%)`;
  };

  const sizeClass = `w-[${size}px] h-[${size}px]`;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!alt}
      title={alt}
    >
      {/* image */}
      {!hasError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          style={{ objectFit: "cover", borderRadius: "9999px" }}
          onError={() => setHasError(true)}
        />
      ) : (
        // fallback (initials in colored circle)
        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: pickColor(),
          }}
        >
          <span className="text-white font-medium" style={{ fontSize: Math.max(12, size / 3) }}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
