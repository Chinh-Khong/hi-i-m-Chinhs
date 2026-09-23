"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/common/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpaceHud from "@/components/common/SpaceHud";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import AiTools from "@/components/sections/AiTools";
import Contact from "@/components/sections/Contact";
import { useScrollSpy } from "@/hooks/useScrollSpy";

// Dynamically import 3D Space Background with SSR disabled for optimal performance
const SpaceBackground = dynamic(
  () => import("@/components/three/SpaceBackground"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-0 bg-[#030014]" />,
  }
);

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "journey",
  "contact",
];

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 250);

  return (
    <main className="relative min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden">
      {/* Cinematic Loading Portal */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* 3D Cosmic Space Canvas Background */}
      <SpaceBackground />

      {/* Persistent Flight Navigation HUD */}
      <Navbar activeSection={activeSection} />

      {/* Subtle Orbital Coordinates HUD in Bottom-Left */}
      <SpaceHud activeSection={activeSection} />

      {/* Main Celestial Content Stream */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Journey />
        <AiTools />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
