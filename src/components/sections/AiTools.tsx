"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Cpu, Sparkles, Terminal, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { aiToolsData } from "@/data/aiTools";

export default function AiTools() {
  return (
    <section id="ai-tools" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="// SECTOR 06: AUGMENTATION"
          title="AI-Powered Development"
          subtitle="I integrate autonomous agentic environments like Google Antigravity and Cursor alongside advanced reasoning models to maximize engineering velocity, automated testing, and code quality."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-12">
          {aiToolsData.map((tool, index) => {
            const colSpanClass =
              index < 2
                ? "lg:col-span-3"
                : index === 4
                ? "md:col-span-2 lg:col-span-2"
                : "md:col-span-1 lg:col-span-2";

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-full ${colSpanClass}`}
              >
                <GlassCard
                  className="h-full flex flex-col justify-between p-6 relative group"
                  glowColor={tool.glowColor}
                  showHudCorners={true}
                >
                  <div>
                    {/* Tool Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${tool.badgeColor}`}
                        >
                          {tool.name}
                        </span>
                        {tool.isAgentic && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-fuchsia-500/40 bg-fuchsia-950/50 text-fuchsia-300 font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                            <Sparkles className="w-3 h-3 text-fuchsia-300 animate-pulse" />
                            AGENTIC
                          </span>
                        )}
                      </div>
                      <Bot className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    <h3 className="text-lg font-bold text-white font-heading mb-1">
                      {tool.tagline}
                    </h3>

                    <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                      {tool.purpose}
                    </p>

                    {/* Capabilities List */}
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      {tool.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-[11px] text-slate-400"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{tool.isAgentic ? "AGENTIC AUTONOMY" : "AI AUGMENTED"}</span>
                    <span className="text-emerald-400">OPTIMIZED</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
