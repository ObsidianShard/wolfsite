import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Scene2Atmosphere() {
  return (
    <section className="scene scene-2" style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a3a5a 50%, #0a0a0f 100%)'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedCube />
        </Canvas>
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        color: '#00f5ff', 
        fontSize: '24px',
        fontFamily: 'monospace',
        textShadow: '0 0 10px #00f5ff'
      }}>
        ATMOSPHERIC DESCENT
      </div>
    </section>
  );
}

function AnimatedCube() {
  const cubeRef = useRef(null);

  // useFrame INSIDE Canvas descendant - fixed!
  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      cubeRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#00f5ff" 
        emissive="#00f5ff" 
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default Scene2Atmosphere;
