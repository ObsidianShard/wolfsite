/**
 * ACE Character - Portgas D. Ace from One Piece
 * 
 * Character details from official source:
 * - Tall, muscular build
 * - Black curly/jaw-length hair
 * - Skeptical facial expression
 * - Freckles (inherited from mother)
 * - ASCE tattoo on left arm (S crossed out for Sabo)
 * - Casual clothes: dark t-shirt, shorts/pants
 * 
 * VISION.md reference: "EXACTLY like Ace from One Piece (red hair, confident pose, casual clothes - reference image available)"
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AceCharacter({
  position = [0, -2, 0],
  scale = 0.8,
  idle = true,
}) {
  const groupRef = useRef(null);
  const armRef = useRef(null);

  // Material configuration
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: 0xcc8866, // Light brown skin tone
        roughness: 0.7,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: 0x1a1a1a, // Black hair
        roughness: 0.5,
      }),
      shirt: new THREE.MeshStandardMaterial({
        color: 0x2d2d2d, // Dark t-shirt
        roughness: 0.8,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: 0x1a1a1a, // Dark pants
        roughness: 0.7,
      }),
      tattoo: new THREE.MeshStandardMaterial({
        color: 0x333333, // Dark tattoo
        roughness: 0.6,
      }),
    };
  }, []);

  // Character proportions
  const proportions = {
    headRadius: 0.3,
    headHeight: 0.4,
    torsoHeight: 0.8,
    torsoWidth: 0.45,
    armLength: 0.5,
    armWidth: 0.12,
    legLength: 0.7,
    legWidth: 0.15,
  };

  useFrame(({ clock }) => {
    if (!groupRef.current || !idle) return;

    const time = clock.getElapsedTime();
    
    // Subtle breathing animation
    const breathe = Math.sin(time * 0.5) * 0.02;
    groupRef.current.scale.y = scale + breathe;
    
    // Slight idle sway
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[proportions.headRadius, 32, 32]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>

      {/* Curly Hair - simplified as larger sphere with bumps */}
      <mesh position={[0, 0.7, -0.05]}>
        <sphereGeometry args={[proportions.headRadius * 1.3, 16, 16]} />
        <primitive object={materials.hair} attach="material" />
      </mesh>

      {/* Face features */}
      <mesh position={[0.08, 0.55, 0.25]} scale={[0.03, 0.03, 0.03]}>
        <sphereGeometry args={[1, 16, 16]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>
      <mesh position={[-0.08, 0.55, 0.25]} scale={[0.03, 0.03, 0.03]}>
        <sphereGeometry args={[1, 16, 16]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>

      {/* Body - Torso */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[proportions.torsoWidth, proportions.torsoHeight, 0.35]} />
        <primitive object={materials.shirt} attach="material" />
      </mesh>

      {/* Left Arm (with tattoo) */}
      <group position={[0.3, -0.2, 0]} ref={armRef}>
        {/* Upper arm */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.12, 0.12, proportions.armLength, 16]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>
        
        {/* Tattoo placeholder - simplified symbol */}
        <mesh position={[0.12, -0.2, 0]} scale={[0.08, 0.08, 0.08]}>
          <boxGeometry args={[1, 1, 0.05]} />
          <primitive object={materials.tattoo} attach="material" />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[-0.3, -0.2, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.12, 0.12, proportions.armLength, 16]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[0, -0.9, 0]}>
        <mesh position={[-0.15, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.12, proportions.legLength, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.12, proportions.legLength, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

export default AceCharacter;
