import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Scene2Atmosphere() {
  const cubeRef = useRef(null);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = clock.getElapsedTime();
      cubeRef.current.rotation.y = clock.getElapsedTime();
    }
  });

  return (
    <section className="scene scene-2" style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100vh',
      background: '#ff00ff'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <mesh ref={cubeRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </Canvas>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
        SCENE 2 TEST - PINK BACKGROUND + CUBE
      </div>
    </section>
  );
}

export default Scene2Atmosphere;
