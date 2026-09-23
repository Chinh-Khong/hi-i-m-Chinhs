"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const width = window.innerWidth;
      const height = window.innerHeight;

      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX: (clientX / width) * 2 - 1,
        normalizedY: -(clientY / height) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}
