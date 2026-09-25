"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles, Terminal, Shield, Cpu, Code2, Globe2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { profileData } from "@/data/profile";

// Dynamically import 3D Celestial Core with SSR disabled
const HeroCelestialPlanet = dynamic(
  () => import("@/components/three/HeroCelestialPlanet"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-cyan-500/20 bg-cyan-950/20 animate-pulse-slow flex flex-col items-center justify-center gap-2 text-cyan-400 font-mono text-xs">
          <Cpu className="w-6 h-6 animate-spin text-cyan-400" />
          <span>Synchronizing 3D Core...</span>
        </div>
      </div>
    ),
  }
);

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % profileData.titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden"
    >
      {/* Background ambient cosmic light source */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text & CTA Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left z-10"
        >
          {/* Welcome Cosmic Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span>Welcome to My Universe ✦ TDT ASIA Frontend Dev</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
              // HELLO WORLD • I AM
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-heading">
              <span className="text-gradient-cosmic drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                {profileData.name}
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-cyan-400/90 pt-1">
              Khổng Đức Chính (Chinh Khong)
            </p>
          </div>

          {/* Animated Subtitle in Sci-Fi HUD Bracket */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md">
            <span className="text-cyan-400 font-mono text-sm sm:text-base font-bold">[</span>
            <div className="h-7 sm:h-8 flex items-center overflow-hidden min-w-[220px] sm:min-w-[270px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={profileData.titles[titleIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-sm sm:text-base md:text-lg font-semibold text-cyan-300 font-mono"
                >
                  {profileData.titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-cyan-400 font-mono text-sm sm:text-base font-bold">]</span>
          </div>

          {/* Value Proposition Description */}
          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
            {profileData.shortIntro}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "#projects")}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white btn-shimmer shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 active:scale-95"
            >
              <span>Explore My Missions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 border border-white/15 bg-slate-900/60 hover:bg-white/10 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 active:scale-95 shadow-sm"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Contact &amp; CV</span>
            </a>
          </div>

          {/* Quick Specs / Developer Telemetry Ribbon */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
            <div className="p-2.5 rounded-xl border border-white/5 bg-slate-950/40">
              <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                EXPERIENCE
              </div>
              <div className="text-xs font-bold text-white mt-0.5">3+ Years Core</div>
            </div>

            <div className="p-2.5 rounded-xl border border-white/5 bg-slate-950/40">
              <div className="text-[10px] font-mono text-purple-400 flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                STACK
              </div>
              <div className="text-xs font-bold text-white mt-0.5">Next.js • React</div>
            </div>

            <div className="p-2.5 rounded-xl border border-white/5 bg-slate-950/40">
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Globe2 className="w-3 h-3" />
                COMPANY
              </div>
              <div className="text-xs font-bold text-white mt-0.5">TDT ASIA</div>
            </div>

            <div className="p-2.5 rounded-xl border border-white/5 bg-slate-950/40">
              <div className="text-[10px] font-mono text-pink-400 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                LOCATION
              </div>
              <div className="text-xs font-bold text-white mt-0.5">Hanoi (GMT+7)</div>
            </div>
          </div>

          {/* Social Links & Quick Call */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2.5">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Email Contact"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden sm:block text-slate-600">|</div>

            <a
              href={`tel:${profileData.phone}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct: {profileData.phone}</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Celestial Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          <HeroCelestialPlanet />
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
          Scroll To Traverse
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-cyan-400"
          />
        </div>
      </div>
    </section>
  );
}
