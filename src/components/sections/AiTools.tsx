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
          subtitle="I use AI development tools to speed up development, debugging, requirement analysis and code quality while maintaining clean and maintainable solutions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {aiToolsData.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard
                className="h-full flex flex-col justify-between p-6 relative group"
                glowColor={tool.glowColor}
                showHudCorners={true}
              >
                <div>
                  {/* Tool Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${tool.badgeColor}`}
                    >
                      {tool.name}
                    </span>
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
                  <span>AI AUGMENTED</span>
                  <span className="text-emerald-400">OPTIMIZED</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
