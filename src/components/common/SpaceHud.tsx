"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Radio, ShieldCheck } from "lucide-react";

interface SpaceHudProps {
  activeSection: string;
}

export default function SpaceHud({ activeSection }: SpaceHudProps) {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = total > 0 ? Math.round((current / total) * 100) : 0;
      setScrollYProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside aria-label="Flight telemetry HUD" className="fixed bottom-6 left-6 z-30 hidden lg:flex flex-col gap-2 pointer-events-none select-none">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-md text-[11px] font-mono text-slate-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">{activeSection}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-purple-300">
          <Compass className="w-3.5 h-3.5" />
          <span>ORBIT {scrollYProgress}%</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ONLINE</span>
        </div>
      </motion.div>
    </aside>
  );
}
