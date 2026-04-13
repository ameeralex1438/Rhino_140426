"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Morphing blob                                                              */
/* -------------------------------------------------------------------------- */

function MorphBlob({ position, color, size, speed }: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.8;
    ref.current.position.x = position[0] + Math.cos(t * speed * 0.6 + offset) * 0.5;
    ref.current.rotation.x = t * speed * 0.15;
    ref.current.rotation.z = t * speed * 0.1;
    // Subtle scale pulse
    const s = size + Math.sin(t * speed * 1.5 + offset) * size * 0.1;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1, 3]} />
      <meshBasicMaterial color={color} transparent opacity={0.07} wireframe />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating hexagon rings                                                     */
/* -------------------------------------------------------------------------- */

function HexRing({ position, color, speed, size }: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.x = t * speed * 0.3 + offset;
    ref.current.rotation.y = t * speed * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.4 + offset) * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[size, size * 0.04, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  DNA-like helix particles                                                   */
/* -------------------------------------------------------------------------- */

function HelixParticles({ count = 60, color = "#FF6600" }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [particles] = useState(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        t: (i / count) * Math.PI * 4,
        radius: 2.5 + Math.random() * 0.5,
        speed: 0.15 + Math.random() * 0.1,
        ySpread: (i / count) * 10 - 5,
        size: 0.02 + Math.random() * 0.03,
        strand: i % 2 === 0 ? 1 : -1,
      });
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const angle = p.t + t * p.speed;
      dummy.position.set(
        Math.cos(angle * p.strand) * p.radius,
        p.ySpread + Math.sin(t * 0.3) * 0.3,
        Math.sin(angle * p.strand) * p.radius - 3,
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ambient floating dust                                                      */
/* -------------------------------------------------------------------------- */

function FloatingDust({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [dots] = useState(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6 - 2,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        size: 0.015 + Math.random() * 0.02,
      });
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    dots.forEach((d, i) => {
      dummy.position.set(
        d.x + Math.sin(t * d.speed + d.offset) * 0.5,
        d.y + Math.cos(t * d.speed * 0.7 + d.offset) * 0.4,
        d.z,
      );
      dummy.scale.setScalar(d.size);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#2DB86E" transparent opacity={0.12} />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

function Scene() {
  return (
    <>
      {/* Morphing blobs */}
      <MorphBlob position={[-4, 2, -4]} color="#FF6600" size={1.2} speed={0.3} />
      <MorphBlob position={[5, -1, -5]} color="#2DB86E" size={1} speed={0.25} />
      <MorphBlob position={[0, 3, -6]} color="#FF8800" size={0.8} speed={0.35} />

      {/* Hex rings */}
      <HexRing position={[-3, -2, -3]} color="#FF6600" speed={0.4} size={1.5} />
      <HexRing position={[4, 2, -4]} color="#2DB86E" speed={0.3} size={1.2} />
      <HexRing position={[1, -3, -5]} color="#FF8800" speed={0.35} size={1.8} />

      {/* DNA helix particles */}
      <HelixParticles count={50} color="#FF6600" />

      {/* Floating dust */}
      <FloatingDust count={35} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Export                                                                     */
/* -------------------------------------------------------------------------- */

export function FloatingOrbsBackground() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
