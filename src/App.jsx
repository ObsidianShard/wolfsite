import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function AnimatedCube() {
  const meshRef = useRef(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime();
      meshRef.current.rotation.y = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#0a0a0f' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedCube />
      </Canvas>
    </div>
  );
}
