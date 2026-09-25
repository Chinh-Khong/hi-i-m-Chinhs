"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 350);
          return 100;
        }
        // Smooth progressive acceleration
        const increment = Math.max(1, Math.floor((100 - prev) / 6) + Math.floor(Math.random() * 8));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014] text-white selection:bg-none"
        >
          {/* Cosmic background nebular glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-pink-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            {/* Rotating Mini Celestial Core */}
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer orbit rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 border-r-transparent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-purple-500/20 border-b-purple-400 border-l-transparent"
              />

              {/* Core planet */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(56, 189, 248, 0.5)",
                    "0 0 35px rgba(168, 85, 247, 0.6)",
                    "0 0 20px rgba(56, 189, 248, 0.5)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-800 flex items-center justify-center text-xs font-mono font-bold"
              >
                ✦
              </motion.div>

              {/* Orbiting micro satellite */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute w-28 h-28 flex items-start justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
              </motion.div>
            </div>

            {/* Cinematic Title */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 font-mono">
                Initiating System Link
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Entering ChinhKhong.dev Universe...
              </h2>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="w-64 md:w-80 space-y-2">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-900 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>SECTOR: 0xCHINHKHONG</span>
                <span className="text-cyan-400 font-semibold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
