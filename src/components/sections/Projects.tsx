"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Terminal, Shield, CheckCircle, Orbit, Globe } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import ProjectSchematic from "@/components/sections/ProjectSchematic";
import { projectsData } from "@/data/projects";
import { ProjectItem } from "@/types";

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Next.js & React", "Webflow", "Fullstack", "3D & Creative"];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "All") return true;
    return project.category === selectedFilter;
  });

  return (
    <section id="projects" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="// SECTOR 05: MISSIONS"
          title="Featured Missions"
          subtitle="Explore launched production applications, client platforms, and interactive 3D experiments"
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/40"
                  : "border border-white/10 bg-slate-950/60 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full"
              >
                <GlassCard
                  className="h-full flex flex-col justify-between p-6 sm:p-7 group relative overflow-hidden"
                  glowColor={project.accentColor + "35"}
                  showHudCorners={true}
                >
                  {/* Top Mission Telemetry Bar */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold tracking-wider"
                          style={{ color: project.accentColor }}
                        >
                          {project.missionNumber}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-400">{project.category}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{project.status}</span>
                      </div>
                    </div>

                    {/* Mission Header */}
                    <div className="mt-5">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading flex items-center justify-between">
                        <span>{project.title}</span>
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">
                        {project.tagline}
                      </p>

                      {project.displayDomain && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-900/50 transition-all shadow-sm"
                        >
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-semibold">{project.displayDomain}</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      )}
                    </div>

                    {/* Project Mission Preview Graphic Banner & Schematic */}
                    <div
                      className="mt-4 w-full h-48 rounded-xl border border-white/10 overflow-hidden relative flex flex-col justify-between"
                      style={{
                        boxShadow: `inset 0 0 30px ${project.accentColor}15`,
                      }}
                    >
                      {/* Interactive Schematic Diagram */}
                      <ProjectSchematic id={project.id} accentColor={project.accentColor} />

                      {/* Bottom Banner Telemetry Tag */}
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950/95 border-t border-white/10">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono text-slate-200 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {project.role}
                          </span>
                          {project.duration && (
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                              {project.duration}
                            </span>
                          )}
                          {project.teamSize && (
                            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                              {project.teamSize}
                            </span>
                          )}
                        </div>
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{
                            backgroundColor: project.accentColor + "25",
                            color: project.accentColor,
                            border: `1px solid ${project.accentColor}60`,
                          }}
                        >
                          ✦
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-slate-300/90 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4 space-y-1.5">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-400"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Tech Stack & Action Links */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono border border-white/10 bg-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all active:scale-95"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Platform</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-400/40 transition-all"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
