"use client";

import React from "react";
import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { profileData } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-12 px-6 overflow-hidden">
      {/* Ambient glow accent */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-gradient-to-t from-cyan-500/10 via-purple-600/10 to-transparent blur-2xl" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand & Mission Statement */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-semibold tracking-wide text-white">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Designed &amp; Built by {profileData.name}</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Exploring the web universe — 2026 • Frontend &amp; Webflow Developer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            aria-label="Email Contact"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all shadow-sm"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Warp to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-slate-900/60 hover:bg-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
        >
          <span>WARP TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
        </button>
      </div>
    </footer>
  );
}
