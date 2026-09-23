"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, CheckCircle2, Cpu, MapPin, Sparkles, Shield, Layers, Workflow, TestTube2 } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="// SECTOR 03: MISSION LOG"
          title="Experience"
          subtitle="Enterprise fintech engineering &amp; digital platform deployments"
        />

        <div className="space-y-8 mt-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <GlassCard
                className="p-6 sm:p-9 relative overflow-hidden"
                glowColor="rgba(6, 182, 212, 0.35)"
                showHudCorners={true}
              >
                {/* Station Antenna Signal Graphic */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-mono border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 font-semibold uppercase tracking-wider">
                        {exp.type}
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-mono border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        ACTIVE DEPLOYMENT
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                      {exp.position}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mt-2.5 text-sm text-slate-300">
                      <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        {exp.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        {exp.period}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl border border-cyan-500/25 bg-slate-900/80 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                    <Cpu className="w-8 h-8" />
                  </div>
                </div>

                {/* Company Domain Highlights */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-blue-500/20 bg-blue-950/30 text-blue-300">
                    🇸🇬 Singapore &amp; 🇯🇵 Japan B2B Clients
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-purple-500/20 bg-purple-950/30 text-purple-300">
                    📈 Forex &amp; Stock Trading Platforms
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-emerald-500/20 bg-emerald-950/30 text-emerald-300">
                    ⛓️ Blockchain Solutions
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-cyan-500/20 bg-cyan-950/30 text-cyan-300">
                    💳 Digital Financial Platforms
                  </span>
                </div>

                {/* Role Description */}
                <p className="mt-5 text-slate-300 leading-relaxed text-sm sm:text-base">
                  {exp.description}
                </p>

                {/* Responsibilities Breakdown */}
                <div className="mt-7 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5" />
                    Key Engineering Contributions:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {exp.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 hover:border-cyan-500/30 text-xs sm:text-sm text-slate-200 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Tech Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-cyan-500/20 bg-cyan-950/30 text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-950/60 transition-colors shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
