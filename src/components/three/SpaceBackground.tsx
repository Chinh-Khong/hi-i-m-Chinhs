"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

// Starfield with thousands of subtle twinkling stars
function StarField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#93c5fd"), // Light blue
      new THREE.Color("#c4b5fd"), // Light violet
      new THREE.Color("#67e8f9"), // Light cyan
      new THREE.Color("#fbcfe8"), // Soft pink
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars in spherical shell around space
      const radius = 25 + Math.random() * 80;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Random color temperature
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Floating Cosmic Stardust Particles (foreground depth)
function CosmicDust({ count = 300 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      spd[i] = 0.2 + Math.random() * 0.4;
    }

    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    if (!dustRef.current) return;
    const pos = dustRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= delta * speeds[i] * 0.4; // Slowly drift down
      if (pos[i * 3 + 1] < -15) {
        pos[i * 3 + 1] = 15;
      }
    }
    dustRef.current.geometry.attributes.position.needsUpdate = true;
    dustRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#38bdf8"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Distant Mysterious Planet with Ring and Atmosphere
function DistantPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.04;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.02;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[16, 8, -35]}>
      {/* Soft planet core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#4338ca"
          emissiveIntensity={0.25}
          roughness={0.7}
        />
      </mesh>

      {/* Atmospheric glowing halo */}
      <mesh>
        <sphereGeometry args={[3.45, 32, 32]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planetary Ring */}
      <mesh ref={ringRef} rotation={[1.1, 0.4, 0]}>
        <ringGeometry args={[4.2, 6.5, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Shooting Stars
interface ShootingStarData {
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  length: number;
  life: number;
  maxLife: number;
  active: boolean;
}

function ShootingStars() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const starDataRef = useRef<ShootingStarData[]>([]);

  useEffect(() => {
    starDataRef.current = Array.from({ length: 3 }, () => ({
      pos: new THREE.Vector3(),
      dir: new THREE.Vector3(-1, -0.6, 0).normalize(),
      speed: 15,
      length: 2.5,
      life: 0,
      maxLife: 1.2,
      active: false,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!lineRef.current) return;
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;

    starDataRef.current.forEach((star, index) => {
      if (!star.active) {
        // Random chance to spawn
        if (Math.random() < 0.008) {
          star.pos.set(
            15 + Math.random() * 15,
            10 + Math.random() * 10,
            -15 - Math.random() * 15
          );
          star.speed = 22 + Math.random() * 15;
          star.life = 0;
          star.maxLife = 0.8 + Math.random() * 0.6;
          star.active = true;
        }
      } else {
        star.life += delta;
        star.pos.addScaledVector(star.dir, star.speed * delta);

        const tail = star.pos.clone().sub(star.dir.clone().multiplyScalar(star.length));

        positions[index * 6] = star.pos.x;
        positions[index * 6 + 1] = star.pos.y;
        positions[index * 6 + 2] = star.pos.z;

        positions[index * 6 + 3] = tail.x;
        positions[index * 6 + 4] = tail.y;
        positions[index * 6 + 5] = tail.z;

        if (star.life >= star.maxLife) {
          star.active = false;
          positions[index * 6] = 0;
          positions[index * 6 + 1] = 0;
          positions[index * 6 + 2] = 0;
          positions[index * 6 + 3] = 0;
          positions[index * 6 + 4] = 0;
          positions[index * 6 + 5] = 0;
        }
      }
    });

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const initialPositions = useMemo(() => new Float32Array(3 * 2 * 3), []);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Camera Rig tracking mouse parallax and scroll position
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollOffset.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(({ camera }) => {
    // Smooth lerp to mouse parallax position
    const targetX = mouse.current.x * 1.5;
    const targetY = mouse.current.y * 1.2 - scrollOffset.current * 4;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, -scrollOffset.current * 3, -20);
  });

  return null;
}

export default function SpaceBackground() {
  const { hasWebGL, particleCount, isMobile } = useDevicePerformance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-[#030014]" />;
  }

  // Graceful fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none cosmic-gradient-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030014]">
      {/* Deep Space Background Canvas */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <color attach="background" args={["#030014"]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />

        <CameraRig />
        <StarField count={particleCount} />
        <CosmicDust count={isMobile ? 100 : 250} />
        <DistantPlanet />
        {!isMobile && <ShootingStars />}
      </Canvas>

      {/* Atmospheric Vignette & Color Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.06),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.05),transparent_60%)]" />
    </div>
  );
}
