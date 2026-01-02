import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Floating particles for all pages
const FloatingParticle = ({ position, size, color, speed }: { 
  position: [number, number, number]; 
  size: number; 
  color: string;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={speed} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 16, 16]} position={position}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.6}
          transparent 
          opacity={0.7} 
        />
      </Sphere>
    </Float>
  );
};

// Small orbiting molecule
const MiniMolecule = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={0.6}>
        <Sphere args={[0.15, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[-0.25, 0.15, 0]}>
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[0.25, 0.15, 0]}>
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.4} />
        </Sphere>
      </group>
    </Float>
  );
};

// Glowing orb with distortion
const GlowingOrb = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.4, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Scene for subtle background
const SubtleScene = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10 - 5
        ] as [number, number, number],
        size: Math.random() * 0.03 + 0.01,
        color: ['#14b8a6', '#60a5fa', '#f472b6', '#a78bfa'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#14b8a6" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#f472b6" />
      
      <Stars radius={80} depth={50} count={1500} factor={3} saturation={0} fade speed={0.3} />
      
      {/* Glowing orbs */}
      <GlowingOrb position={[-5, 3, -6]} color="#14b8a6" />
      <GlowingOrb position={[5, -2, -7]} color="#f472b6" />
      <GlowingOrb position={[0, 4, -8]} color="#a78bfa" />
      
      {/* Mini molecules */}
      <MiniMolecule position={[-3, 2, -3]} />
      <MiniMolecule position={[4, -1, -4]} />
      <MiniMolecule position={[-4, -3, -5]} />
      <MiniMolecule position={[3, 3, -4]} />
      
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <FloatingParticle
          key={i}
          position={particle.position}
          size={particle.size}
          color={particle.color}
          speed={particle.speed}
        />
      ))}
    </>
  );
};

export const SceneBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x0d1117, 1);
        }}
      >
        <Suspense fallback={null}>
          <SubtleScene />
        </Suspense>
      </Canvas>
    </div>
  );
};
