"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  3D Insulation Slab — with product image on front face                     */
/* -------------------------------------------------------------------------- */

function InsulationSlab({
  targetColor,
  yPosition,
  texture,
}: {
  targetColor: string;
  yPosition: number;
  texture: THREE.Texture | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const currentColor = useRef(new THREE.Color(targetColor));
  const targetCol = useRef(new THREE.Color(targetColor));

  targetCol.current.set(targetColor);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    /* Smooth color transition */
    currentColor.current.lerp(targetCol.current, delta * 5);
    if (matRef.current) {
      matRef.current.color.copy(currentColor.current);
    }

    /* Smooth Y position (drop from top) */
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      yPosition,
      delta * 4,
    );

    /* Auto-rotate */
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Slab body — variant colored */}
        <mesh castShadow>
          <boxGeometry args={[2.4, 3.2, 0.35]} />
          <meshPhysicalMaterial
            ref={matRef}
            roughness={0.2}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Front face — product image */}
        {texture && (
          <mesh position={[0, 0, 0.176]}>
            <planeGeometry args={[2.3, 3.1]} />
            <meshStandardMaterial map={texture} roughness={0.3} />
          </mesh>
        )}

        {/* Subtle wireframe for tech feel */}
        <mesh scale={[1.002, 1.002, 1.002]}>
          <boxGeometry args={[2.4, 3.2, 0.35]} />
          <meshBasicMaterial
            wireframe
            color="white"
            transparent
            opacity={0.04}
          />
        </mesh>

        {/* Top edge accent */}
        <mesh position={[0, 1.62, 0]}>
          <boxGeometry args={[2.42, 0.03, 0.37]} />
          <meshBasicMaterial color={targetColor} transparent opacity={0.6} />
        </mesh>

        {/* Bottom edge accent */}
        <mesh position={[0, -1.62, 0]}>
          <boxGeometry args={[2.42, 0.03, 0.37]} />
          <meshBasicMaterial color={targetColor} transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene — loads all textures, picks active one                              */
/* -------------------------------------------------------------------------- */

function Scene({
  color,
  yPosition,
  imageUrls,
  activeIdx,
}: {
  color: string;
  yPosition: number;
  imageUrls: string[];
  activeIdx: number;
}) {
  const textures = useLoader(THREE.TextureLoader, imageUrls);
  const activeTexture = textures[activeIdx] ?? null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -5]} intensity={0.3} />
      <pointLight position={[-4, 2, -3]} intensity={0.6} color={color} />
      <pointLight position={[3, -2, 4]} intensity={0.4} color={color} />
      <InsulationSlab
        targetColor={color}
        yPosition={yPosition}
        texture={activeTexture}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Canvas wrapper — default export for dynamic() import                      */
/* -------------------------------------------------------------------------- */

export default function VariantCanvas({
  color,
  yPosition,
  imageUrls,
  activeIdx,
}: {
  color: string;
  yPosition: number;
  imageUrls: string[];
  activeIdx: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene
          color={color}
          yPosition={yPosition}
          imageUrls={imageUrls}
          activeIdx={activeIdx}
        />
      </Suspense>
    </Canvas>
  );
}
