"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the animation starts once visible (for staggering). */
  delay?: number;
  /** Tailwind animation utility to apply once visible. */
  animation?: "fade-in-up" | "fade-in" | "scale-in";
}

const ANIMATION_CLASSES = {
  "fade-in-up": "animate-fade-in-up",
  "fade-in": "animate-fade-in",
  "scale-in": "animate-scale-in",
} as const;

/**
 * Wraps children and animates them into view the first time they enter the
 * viewport. Falls back to always-visible if IntersectionObserver isn't
 * available (very old browsers, SSR) so content is never hidden.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  animation = "fade-in-up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${isVisible ? ANIMATION_CLASSES[animation] : "opacity-0"} ${className}`}
      style={isVisible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
