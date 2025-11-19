"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StepWrapper({ children }: any) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
    );
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
