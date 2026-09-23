"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
  onClick?: () => void;
  hoverScale?: number;
  showHudCorners?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "rgba(56, 189, 248, 0.35)",
  enableTilt = true,
  onClick,
  hoverScale = 1.015,
  showHudCorners = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const limit = 6; // subtle degrees for professional elegance
    const rX = -((y - centerY) / centerY) * limit;
    const rY = ((x - centerX) / centerX) * limit;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? hoverScale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`glass-card-pro relative rounded-2xl p-6 transition-all duration-300 ${className}`}
    >
      {/* Sci-Fi HUD Corner Accents */}
      {showHudCorners && (
        <>
          <div className="hud-corner-tl" />
          <div className="hud-corner-br" />
        </>
      )}

      {/* Subtle radial glow follow cursor / hover highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at center, ${glowColor}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
