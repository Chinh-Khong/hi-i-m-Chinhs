"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Terminal } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "AI Tools", href: "#ai-tools", id: "ai-tools" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-500 ${
            isScrolled
              ? "bg-slate-950/80 border-cyan-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(3,0,20,0.8),0_0_20px_rgba(6,182,212,0.12)]"
              : "bg-slate-900/40 border-white/10 backdrop-blur-md"
          }`}
        >
          {/* Logo / Brand badge */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 pl-2 pr-3 py-1 text-xs font-mono font-semibold tracking-wider text-slate-200 hover:text-cyan-400 transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white text-[11px] shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline font-bold">CHINHKHONG.DEV</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA / Quick Connect Pill */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-100 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 hover:from-cyan-500/50 hover:to-purple-600/50 border border-cyan-400/30 hover:border-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Initiate Link</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-slate-900/60 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden rounded-2xl border border-cyan-500/20 bg-slate-950/95 p-6 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-cyan-400">
                <span>SYSTEM NAVIGATION</span>
                <span className="text-slate-400">8 SECTORS</span>
              </div>

              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-semibold"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </a>
                );
              })}

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Let&apos;s Build Together</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
