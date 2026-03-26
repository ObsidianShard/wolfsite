/**
 * Particle System - Atmospheric and Environmental Effects
 * 
 * Provides configurable particle systems for:
 * - Atmosphere (light diffusion, dust motes)
 * - Wind effects
 * - Cloud formations
 * - Weather transitions
 * 
 * VISION.md reference: "Particle physics for atmosphere"
 */

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Particle configuration for different effects
 */
export const PARTICLE_CONFIG = {
  ATMOSPHERE: {
    count: 3000,
    size: 0.02,
    color: [1, 0.8, 0.6], // Warm orange
    speed: 0.001,
    turbulence: 0.5,
    fadeSpeed: 0.0005,
  },
  WIND: {
    count: 5000,
    size: 0.01,
    color: [1, 1, 1], // White
    speed: 0.002,
    turbulence: 0.2,
    fadeSpeed: 0.001,
  },
  DUST: {
    count: 2000,
    size: 0.03,
    color: [0.9, 0.9, 0.8], // Slightly yellow
    speed: 0.0005,
    turbulence: 0.8,
    fadeSpeed: 0.0003,
  },
  NEBULA: {
    count: 8000,
    size: 0.04,
    color: [0.6, 0.4, 1], // Purple
    speed: 0.0008,
    turbulence: 1.2,
    fadeSpeed: 0.0002,
  },
};

/**
 * Particle Effects Component
 * 
 * @param {object} props
 * @param {string} props.type - 'atmosphere', 'wind', 'dust', 'nebula'
 * @param {number} props.count - Override particle count
 * @param {number} props.opacity - Overall opacity
 * @param {THREE.Color} props.colorOverride - Force specific color
 */
export function ParticleEffects({
  type = 'atmosphere',
  count = 3000,
  opacity = 0.8,
  colorOverride = null,
}) {
  const meshRef = useRef(null);
  const positionsRef = useRef(null);
  const velocitiesRef = useRef([]);
  const sizesRef = useRef([]);
  const colorsRef = useRef([]);

  const config = PARTICLE_CONFIG[type];
  const baseColor = colorOverride || new THREE.Color(...config.color);

  // Initialize particle data
  useEffect(() => {
    positionsRef.current = new Float32Array(count * 3);
    velocitiesRef.current = [];
    sizesRef.current = [];
    colorsRef.current = [];

    const random = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = random(2, 5);

      positionsRef.current[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positionsRef.current[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positionsRef.current[i * 3 + 2] = radius * Math.cos(phi);

      // Random velocity
      velocitiesRef.current.push({
        x: random(-config.speed, config.speed),
        y: random(-config.speed, config.speed),
        z: random(-config.speed, config.speed),
      });

      // Random size variation
      sizesRef.current.push(random(0.5, 1.5) * config.size);

      // Slight color variation
      colorsRef.current.push(
        baseColor.clone().offsetHSL(0, 0, random(-0.1, 0.1))
      );
    }
  }, [count, type]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !positionsRef.current) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Apply velocity
      positionsRef.current[i3] += velocitiesRef.current[i].x;
      positionsRef.current[i3 + 1] += velocitiesRef.current[i].y;
      positionsRef.current[i3 + 2] += velocitiesRef.current[i].z;

      // Apply turbulence (sinusoidal movement)
      positionsRef.current[i3] +=
        Math.sin(time * 0.5 + i) * config.turbulence * 0.001;
      positionsRef.current[i3 + 1] +=
        Math.cos(time * 0.3 + i) * config.turbulence * 0.001;
      positionsRef.current[i3 + 2] +=
        Math.sin(time * 0.7 + i) * config.turbulence * 0.001;

      // Wrap around bounds
      const bound = 6;
      if (positionsRef.current[i3] > bound) positionsRef.current[i3] = -bound;
      if (positionsRef.current[i3] < -bound) positionsRef.current[i3] = bound;
      if (positionsRef.current[i3 + 1] > bound) positionsRef.current[i3 + 1] = -bound;
      if (positionsRef.current[i3 + 1] < -bound) positionsRef.current[i3 + 1] = bound;
      if (positionsRef.current[i3 + 2] > bound) positionsRef.current[i3 + 2] = -bound;
      if (positionsRef.current[i3 + 2] < -bound) positionsRef.current[i3 + 2] = bound;
    }

    meshRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionsRef.current, 3)
    );
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: config.size,
      color: baseColor,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, [config.size, baseColor, opacity]);

  return (
    <points ref={meshRef} material={material} count={count}>
      <bufferGeometry />
    </points>
  );
}

/**
 * Atmosphere Transition Effects
 * 
 * Creates a smooth transition layer between scenes
 * with color grading and light diffusion
 */
export function AtmosphereTransition({
  opacity = 1,
  color = '#ff8c42',
  speed = 0.001,
}) {
  const planeRef = useRef(null);

  useFrame(({ clock }) => {
    if (planeRef.current) {
      const time = clock.getElapsedTime();
      planeRef.current.material.opacity =
        THREE.MathUtils.lerp(planeRef.current.material.opacity, opacity, speed);
      planeRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

  return (
    <mesh ref={planeRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[10, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default ParticleEffects;
