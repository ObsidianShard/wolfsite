/**
 * Desk Setup - 4 interactive monitors
 * 
 * Shows placeholder dashboards for:
 * - OpenClaw Dashboard
 * - Claude Insights
 * - Hermes Demo
 * - Autoresearch Progress
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DeskSetup({ position = [0, 0, 0] }) {
  const deskRef = useRef(null);

  useFrame(({ clock }) => {
    if (!deskRef.current) return;

    const time = clock.getElapsedTime();
    // Subtle floating animation
    deskRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.05;
  });

  const monitorColors = useMemo(() => ({
    background: '#0a0a1a',
    border: '#2a2a4a',
    text: '#ffffff',
    accent1: '#00f5ff',
    accent2: '#ff0055',
    accent3: '#ff00ff',
    accent4: '#ffd700',
  }), []);

  return (
    <group ref={deskRef} position={position}>
      {/* Desk surface */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[10, 0.3, 4]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.4} />
      </mesh>

      {/* Monitor 1 - OpenClaw */}
      <Monitor 
        position={[-3.5, 0.5, 0.5]} 
        color={monitorColors.accent1}
        title="OPENCLAW"
        label="System Status"
      />

      {/* Monitor 2 - Claude */}
      <Monitor 
        position={[-1, 0.5, 0.5]} 
        color={monitorColors.accent2}
        title="CLAUDE"
        label="API Insights"
      />

      {/* Monitor 3 - Hermes */}
      <Monitor 
        position={[1.5, 0.5, 0.5]} 
        color={monitorColors.accent3}
        title="HERMES"
        label="Model Demo"
      />

      {/* Monitor 4 - Autoresearch */}
      <Monitor 
        position={[4, 0.5, 0.5]} 
        color={monitorColors.accent4}
        title="AUTORESEARCH"
        label="Progress"
      />

      {/* Laptop */}
      <mesh position={[0, 0.2, 1]}>
        <boxGeometry args={[2.5, 0.1, 1.8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, 0.5]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2.3, 1.6, 0.02]} />
        <meshBasicMaterial color={monitorColors.background} />
      </mesh>

      {/* Desk lights */}
      <pointLight position={[-4, 0.5, 0.5]} intensity={0.4} color={monitorColors.accent1} />
      <pointLight position={[4, 0.5, 0.5]} intensity={0.4} color={monitorColors.accent4} />
    </group>
  );
}

/**
 * Individual Monitor Component
 */
function Monitor({ position, color, title, label }) {
  const screenRef = useRef(null);

  useFrame(({ clock }) => {
    if (!screenRef.current) return;

    const time = clock.getElapsedTime();
    // Subtle screen glow pulse
    const glow = 0.8 + Math.sin(time * 0.5) * 0.2;
    screenRef.current.material.emissiveIntensity = glow * 0.3;
  });

  return (
    <group position={position}>
      {/* Monitor stand */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
      </mesh>

      {/* Screen content */}
      <mesh ref={screenRef} position={[0, 0.5, 0.06]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[2.8, 1.8, 0.01]} />
        <meshBasicMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Title label (simple text representation) */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[3, 0.3]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default DeskSetup;
