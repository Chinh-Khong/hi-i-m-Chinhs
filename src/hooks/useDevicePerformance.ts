"use client";

import { useEffect, useState } from "react";

export interface DevicePerformance {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasWebGL: boolean;
  particleCount: number;
  enableHeavyEffects: boolean;
  prefersReducedMotion: boolean;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasWebGL: true,
    particleCount: 2500,
    enableHeavyEffects: true,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const checkWebGL = (): boolean => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    const updateCapabilities = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const webGLAvailable = checkWebGL();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let particleCount = 2800;
      let enableHeavyEffects = true;

      if (isMobile) {
        particleCount = 600;
        enableHeavyEffects = false;
      } else if (isTablet) {
        particleCount = 1400;
        enableHeavyEffects = false;
      }

      if (prefersReduced || !webGLAvailable) {
        enableHeavyEffects = false;
        particleCount = Math.min(particleCount, 400);
      }

      setPerformance({
        isMobile,
        isTablet,
        isDesktop,
        hasWebGL: webGLAvailable,
        particleCount,
        enableHeavyEffects,
        prefersReducedMotion: prefersReduced,
      });
    };

    updateCapabilities();
    window.addEventListener("resize", updateCapabilities);
    return () => window.removeEventListener("resize", updateCapabilities);
  }, []);

  return performance;
}
