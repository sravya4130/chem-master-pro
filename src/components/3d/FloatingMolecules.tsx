import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface MoleculeProps {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}

const Molecule = ({ position, color, size, speed }: MoleculeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
};

const AtomicOrbit = ({ radius, color, speed }: { radius: number; color: string; speed: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <Sphere args={[0.08, 16, 16]} position={[radius, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
};

const CentralAtom = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[0.4, 32, 32]}>
        <MeshDistortMaterial
          color="#14b8a6"
          attach="material"
          distort={0.2}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#14b8a6"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <AtomicOrbit radius={0.8} color="#60a5fa" speed={0.5} />
      <group rotation={[Math.PI / 3, 0, 0]}>
        <AtomicOrbit radius={1.1} color="#f472b6" speed={-0.3} />
      </group>
      <group rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <AtomicOrbit radius={1.4} color="#a78bfa" speed={0.4} />
      </group>
    </group>
  );
};

const ParticleField = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ] as [number, number, number],
        size: Math.random() * 0.05 + 0.02,
        color: ['#14b8a6', '#60a5fa', '#f472b6', '#a78bfa'][Math.floor(Math.random() * 4)]
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={1}>
          <Sphere args={[particle.size, 8, 8]} position={particle.position}>
            <meshStandardMaterial 
              color={particle.color} 
              emissive={particle.color} 
              emissiveIntensity={0.5}
              transparent 
              opacity={0.6} 
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

const Scene = () => {
  const molecules = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], color: '#14b8a6', size: 0.3, speed: 1.2 },
    { position: [3.5, -1.5, -3] as [number, number, number], color: '#60a5fa', size: 0.25, speed: 0.8 },
    { position: [-2.5, -2, -1] as [number, number, number], color: '#f472b6', size: 0.2, speed: 1.5 },
    { position: [2, 2.5, -2] as [number, number, number], color: '#a78bfa', size: 0.35, speed: 1 },
    { position: [-4, 0, -4] as [number, number, number], color: '#fbbf24', size: 0.22, speed: 1.3 },
    { position: [4, 1, -3] as [number, number, number], color: '#34d399', size: 0.28, speed: 0.9 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#14b8a6" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#f472b6" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <CentralAtom />
      
      {molecules.map((mol, i) => (
        <Molecule key={i} {...mol} />
      ))}
      
      <ParticleField />
    </>
  );
};

export const FloatingMolecules = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
