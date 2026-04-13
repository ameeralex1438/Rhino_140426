"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Floating particles mesh                                                    */
/* -------------------------------------------------------------------------- */

function Particles({ count = 80, color = "#FF6600" }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const [particles] = useState(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 8,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.06,
      });
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.8,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.6,
        p.z + Math.sin(t * p.speed * 0.5 + p.offset * 2) * 0.4,
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating rings                                                             */
/* -------------------------------------------------------------------------- */

function FloatingRing({
  position,
  color,
  speed,
  size,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * speed * 0.3;
      ref.current.rotation.y = t * speed * 0.5;
      ref.current.position.y = position[1] + Math.sin(t * speed) * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[size, size * 0.06, 16, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} wireframe />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Connecting lines mesh                                                      */
/* -------------------------------------------------------------------------- */

function ConnectionLines({ count = 30, color = "#FF6600", opacity = 0.06 }: { count?: number; color?: string; opacity?: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const idx = i * 6;
      arr[idx] = (Math.random() - 0.5) * 14;
      arr[idx + 1] = (Math.random() - 0.5) * 8;
      arr[idx + 2] = (Math.random() - 0.5) * 6;
      arr[idx + 3] = arr[idx] + (Math.random() - 0.5) * 3;
      arr[idx + 4] = arr[idx + 1] + (Math.random() - 0.5) * 2;
      arr[idx + 5] = arr[idx + 2] + (Math.random() - 0.5) * 2;
    }
    return arr;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

function DarkScene() {
  return (
    <>
      <Particles count={60} color="#FF6600" />
      <Particles count={30} color="#FF8800" />
      <Particles count={20} color="#2DB86E" />
      <ConnectionLines count={25} color="#FF6600" opacity={0.06} />
      <FloatingRing position={[-4, 1, -2]} color="#FF6600" speed={0.6} size={1.8} />
      <FloatingRing position={[4, -0.5, -3]} color="#2DB86E" speed={0.4} size={1.4} />
      <FloatingRing position={[0, 2, -4]} color="#FF8800" speed={0.5} size={2.2} />
    </>
  );
}

function LightScene() {
  return (
    <>
      <Particles count={40} color="#FF6600" />
      <Particles count={25} color="#FFB380" />
      <Particles count={15} color="#2DB86E" />
      <ConnectionLines count={20} color="#FF6600" opacity={0.04} />
      <FloatingRing position={[-5, 1.5, -3]} color="#FF6600" speed={0.4} size={2} />
      <FloatingRing position={[5, -1, -4]} color="#2DB86E" speed={0.3} size={1.6} />
      <FloatingRing position={[0, 2.5, -5]} color="#FFB380" speed={0.35} size={2.5} />
      <FloatingRing position={[-2, -2, -3]} color="#FF8800" speed={0.25} size={1.2} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Export                                                                     */
/* -------------------------------------------------------------------------- */

export function FloatingParticlesBackground({ light = false }: { light?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${light ? "opacity-40" : "opacity-70"}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {light ? <LightScene /> : <DarkScene />}
      </Canvas>
    </div>
  );
}
