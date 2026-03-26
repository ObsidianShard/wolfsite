import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function Scene1Test() {
  const globeRef = useRef(null);
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <section style={{ 
      width: '100%', 
      height: '100vh', 
      background: '#0a0a0f',
      overflow: 'hidden'
    }}>
      <div style={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00ffff" />
          
          <mesh ref={globeRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhongMaterial 
              color="#1a4a8a" 
              emissive="#1a4a8a"
              emissiveIntensity={0.2}
              shininess={20}
            />
          </mesh>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
      
      {/* Simple text overlay */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: '#00ffff',
        fontFamily: 'monospace',
        fontSize: '24px'
      }}>
        WOLFSKIND
      </div>
    </section>
  );
}

export default Scene1Test;
