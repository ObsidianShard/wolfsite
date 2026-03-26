/**
 * Scene 3: Neo-Tokyo Skyline
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Scene3NeTokyo() {
  const cityGroupRef = useRef(null);
  const buildingGroupRef = useRef(null);

  const cityColors = useMemo(() => ({
    neonRed: '#ff0055',
    neonCyan: '#00f5ff',
    neonMagenta: '#ff00ff',
    darkShadow: '#0a0a1a',
    accentGold: '#ffd700',
  }), []);

  useFrame(({ clock }) => {
    if (!cityGroupRef.current) return;
    const time = clock.getElapsedTime();
    cityGroupRef.current.position.x += Math.sin(time * 0.3) * 0.2 * 0.01;
    cityGroupRef.current.position.y += Math.cos(time * 0.5) * 0.1 * 0.01;
  });

  return (
    <section className="scene scene-3" style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#0a0a1a' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.3} color="#ff00ff" />
          <group ref={cityGroupRef} position={[0, -10, 0]}>
            <group ref={buildingGroupRef}>
              <Building position={[-40, 5, 0]} height={25} color={cityColors.neonCyan} emissive={cityColors.neonCyan} />
              <Building position={[-25, 8, 0]} height={30} color={cityColors.neonRed} emissive={cityColors.neonRed} />
              <Building position={[-10, 6, 0]} height={22} color={cityColors.neonMagenta} emissive={cityColors.neonMagenta} />
              <Building position={[5, 10, 0]} height={35} color={cityColors.neonCyan} emissive={cityColors.neonCyan} />
              <Building position={[20, 7, 0]} height={28} color={cityColors.neonRed} emissive={cityColors.neonRed} />
              <Building position={[35, 9, 0]} height={32} color={cityColors.neonMagenta} emissive={cityColors.neonMagenta} />
              <mesh position={[0, -12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[200, 100]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
              </mesh>
              <pointLight position={[0, -8, 0]} intensity={0.5} color={cityColors.neonCyan} />
              <pointLight position={[-30, -8, 0]} intensity={0.3} color={cityColors.neonRed} />
              <pointLight position={[30, -8, 0]} intensity={0.3} color={cityColors.neonMagenta} />
            </group>
          </group>
        </Canvas>
      </div>
    </section>
  );
}

function Building({ position, height, color, emissive }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[8, height, 8]} />
      <meshStandardMaterial color="#1a1a1a" emissive={color} emissiveIntensity={0.6} roughness={0.3} metalness={0.7} />
      <mesh position={[0, height / 2, 0.01]}>
        <boxGeometry args={[8.2, 0.2, 8.2]} />
        <meshBasicMaterial color={emissive} transparent opacity={0.8} />
      </mesh>
    </mesh>
  );
}

export default Scene3NeTokyo;
