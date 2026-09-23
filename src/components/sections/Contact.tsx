"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Sparkles, CheckCircle2, Rocket, Copy, Check, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import confetti from "canvas-confetti";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import { profileData } from "@/data/profile";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate space transmission dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory cosmic stardust confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#38bdf8", "#818cf8", "#c084fc", "#ec4899", "#ffffff"],
        });
      } catch {
        // Fallback gracefully if canvas context fails
      }

      // Reset form after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    }, 1200);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="// SECTOR 07: TRANSMISSION"
          title="Let's Build Something Together"
          subtitle="Have a project in mind? Let's turn your idea into reality."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Left Column: Direct Coordinates & Status */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard
              className="p-6 sm:p-7 relative overflow-hidden"
              glowColor="rgba(56, 189, 248, 0.35)"
              showHudCorners={true}
            >
              <h3 className="text-xl font-bold text-white mb-2 font-heading">
                Direct Communication Coordinates
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Whether you need a fullstack Next.js web application, a pixel-perfect Webflow platform, or an interactive creative experience, my frequency is open.
              </p>

              {/* Coordinates List */}
              <div className="space-y-4">
                {/* Email Item with Copy */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">EMAIL TRANSMISSION</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {profileData.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(profileData.email, 'email')}
                    title="Copy Email"
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Phone / Call */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">HOTLINE / TELEPHONE</div>
                      <a
                        href={`tel:${profileData.phone}`}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                      >
                        {profileData.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(profileData.phone, 'phone')}
                    title="Copy Phone Number"
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Base Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">BASE LOCATION</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {profileData.location}
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">LINKEDIN NETWORK</div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        Connect on LinkedIn
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">→</span>
                </a>

                {/* GitHub */}
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-purple-400/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">SOURCE CODE</div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        Explore GitHub Repositories
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">→</span>
                </a>

                {/* Upwork */}
                {profileData.upwork && (
                  <a
                    href={profileData.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">FREELANCE PLATFORM</div>
                        <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          Work via Upwork
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">→</span>
                  </a>
                )}
              </div>

              {/* Station telemetry info */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>TIMEZONE: GMT+7 (Hanoi)</span>
                <span className="text-emerald-400">RESPONSE &lt; 24H</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Mission Communication Form */}
          <div className="lg:col-span-7">
            <GlassCard
              className="p-6 sm:p-8"
              showHudCorners={true}
              glowColor="rgba(168, 85, 247, 0.25)"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      IDENTIFIER / NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-slate-900/90 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      FREQUENCY / EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-slate-900/90 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    MISSION OBJECTIVE / SUBJECT *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New Webflow Website / Next.js Web App"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-slate-900/90 transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    TRANSMISSION DETAILS / MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project requirements, timeline, and vision..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-slate-900/90 transition-all resize-none"
                  />
                </div>

                {/* Submit Button with Rocket Hover Animation */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
                        <span>Transmitting to Orbit...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.span
                          whileHover={{ x: 4, y: -4, rotate: -15 }}
                          className="inline-block"
                        >
                          <Rocket className="w-4 h-4 text-cyan-200 group-hover:text-white" />
                        </motion.span>
                      </>
                    )}
                  </button>
                </div>

                {/* Success Feedback Display */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold">Message launched successfully 🚀</div>
                        <div className="text-xs text-emerald-400/80">
                          Transmission received. I will review and reply within 24 hours.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
