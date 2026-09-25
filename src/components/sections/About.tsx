"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Rocket, Code2, Sparkles, MapPin, UserCheck, Terminal, Compass, GraduationCap, Phone, Languages } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { profileData, profileStats } from "@/data/profile";

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6 text-cyan-400" />,
  Rocket: <Rocket className="w-6 h-6 text-purple-400" />,
  Code2: <Code2 className="w-6 h-6 text-blue-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-pink-400" />,
};

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="// SECTOR 01: IDENTITY"
          title="About Me"
          subtitle="ChinhKhong.dev (Khổng Đức Chính) — Frontend Developer at TDT Asia"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Glassmorphic Pilot Profile Dossier */}
          <div className="lg:col-span-7 flex">
            <GlassCard
              className="w-full flex flex-col justify-between"
              glowColor="rgba(56, 189, 248, 0.35)"
              showHudCorners={true}
            >
              <div className="space-y-6">
                {/* Dossier Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    {/* Holographic Avatar Core with Scanner Beam */}
                    <div className="relative overflow-hidden flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-700 p-0.5 shadow-[0_0_25px_rgba(6,182,212,0.45)]">
                      <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                        <Terminal className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div className="scanner-beam" />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        {profileData.name}
                        <UserCheck className="w-4 h-4 text-cyan-400" />
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-cyan-300">
                        {profileData.fullName} • {profileData.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>{profileData.location}</span>
                    </div>

                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-300 hover:bg-cyan-950/60 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{profileData.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Narrative Bio */}
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                  <p className="text-base text-slate-200 font-medium">
                    &ldquo;{profileData.shortIntro}&rdquo;
                  </p>
                  <p className="text-slate-400">
                    At <strong>TDT Asia</strong>, I contribute to the development and testing of financial platforms, loan management systems, and e-commerce applications for international B2B clients in markets such as Singapore and Japan.
                  </p>
                  <p className="text-slate-400">
                    Beyond frontend mastery in React, Next.js, and TypeScript, I possess backend understanding in Node.js, experience with MySQL and MongoDB databases, and standard testing methodologies using Postman and Git. I am proactive in learning and value team collaboration, sports, and a healthy work-life balance.
                  </p>
                </div>

                {/* Key Pillars & Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                      <GraduationCap className="w-3.5 h-3.5" />
                      EDUCATION
                    </div>
                    <div className="text-xs font-semibold text-white mt-1">
                      {profileData.education}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {profileData.educationPeriod}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-purple-400">
                      <Languages className="w-3.5 h-3.5" />
                      LANGUAGE
                    </div>
                    <div className="text-xs font-semibold text-white mt-1">
                      {profileData.language}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Technical &amp; Workplace
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-[11px] font-mono text-emerald-400">COMPANY</div>
                    <div className="text-xs font-semibold text-white mt-1">TDT ASIA</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">11/2023 – Present</div>
                  </div>
                </div>
              </div>

              {/* Dossier Footer telemetry */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
                  COORDINATES: HANOI, VIETNAM (GMT+7)
                </span>
                <span className="text-emerald-400">STATUS: OPEN FOR NEW OPPORTUNITIES</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: 4 Live Metric Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profileStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <GlassCard
                  className="h-full flex flex-col justify-between p-5 hover:border-purple-500/40"
                  glowColor="rgba(168, 85, 247, 0.25)"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-slate-900/60 shadow-inner">
                      {iconMap[stat.iconName] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">METRIC 0{index + 1}</span>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono font-medium text-cyan-300 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {stat.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
