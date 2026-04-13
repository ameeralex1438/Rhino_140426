"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Floating geometric shapes                                                  */
/* -------------------------------------------------------------------------- */

function FloatingShape({
  position,
  color,
  speed,
  size,
  type,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
  type: "octahedron" | "icosahedron" | "dodecahedron" | "torus";
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * speed * 0.2 + offset;
      ref.current.rotation.y = t * speed * 0.3;
      ref.current.rotation.z = t * speed * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * speed * 0.5 + offset) * 0.6;
      ref.current.position.x = position[0] + Math.cos(t * speed * 0.3 + offset) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {type === "octahedron" && <octahedronGeometry args={[size, 0]} />}
      {type === "icosahedron" && <icosahedronGeometry args={[size, 0]} />}
      {type === "dodecahedron" && <dodecahedronGeometry args={[size, 0]} />}
      {type === "torus" && <torusGeometry args={[size, size * 0.3, 12, 24]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating dots grid                                                         */
/* -------------------------------------------------------------------------- */

function DotGrid({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const [dots] = useState(() => {
    const arr = [];
    const cols = 20;
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      arr.push({
        x: (col - cols / 2) * 0.9,
        y: (row - rows / 2) * 0.9,
        z: -3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    dots.forEach((d, i) => {
      const wave = Math.sin(d.x * 0.4 + t * 0.5) * Math.cos(d.y * 0.4 + t * 0.3) * 0.5;
      dummy.position.set(d.x, d.y + wave * 0.3, d.z + wave);
      const s = 0.02 + Math.sin(t * d.speed + d.offset) * 0.008;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FF6600" transparent opacity={0.2} />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Flowing curves                                                             */
/* -------------------------------------------------------------------------- */

function FlowingCurve({
  color,
  yOffset,
  speed,
}: {
  color: string;
  yOffset: number;
  speed: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const points = 80;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = ref.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position;
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 16 - 8;
      const y = yOffset + Math.sin(x * 0.5 + t * speed) * 1.2 + Math.cos(x * 0.3 + t * speed * 0.7) * 0.5;
      const z = -2 + Math.sin(x * 0.2 + t * speed * 0.5) * 0.5;
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  });

  const initialPositions = useMemo(() => {
    const arr = new Float32Array(points * 3);
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 16 - 8;
      arr[i * 3] = x;
      arr[i * 3 + 1] = yOffset;
      arr[i * 3 + 2] = -2;
    }
    return arr;
  }, [yOffset]);

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.08} />
    </line>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

function Scene() {
  return (
    <>
      <DotGrid count={180} />

      {/* Geometric shapes */}
      <FloatingShape position={[-5, 2.5, -2]} color="#FF6600" speed={0.3} size={0.7} type="octahedron" />
      <FloatingShape position={[5.5, -1.5, -3]} color="#2DB86E" speed={0.25} size={0.6} type="icosahedron" />
      <FloatingShape position={[-3, -2, -2.5]} color="#FF8800" speed={0.35} size={0.5} type="dodecahedron" />
      <FloatingShape position={[3, 3, -4]} color="#FF6600" speed={0.2} size={0.8} type="torus" />
      <FloatingShape position={[6, 1.5, -3]} color="#FF8800" speed={0.28} size={0.45} type="octahedron" />
      <FloatingShape position={[-6, -0.5, -3.5]} color="#2DB86E" speed={0.22} size={0.55} type="torus" />

      {/* Flowing curves */}
      <FlowingCurve color="#FF6600" yOffset={2} speed={0.6} />
      <FlowingCurve color="#FF8800" yOffset={0} speed={0.45} />
      <FlowingCurve color="#2DB86E" yOffset={-2} speed={0.55} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Export                                                                     */
/* -------------------------------------------------------------------------- */

export function FloatingGridBackground() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
