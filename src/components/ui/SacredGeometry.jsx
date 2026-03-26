import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SacredGeometry.jsx - Flower of Life wireframe overlay
 * 
 * Creates an elegant Flower of Life pattern as a floating wireframe
 * that spans Scene 1-2 visibility. Features:
 * - Rotating hexagonal structure
 * - Emissive glow
 * - Subtle transparency
 * - Positioned to be visible across transitions
 * 
 * Visual: Sacred geometry as unifying thread
 * VISION.md reference: "Prominent visual element across Scene 1-2"
 */

export function SacredGeometry({ 
  position = [0, 0, 0],
  scale = 1.5,
  rotationSpeed = 0.05,
  emissiveColor = "#ffd700",
  emissiveIntensity = 0.6,
  wireframeOpacity = 0.4,
  visibilityStart = 0,
  visibilityEnd = 2
}) {
  const groupRef = useRef(null);
  
  // Generate Flower of Life geometry procedurally
  const geometry = useMemo(() => {
    return createFlowerOfLife();
  }, []);

  // Create material
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: emissiveColor,
      transparent: true,
      opacity: wireframeOpacity,
      emissive: emissiveColor,
      emissiveIntensity: emissiveIntensity,
      side: THREE.DoubleSide,
      wireframe: true
    });
  }, [emissiveColor, emissiveIntensity, wireframeOpacity]);

  // Animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.z += rotationSpeed;
      // Subtle pulsing
      const time = clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 0.5) * 0.02;
      groupRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {geometry}
    </group>
  );
}

/**
 * Create Flower of Life pattern using Three.js
 * Returns a group of wireframe circles arranged in Flower of Life hexagonal pattern
 */
function createFlowerOfLife() {
  const group = new THREE.Group();
  
  // Flower of Life pattern: 7 circles at center + 6 surrounding
  const circleRadius = 0.35;
  const centerX = 0;
  const centerY = 0;
  
  // Center circle
  const centerCircle = new THREE.Mesh(
    new THREE.CircleGeometry(circleRadius, 32),
    new THREE.MeshBasicMaterial({
      color: "#ffd700",
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      wireframe: true
    })
  );
  centerCircle.position.set(0, 0, 0);
  group.add(centerCircle);
  
  // 6 surrounding circles in hexagonal pattern
  const hexRadius = circleRadius;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = centerX + hexRadius * Math.cos(angle);
    const y = centerY + hexRadius * Math.sin(angle);
    
    const circle = new THREE.Mesh(
      new THREE.CircleGeometry(circleRadius, 32),
      new THREE.MeshBasicMaterial({
        color: "#ffd700",
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        wireframe: true
      })
    );
    circle.position.set(x, y, 0);
    group.add(circle);
  }
  
  // Add connecting lines (hexagonal structure)
  const linesGeometry = new THREE.BufferGeometry();
  const points = [];
  
  // Center to all 6 surrounding
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = hexRadius * Math.cos(angle);
    const y = hexRadius * Math.sin(angle);
    points.push(0, 0, 0);
    points.push(x, y, 0);
  }
  
  // Outer hexagonal ring
  for (let i = 0; i < 6; i++) {
    const i1 = i;
    const i2 = (i + 1) % 6;
    const angle1 = (i1 * Math.PI) / 3;
    const angle2 = (i2 * Math.PI) / 3;
    
    points.push(
      hexRadius * Math.cos(angle1),
      hexRadius * Math.sin(angle1),
      0
    );
    points.push(
      hexRadius * Math.cos(angle2),
      hexRadius * Math.sin(angle2),
      0
    );
  }
  
  linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  const lines = new THREE.LineSegments(
    linesGeometry,
    new THREE.LineBasicMaterial({
      color: "#ffd700",
      transparent: true,
      opacity: 0.3
    })
  );
  group.add(lines);
  
  return group;
}

/**
 * Alternative: Tetrahedron sacred geometry
 * Simpler, more geometric option
 */
export function TetrahedronGeometry({
  position = [0, 0, 0],
  size = 2,
  rotationSpeed = 0.03,
  emissiveColor = "#00ffff",
  emissiveIntensity = 0.5,
  opacity = 0.3
}) {
  const groupRef = useRef(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.5;
      groupRef.current.rotation.z = Math.cos(time * rotationSpeed) * 0.5;
      
      // Pulsing
      const pulse = 1 + Math.sin(time * 0.3) * 0.05;
      groupRef.current.scale.setScalar(size * pulse);
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <tetrahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={opacity}
          wireframe
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

/**
 * Alternative: Octahedron sacred geometry
 * Complex, symmetrical pattern
 */
export function OctahedronGeometry({
  position = [0, 0, 0],
  size = 2.5,
  rotationSpeed = 0.04,
  emissiveColor = "#ff00ff",
  emissiveIntensity = 0.4,
  opacity = 0.25
}) {
  const groupRef = useRef(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.set(
        time * rotationSpeed * 0.5,
        time * rotationSpeed * 0.7,
        time * rotationSpeed * 0.3
      );
      
      // Pulsing
      const pulse = 1 + Math.sin(time * 0.4) * 0.03;
      groupRef.current.scale.setScalar(size * pulse);
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={opacity}
          wireframe
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );
}

export default SacredGeometry;
