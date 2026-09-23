"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 200): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(sectionIds[i]);
            return;
          }
        }
      }

      if (sectionIds.length > 0) {
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
