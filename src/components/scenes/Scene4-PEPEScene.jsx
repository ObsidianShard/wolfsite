import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AceCharacter } from '../characters/AceCharacter';
import { DeskSetup } from '../common/DeskSetup';
import { FileCabinet } from '../common/FileCabinet';

export function Scene4PEPEScene() {
  const cliffGroupRef = useRef(null);

  return (
    <section className="scene scene-4" style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'linear-gradient(to bottom, #0a0a0f 0%, #2d4a2d 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} color="#0a1a2a" />
          <pointLight position={[5, 5, 0]} intensity={0.6} color="#ff8c42" />
          <pointLight position={[-5, 5, 0]} intensity={0.4} color="#00f5ff" />
          <group ref={cliffGroupRef} position={[0, -15, 0]}>
            <Cliff position={[0, -8, 0]} color={0x2d4a2d} grassColor={0x3d6a3d} />
            <Sea position={[0, -12, 30]} />
            <DeskSetup position={[2, -6, 5]} />
            <FileCabinet position={[-3, -7, 6]} />
            <AceCharacter scale={0.8} idle={true} position={[0, -6, 3]} />
            <NeoTokyoBackground />
          </group>
        </Canvas>
      </div>
    </section>
  );
}

function Cliff({ position, color, grassColor }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[50, 30, 10, 10]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 4 + 0.05, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[50, 30, 10, 10]} />
        <meshStandardMaterial color={grassColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

function Sea({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 80, 20, 20]} />
        <meshStandardMaterial color="#1a4a6a" roughness={0.1} metalness={0.6} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function NeoTokyoBackground() {
  return (
    <group position={[0, -10, 50]}>
      <mesh position={[-20, 5, 0]}>
        <boxGeometry args={[15, 20, 2]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>
      <mesh position={[-5, 8, 0]}>
        <boxGeometry args={[12, 25, 2]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>
      <mesh position={[10, 6, 0]}>
        <boxGeometry args={[14, 18, 2]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>
      <mesh position={[25, 7, 0]}>
        <boxGeometry args={[10, 22, 2]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>
      <pointLight position={[-15, 5, 1]} intensity={0.3} color="#00f5ff" />
      <pointLight position={[5, 8, 1]} intensity={0.4} color="#ff0055" />
    </group>
  );
}

export default Scene4PEPEScene;
