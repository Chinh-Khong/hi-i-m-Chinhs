"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface OrbitingTech {
  name: string;
  color: string;
  icon: string;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  yOffset: number;
}

const techSatellites: OrbitingTech[] = [
  { name: "ReactJS", color: "#61dafb", icon: "⚛", orbitRadius: 2.8, orbitSpeed: 0.65, phase: 0, yOffset: 0.25 },
  { name: "Next.js", color: "#ffffff", icon: "▲", orbitRadius: 3.4, orbitSpeed: -0.55, phase: 1.25, yOffset: -0.35 },
  { name: "TypeScript", color: "#38bdf8", icon: "TS", orbitRadius: 3.0, orbitSpeed: 0.5, phase: 2.5, yOffset: 0.45 },
  { name: "Webflow", color: "#4353ff", icon: "W", orbitRadius: 3.7, orbitSpeed: -0.42, phase: 3.8, yOffset: -0.3 },
  { name: "TailwindCSS", color: "#22d3ee", icon: "≈", orbitRadius: 3.2, orbitSpeed: 0.48, phase: 5.1, yOffset: 0.15 },
];

function OrbitTrajectory({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.008, radius + 0.008, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Helper to create high-performance GPU Sprite billboard textures with razor-sharp super-sampling
function createBadgeTexture(name: string, color: string, icon: string): THREE.Texture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 288;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background pill with glowing border
  ctx.fillStyle = "rgba(6, 8, 28, 0.94)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.roundRect(16, 16, 992, 256, 128);
  ctx.fill();
  ctx.stroke();

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;

  // Draw text & icon (crisp bold typography)
  ctx.font = "bold 82px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${icon}  ${name}`, 512, 144);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function CelestialCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.z += delta * 0.05;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.16;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group>
      {/* Inner glowing energy core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Holographic glowing wireframe sphere */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.55, 24, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Gyroscopic Planetary Ring 1 */}
      <mesh ref={ringRef1} rotation={[1.15, 0.4, 0]}>
        <ringGeometry args={[2.05, 2.18, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gyroscopic Planetary Ring 2 */}
      <mesh ref={ringRef2} rotation={[-0.85, -0.6, 0.3]}>
        <ringGeometry args={[2.35, 2.45, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gyroscopic Ring 3 (Equatorial) */}
      <mesh ref={ringRef3} rotation={[0.4, 1.2, 0.5]}>
        <ringGeometry args={[2.65, 2.72, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function OrbitingSatellite({ tech }: { tech: OrbitingTech }) {
  const satRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const elapsedRef = useRef(0);

  const texture = useMemo(() => {
    return createBadgeTexture(tech.name, tech.color, tech.icon);
  }, [tech.name, tech.color, tech.icon]);

  useFrame((_, delta) => {
    if (!satRef.current) return;
    elapsedRef.current += delta;
    const time = elapsedRef.current * tech.orbitSpeed + tech.phase;
    const x = Math.cos(time) * tech.orbitRadius;
    const z = Math.sin(time) * tech.orbitRadius;
    const y = tech.yOffset + Math.sin(time * 2) * 0.25;

    satRef.current.position.set(x, y, z);
  });

  return (
    <>
      <OrbitTrajectory radius={tech.orbitRadius} color={tech.color} />
      <group ref={satRef}>
        {/* 3D Satellite Sphere */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.4 : 1}
        >
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color={tech.color}
            emissive={tech.color}
            emissiveIntensity={hovered ? 1.5 : 0.7}
          />
        </mesh>

        {/* Faint atmospheric ring around satellite */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.34, 32]} />
          <meshBasicMaterial
            color={tech.color}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* High Performance Native Three.js GPU Sprite Badge */}
        {texture && (
          <sprite position={[0, 0.48, 0]} scale={hovered ? [1.5, 0.42, 1] : [1.25, 0.35, 1]}>
            <spriteMaterial map={texture} transparent depthTest={false} />
          </sprite>
        )}
      </group>
    </>
  );
}

function InteractiveScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      // Gentle mouse tilt reaction with smooth dampening
      const targetRotX = pointer.y * 0.32;
      const targetRotY = pointer.x * 0.42;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef}>
        <CelestialCore />
        {techSatellites.map((tech) => (
          <OrbitingSatellite key={tech.name} tech={tech} />
        ))}
      </group>
    </Float>
  );
}

export default function HeroCelestialPlanet() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
      {/* Multi-layered ambient background glow halo */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-600/20 to-purple-600/25 blur-[90px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-48 h-48 rounded-full bg-cyan-400/15 blur-[60px] pointer-events-none" />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.8} color="#38bdf8" />
        <pointLight position={[-5, -5, -2]} intensity={1.4} color="#c084fc" />

        <InteractiveScene />
      </Canvas>
    </div>
  );
}
