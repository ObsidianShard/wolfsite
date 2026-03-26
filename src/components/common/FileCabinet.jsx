/**
 * File Cabinet - Interactive storage for 25 research papers
 * 
 * Each paper is represented as a drawer/folder
 * Click to view abstract + link
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FileCabinet({ position = [0, 0, 0] }) {
  const cabinetRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useFrame(({ clock }) => {
    if (!cabinetRef.current) return;

    const time = clock.getElapsedTime();
    // Subtle idle animation
    cabinetRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
  });

  const cabinetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x2d2520,
      roughness: 0.7,
      metalness: 0.3,
    });
  }, []);

  const paperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xf5f5dc,
      roughness: 0.9,
    });
  }, []);

  return (
    <group ref={cabinetRef} position={position}>
      {/* Cabinet base */}
      <mesh position={[0, 1, 0]} material={cabinetMaterial}>
        <boxGeometry args={[2.5, 2, 1]} />
      </mesh>

      {/* Drawer handles */}
      <mesh position={[-1.1, 1, 1.1]}>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[1.1, 1, 1.1]}>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Paper stack (hidden inside cabinet, shown when open) */}
      <PaperStack isOpen={isOpen} position={[0, 2, 0.6]} />
    </group>
  );
}

/**
 * Stack of research papers
 */
function PaperStack({ isOpen, position }) {
  const stackRef = useRef(null);
  const papers = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      yOffset: 0.1 + i * 0.05,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!stackRef.current) return;

    const time = clock.getElapsedTime();
    // Gentle floating when open
    const targetY = position[1] + (isOpen ? Math.sin(time * 0.3) * 0.1 : 0);
    stackRef.current.position.y = THREE.MathUtils.lerp(
      stackRef.current.position.y,
      targetY,
      0.05
    );

    // Rotation when open
    const targetRot = isOpen ? 0.1 : 0;
    stackRef.current.rotation.x = THREE.MathUtils.lerp(
      stackRef.current.rotation.x,
      targetRot,
      0.05
    );
  });

  return (
    <group ref={stackRef} position={position}>
      {papers.map((paper, index) => (
        <Paper 
          key={paper.id}
          position={[
            0,
            paper.yOffset,
            0
          ]}
          index={index}
        />
      ))}
    </group>
  );
}

/**
 * Individual paper/folder
 */
function Paper({ position, index }) {
  const paperRef = useRef(null);

  useFrame(({ clock }) => {
    if (!paperRef.current) return;

    const time = clock.getElapsedTime();
    const indexOffset = index * 0.1;
    
    // Subtle rotation based on index
    paperRef.current.rotation.y = Math.sin(time * 0.2 + indexOffset) * 0.05;
  });

  return (
    <mesh ref={paperRef} position={position}>
      <boxGeometry args={[1, 0.08, 0.7]} />
      <meshStandardMaterial color="#f5f5dc" />
      
      {/* Paper label */}
      <mesh position={[0, 0, 0.04]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial color="#2d2520" />
      </mesh>
    </mesh>
  );
}

export default FileCabinet;
