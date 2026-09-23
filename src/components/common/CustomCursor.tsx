"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Smooth springs for trailing outer ring
  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });
  
  // Instant inner dot coordinates
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    setMounted(true);
    // Only enable for desktop mice
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setDotPos({ x: e.clientX, y: e.clientY });

      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .clickable'
        );
        setIsHovered(isClickable);

        const isSpecialTarget = !!target.closest('[data-cursor-special]');
        setIsPointer(isSpecialTarget);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Outer trailing aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : isPointer ? 64 : 32,
          height: isHovered ? 48 : isPointer ? 64 : 32,
          borderColor: isHovered ? "rgba(34, 211, 238, 0.8)" : "rgba(168, 85, 247, 0.4)",
          backgroundColor: isHovered
            ? "rgba(6, 182, 212, 0.12)"
            : "rgba(139, 92, 246, 0.04)",
          boxShadow: isHovered
            ? "0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)"
            : "0 0 10px rgba(139, 92, 246, 0.2)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />

      {/* Inner glowing center beacon */}
      <div
        className="fixed top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
        }}
      />
    </div>
  );
}
