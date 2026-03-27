import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Stars } from '@react-three/drei';

// --- PHASE 1 COMPONENT ---
function Phase1Space() {
  const geometryRef = useRef();

  // useFrame runs on every monitor refresh (usually 60fps) to animate things
  useFrame((state, delta) => {
    // Slowly rotate the sacred geometry
    geometryRef.current.rotation.y += delta * 0.05;
    geometryRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Nebula Lighting Effect (Pink and Cyan lights hitting the geometry) */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 5]} color="#ff00ff" intensity={500} />
      <pointLight position={[-10, -10, 5]} color="#00ffff" intensity={500} />

      {/* 2. The Cosmic Background */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={1} />

      {/* 3. The Sacred Geometry (Icosahedron) */}
      <mesh ref={geometryRef} position={[0, 0, -5]}>
        {/* args: [radius, detail] */}
        <icosahedronGeometry args={[5, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
          emissive="#0088ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      
      {/* The 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        
        {/* ScrollControls sets up the invisible scrollbar. pages={4} equals our 4 phases! */}
        <ScrollControls pages={4} damping={0.2}>
          
          <Scroll>
            {/* We will add Phases 2, 3, and 4 deeper down the Z-axis later */}
            <Phase1Space />
          </Scroll>

          {/* This Scroll block is for normal HTML text that floats over the 3D world */}
          <Scroll html style={{ width: '100%' }}>
            <h1 style={{ color: 'white', position: 'absolute', top: '10vh', left: '10vw', fontFamily: 'sans-serif', letterSpacing: '2px', opacity: 0.8 }}>
              PHASE 1: THE SOURCE
            </h1>
          </Scroll>

        </ScrollControls>
        
      </Canvas>
      
    </div>
  );
}
