import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Logo } from '../../components/ui/Logo';
import { generateAsciiTrail, createEarthTexture } from '../../utils/ascii-art';
import { sceneAnimations } from '../../scenes/earth.scene';

/**
 * Scene1-Earth.jsx - First parallax scene (Earth from Orbit)
 * 
 * Creates the "overview effect" - seeing Earth from satellite POV
 * with spinning globe, ASCII motion blur, and WOLFSKIND logo reveal.
 * 
 * Core concept:
 * - Three.js 3D globe with procedural earth texture
 * - ASCII character motion blur overlay
 * - Subtle animations that feel meditative and awe-inspiring
 * - Neon cyan/magenta WOLFSKIND logo fades in elegantly
 */
export function Scene1Earth() {
  const scroll = useScrollPosition();
  const sceneRef = useRef(null);
  
  return (
    <section 
      className="scene scene-1"
      ref={sceneRef}
      id="scene-1"
    >
      {/* ASCII motion blur canvas */}
      <AsciiOverlay scroll={scroll} />
      
      {/* 3D Globe Scene */}
      <div className="globe-container">
        <Canvas 
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 3, 5]} 
            intensity={1.5}
            color="#ffffff"
          />
          <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00ffff" />
          
          <EarthGlobe />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>
      
      {/* WOLFSKIND Logo */}
      <div className="logo-section">
        <Logo visible={true} />
      </div>
      
      <style jsx>{`
        .scene-1 {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(
            to bottom,
            #0a0a0f 0%,
            #0a1a4a 20%,
            #0a1a4a 80%,
            #0a0a0f 100%
          );
          overflow: hidden;
        }
        
        .globe-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .logo-section {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          text-align: center;
        }
        
        /* Subtle star background */
        .scene-1::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255, 255, 255, 0.5), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 160px 120px, rgba(255, 255, 255, 0.6), transparent);
          background-size: 200px 200px;
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}

/**
 * EarthGlobe - Three.js 3D globe component
 * 
 * Renders a realistic-looking Earth with:
 * - Procedural blue/green earth texture
 * - Ambient + directional lighting for depth
 * - Auto-rotation
 * - Atmospheric glow effect
 */
function EarthGlobe() {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  
  // Create procedural earth texture
  const earthTexture = useMemo(() => {
    const canvas = createEarthTexture(512, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 16;
    return texture;
  }, []);
  
  useFrame(({ clock }) => {
    // Slow, meditative rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    
    // Subtle pulsing for atmosphere
    if (glowRef.current) {
      const time = clock.getElapsedTime();
      const scale = 1.05 + Math.sin(time * 0.5) * 0.02;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          emissive="#1a4a8a"
          emissiveIntensity={0.2}
          shininess={20}
          specular="#00ffff"
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh ref={glowRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Horizon line glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.01, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/**
 * AsciiOverlay - ASCII motion blur overlay
 * 
 * Creates a canvas overlay with moving ASCII characters
 * that simulate motion blur across the globe
 */
function AsciiOverlay({ scroll }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    let animationId;
    let lastTime = 0;
    
    const render = (time) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Generate ASCII trail based on scroll position
      const asciiRows = generateAsciiTrail(
        scroll.scrollY / 100, // Normalize scroll
        0.5, // Density
        40, // Width
        20   // Height
      );
      
      // Render each row with varying opacity
      asciiRows.forEach((row, rowIndex) => {
        ctx.fillStyle = '#00ffff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        
        const x = (rowIndex % 40) * 12;
        const y = Math.floor(rowIndex / 40) * 15 + canvas.height / 2 - 150;
        
        const opacity = 0.1 + (time * 0.001) % 0.3;
        ctx.globalAlpha = opacity;
        
        ctx.fillText(row, x, y);
      });
      
      animationId = requestAnimationFrame(render);
    };
    
    animationId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [scroll.scrollY]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 5
      }}
    />
  );
}

export default Scene1Earth;
