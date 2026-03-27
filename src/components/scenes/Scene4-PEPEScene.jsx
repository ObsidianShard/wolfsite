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
            <Cliff key="cliff" position={[0, -8, 0]} color={0x2d4a2d} grassColor={0x3d6a3d} />
            <Sea key="sea" position={[0, -12, 30]} />
            <DeskSetup key="desk" position={[2, -6, 5]} />
            <FileCabinet key="cabinet" position={[-3, -7, 6]} />
            <AceCharacter key="ace" scale={0.8} idle={true} position={[0, -6, 3]} />
            <NeoTokyoBackground key="neotokyo" />
          </group>
        </Canvas>
      </div>
    </section>
  );
}

function Cliff({ position, color, grassColor }) {
  const mesh1Ref = useRef(null);
  const mesh2Ref = useRef(null);

  useFrame(({ clock }) => {
    if (!mesh1Ref.current || !mesh2Ref.current) return;
    const time = clock.getElapsedTime();
    // Subtle rock movement
    const rotation = Math.sin(time * 0.1) * 0.02;
    mesh1Ref.current.rotation.y = -Math.PI / 4 + rotation;
    mesh2Ref.current.rotation.y = -Math.PI / 4 + 0.05 + rotation;
  });

  return (
    <group position={position}>
      <mesh ref={mesh1Ref} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[50, 30, 10, 10]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      <mesh ref={mesh2Ref} rotation={[-Math.PI / 4 + 0.05, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[50, 30, 10, 10]} />
        <meshStandardMaterial color={grassColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

function Sea({ position }) {
  const waterRef = useRef(null);

  useFrame(({ clock }) => {
    if (!waterRef.current) return;
    const time = clock.getElapsedTime();
    // Gentle wave motion
    waterRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.1;
  });

  return (
    <group position={position}>
      <mesh ref={waterRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 80, 20, 20]} />
        <meshStandardMaterial color="#1a4a6a" roughness={0.1} metalness={0.6} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function NeoTokyoBackground() {
  const buildings = useMemo(() => {
    return [
      { pos: [-20, 5, 0], size: [15, 20, 2] },
      { pos: [-5, 8, 0], size: [12, 25, 2] },
      { pos: [10, 6, 0], size: [14, 18, 2] },
      { pos: [25, 7, 0], size: [10, 22, 2] },
    ];
  }, []);

  const bgGroupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!bgGroupRef.current) return;
    const time = clock.getElapsedTime();
    // Subtle parallax movement
    bgGroupRef.current.position.z = -10 + Math.sin(time * 0.1) * 2;
  });

  return (
    <group ref={bgGroupRef} position={[0, -10, 50]}>
      {buildings.map((building, index) => (
        <mesh key={index} position={building.pos}>
          <boxGeometry args={building.size} />
          <meshBasicMaterial color="#0a0a1a" />
        </mesh>
      ))}
      <pointLight position={[-15, 5, 1]} intensity={0.3} color="#00f5ff" />
      <pointLight position={[5, 8, 1]} intensity={0.4} color="#ff0055" />
    </group>
  );
}

export default Scene4PEPEScene;
