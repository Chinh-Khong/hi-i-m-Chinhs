"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      {/* Cosmic badge */}
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-300/80 leading-relaxed font-normal max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
