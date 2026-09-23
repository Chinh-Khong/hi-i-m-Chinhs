"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Orbit } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { journeyMilestones } from "@/data/journey";

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 px-6 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="// SECTOR 02: CHRONOLOGY"
          title="My Journey"
          subtitle="A cosmic progression through modern web technologies and architectural milestones"
        />

        {/* Vertical Cosmic Timeline */}
        <div className="relative mt-16">
          {/* Central Glowing Laser Beam */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-30" />
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-2 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-15 blur-sm" />

          <div className="space-y-12">
            {journeyMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8 md:gap-0`}
                >
                  {/* Planet / Cosmic Waypoint Beacon in the Center */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      style={{ borderColor: milestone.color }}
                    >
                      {/* Pulsing Aura */}
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-25"
                        style={{ backgroundColor: milestone.color }}
                      />
                      <Orbit className="w-5 h-5" style={{ color: milestone.color }} />
                    </motion.div>
                  </div>

                  {/* Content Glass Card (Left or Right) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <GlassCard
                      className="p-6 relative"
                      glowColor={milestone.glowColor}
                      showHudCorners={true}
                    >
                      {/* Milestone Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-white shadow-sm"
                          style={{ backgroundColor: milestone.color + "25", border: `1px solid ${milestone.color}50` }}
                        >
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {milestone.year}
                        </span>

                        <span className="text-xs font-mono text-slate-400">
                          {milestone.role}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-xl font-bold text-white mb-2 font-heading">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-300/90 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Tech Chips */}
                      {milestone.technologies && milestone.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                          {milestone.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/10 bg-white/5 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
