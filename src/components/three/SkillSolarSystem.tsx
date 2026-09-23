"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/data/skills";
import { SkillItem } from "@/types";

// High-resolution GPU Sprite billboard texture for crystal-clear planet badges (1024x256 super-sampled)
function createSkillBadgeTexture(name: string, color: string, emblem: string): THREE.Texture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background pill with dark cyber glass
  ctx.fillStyle = "rgba(5, 7, 24, 0.94)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(16, 16, 992, 224, 112);
  ctx.fill();
  ctx.stroke();

  // Subtle ambient glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;

  // Text with emblem (Razor-sharp bold typography)
  ctx.font = "bold 80px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${emblem}  ${name}`, 512, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function createCenterSunTexture(): THREE.Texture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "rgba(6, 10, 32, 0.96)";
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.roundRect(16, 16, 992, 224, 112);
  ctx.fill();
  ctx.stroke();

  ctx.shadowColor = "#38bdf8";
  ctx.shadowBlur = 30;

  ctx.font = "bold 82px monospace";
  ctx.fillStyle = "#38bdf8";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦ FRONTEND CORE ✦", 512, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

interface SkillPlanetProps {
  skill: SkillItem;
  onHover: (skill: SkillItem | null) => void;
  isHovered: boolean;
}

function OrbitLine({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.16}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SkillPlanet({ skill, onHover, isHovered }: SkillPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);

  const badgeTexture = useMemo(() => {
    return createSkillBadgeTexture(skill.name, skill.color, skill.emblem);
  }, [skill.name, skill.color, skill.emblem]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const time = elapsedRef.current * skill.orbitSpeed * 0.35;
    const x = Math.cos(time) * skill.orbitRadius;
    const z = Math.sin(time) * skill.orbitRadius;
    groupRef.current.position.set(x, 0, z);

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  // Enlarged planet sizes for crisp readability and visual presence
  const planetSize = skill.isMain ? 0.44 : 0.32;

  return (
    <group ref={groupRef}>
      {/* 3D Planet Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        scale={isHovered ? 1.35 : 1}
      >
        <sphereGeometry args={[planetSize, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.6 : 0.75}
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>

      {/* Atmospheric Halo Glow */}
      <mesh scale={isHovered ? 1.6 : 1.28}>
        <sphereGeometry args={[planetSize, 24, 24]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={isHovered ? 0.45 : 0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planetary Ring for Core Stack (React, Next, Webflow, TS) */}
      {skill.isMain && (
        <mesh rotation={[Math.PI / 3, 0.3, 0]}>
          <ringGeometry args={[planetSize * 1.35, planetSize * 1.68, 64]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* High-Resolution GPU Sprite Badge (Positioned just above planet) */}
      {badgeTexture && (
        <sprite
          position={[0, planetSize + 0.42, 0]}
          scale={isHovered ? [1.8, 0.45, 1] : [1.45, 0.36, 1]}
        >
          <spriteMaterial map={badgeTexture} transparent depthTest={false} />
        </sprite>
      )}
    </group>
  );
}

// Center Star: "Frontend Core"
function CentralStar() {
  const starRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const sunTexture = useMemo(() => {
    return createCenterSunTexture();
  }, []);

  useFrame((_, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.2;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Star Core */}
      <mesh ref={starRef}>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={2.2}
          roughness={0.2}
        />
      </mesh>

      {/* Star Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Gyroscopic Energy Rings around the Core */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <ringGeometry args={[1.75, 1.82, 96]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, -0.2, 0]}>
        <ringGeometry args={[1.95, 2.02, 96]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crisp Sun Title Sprite */}
      {sunTexture && (
        <sprite position={[0, 1.68, 0]} scale={[2.0, 0.5, 1]}>
          <spriteMaterial map={sunTexture} transparent depthTest={false} />
        </sprite>
      )}
    </group>
  );
}

function GalaxyScene({
  onHover,
  hoveredSkill,
}: {
  onHover: (skill: SkillItem | null) => void;
  hoveredSkill: SkillItem | null;
}) {
  return (
    <group rotation={[0.55, 0, 0]}>
      <CentralStar />

      {skillsData.map((skill) => (
        <React.Fragment key={skill.name}>
          <OrbitLine radius={skill.orbitRadius} />
          <SkillPlanet
            skill={skill}
            onHover={onHover}
            isHovered={hoveredSkill?.name === skill.name}
          />
        </React.Fragment>
      ))}
    </group>
  );
}

interface SkillSolarSystemProps {
  onSelectSkill?: (skill: SkillItem | null) => void;
}

export default function SkillSolarSystem({ onSelectSkill }: SkillSolarSystemProps) {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const handleHover = (skill: SkillItem | null) => {
    setHoveredSkill(skill);
    onSelectSkill?.(skill);
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[530px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)]" />

      {/* Floating HUD info for hovered planet */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        {hoveredSkill ? (
          <div className="px-4 py-3 rounded-2xl border border-cyan-400/50 bg-slate-950/90 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.35)] max-w-xs transition-all duration-300">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <span style={{ color: hoveredSkill.color }}>{hoveredSkill.emblem}</span>
                {hoveredSkill.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
                {hoveredSkill.level}%
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-snug">
              {hoveredSkill.description}
            </p>
            <div className="mt-2 text-[10px] font-mono text-cyan-400">
              Proficiency: {hoveredSkill.levelLabel}
            </div>
          </div>
        ) : (
          <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Drag to rotate in 3D • Hover on a planet to inspect telemetry</span>
          </div>
        )}
      </div>

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 8.8, 14.5], fov: 46 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 0, 0]} intensity={3.5} distance={32} color="#38bdf8" />
        <pointLight position={[8, 12, 8]} intensity={1.2} color="#c084fc" />
        <directionalLight position={[10, 20, 10]} intensity={0.8} />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 7}
          rotateSpeed={0.5}
          enablePan={false}
        />

        <GalaxyScene onHover={handleHover} hoveredSkill={hoveredSkill} />
      </Canvas>
    </div>
  );
}
