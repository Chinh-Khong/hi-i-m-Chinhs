"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Globe2, Grid, Sparkles, Orbit } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { skillsData } from "@/data/skills";
import { SkillItem } from "@/types";

// Dynamically import 3D Solar System
const SkillSolarSystem = dynamic(
  () => import("@/components/three/SkillSolarSystem"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-3xl border border-white/10 bg-slate-950/40 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-cyan-400 font-mono text-xs">
          <Orbit className="w-8 h-8 animate-spin" />
          <span>Calibrating Solar System Orbits...</span>
        </div>
      </div>
    ),
  }
);

export default function Skills() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Celestial Skills" },
    { id: "core", label: "Core & Frameworks" },
    { id: "styling", label: "UI & Styling" },
    { id: "tool", label: "Tools & SEO" },
    { id: "cms", label: "CMS & Architecture" },
  ];

  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "core") return skill.category === "framework" || skill.category === "language" || skill.category === "core";
    if (activeCategory === "styling") return skill.category === "styling";
    if (activeCategory === "tool") return skill.category === "tool";
    if (activeCategory === "cms") return skill.category === "cms";
    return true;
  });

  return (
    <section id="skills" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="// SECTOR 04: CAPABILITIES"
          title="My Developer Galaxy"
          subtitle="An interactive 3D solar system of core frontend frameworks, visual CMS platforms, and modern tooling"
        />

        {/* View Mode Toggle Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat.id
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Switch: 3D Galaxy vs Clean Matrix Grid */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-md">
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                viewMode === "3d"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Galaxy</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Solar System View (Desktop/Tablet interactive mode) */}
        {viewMode === "3d" && (
          <div className="hidden sm:block">
            <SkillSolarSystem />
          </div>
        )}

        {/* Responsive Grid View (Available always on mobile or when toggled) */}
        <div className={`${viewMode === "3d" ? "sm:hidden mt-6" : "mt-6"} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <GlassCard
                className="p-4 h-full flex flex-col justify-between hover:border-cyan-400/40 group"
                showHudCorners={true}
                glowColor={skill.color + "30"}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm border shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: skill.color + "18",
                        borderColor: skill.color + "50",
                        color: skill.color,
                        boxShadow: `0 0 12px ${skill.color}25`
                      }}
                    >
                      {skill.emblem}
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold" style={{ color: skill.color }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: skill.color }} />
                      <span>{skill.level}%</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  {/* Gauge Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="uppercase tracking-wider">{skill.levelLabel}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
