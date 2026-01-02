import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Trail, Text3D, Center } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

// Water Molecule (H2O)
const WaterMolecule = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Oxygen - Red */}
        <Sphere args={[0.25, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
        </Sphere>
        {/* Hydrogen 1 - White */}
        <Sphere args={[0.15, 32, 32]} position={[-0.35, 0.2, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </Sphere>
        {/* Hydrogen 2 - White */}
        <Sphere args={[0.15, 32, 32]} position={[0.35, 0.2, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </Sphere>
        {/* Bonds */}
        <mesh position={[-0.17, 0.1, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        <mesh position={[0.17, 0.1, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      </group>
    </Float>
  );
};

// Benzene Ring
const BenzeneRing = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  const carbonPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      positions.push([Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0]);
    }
    return positions;
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Carbons */}
        {carbonPositions.map((pos, i) => (
          <Sphere key={i} args={[0.1, 16, 16]} position={pos}>
            <meshStandardMaterial color="#333333" emissive="#14b8a6" emissiveIntensity={0.3} />
          </Sphere>
        ))}
        {/* Bonds */}
        {carbonPositions.map((pos, i) => {
          const nextPos = carbonPositions[(i + 1) % 6];
          const midX = (pos[0] + nextPos[0]) / 2;
          const midY = (pos[1] + nextPos[1]) / 2;
          const angle = Math.atan2(nextPos[1] - pos[1], nextPos[0] - pos[0]);
          return (
            <mesh key={`bond-${i}`} position={[midX, midY, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} />
            </mesh>
          );
        })}
        {/* Inner ring glow */}
        <mesh>
          <torusGeometry args={[0.35, 0.02, 16, 32]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

// DNA Helix
const DNAHelix = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const helixPoints = useMemo(() => {
    const points: { pos1: [number, number, number]; pos2: [number, number, number] }[] = [];
    for (let i = 0; i < 20; i++) {
      const t = i * 0.3;
      points.push({
        pos1: [Math.cos(t) * 0.3, t * 0.15 - 1.5, Math.sin(t) * 0.3],
        pos2: [Math.cos(t + Math.PI) * 0.3, t * 0.15 - 1.5, Math.sin(t + Math.PI) * 0.3],
      });
    }
    return points;
  }, []);

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {helixPoints.map((point, i) => (
          <group key={i}>
            <Sphere args={[0.05, 8, 8]} position={point.pos1}>
              <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
            </Sphere>
            <Sphere args={[0.05, 8, 8]} position={point.pos2}>
              <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
            </Sphere>
            {i % 3 === 0 && (
              <mesh position={[(point.pos1[0] + point.pos2[0]) / 2, point.pos1[1], (point.pos1[2] + point.pos2[2]) / 2]}>
                <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
                <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </Float>
  );
};

// Periodic Element Cube
const ElementCube = ({ position, symbol, color }: { position: [number, number, number]; symbol: string; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

// Orbiting Electron
const OrbitingElectron = ({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const electronRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        {/* Orbit path */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshStandardMaterial color={color} transparent opacity={0.3} />
        </mesh>
        {/* Electron */}
        <Trail
          width={0.5}
          length={6}
          color={color}
          attenuation={(t) => t * t}
        >
          <Sphere ref={electronRef} args={[0.06, 16, 16]} position={[radius, 0, 0]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </Sphere>
        </Trail>
      </group>
    </group>
  );
};

// Central Nucleus with Electrons
const AtomModel = ({ position }: { position: [number, number, number] }) => {
  const nucleusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (nucleusRef.current) {
      nucleusRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Nucleus */}
      <Sphere ref={nucleusRef} args={[0.3, 32, 32]}>
        <MeshDistortMaterial
          color="#14b8a6"
          attach="material"
          distort={0.3}
          speed={4}
          roughness={0.1}
          metalness={0.9}
          emissive="#14b8a6"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Electron orbits */}
      <OrbitingElectron radius={0.7} speed={1.5} color="#60a5fa" tilt={0} />
      <OrbitingElectron radius={0.9} speed={-1.2} color="#f472b6" tilt={Math.PI / 3} />
      <OrbitingElectron radius={1.1} speed={0.8} color="#a78bfa" tilt={-Math.PI / 4} />
      <OrbitingElectron radius={1.3} speed={-0.6} color="#fbbf24" tilt={Math.PI / 2} />
    </group>
  );
};

// Floating Formula Particle
const FormulaParticle = ({ position, formula, color }: { position: [number, number, number]; formula: string; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        <Sphere args={[0.15, 16, 16]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.8} />
        </Sphere>
      </group>
    </Float>
  );
};

// Glowing Particle Field
const GlowingParticles = ({ count = 100 }: { count?: number }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5
        ] as [number, number, number],
        size: Math.random() * 0.04 + 0.01,
        color: ['#14b8a6', '#60a5fa', '#f472b6', '#a78bfa', '#fbbf24', '#34d399'][Math.floor(Math.random() * 6)],
        speed: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, [count]);

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={particle.speed} floatIntensity={1.5}>
          <Sphere args={[particle.size, 8, 8]} position={particle.position}>
            <meshStandardMaterial 
              color={particle.color} 
              emissive={particle.color} 
              emissiveIntensity={0.8}
              transparent 
              opacity={0.7} 
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

// Mouse-following light
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (mouse.x * viewport.width) / 2;
      lightRef.current.position.y = (mouse.y * viewport.height) / 2;
    }
  });

  return (
    <pointLight ref={lightRef} intensity={2} color="#14b8a6" distance={10} />
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#14b8a6" />
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#f472b6" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#a78bfa" />
      
      <MouseLight />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Central Atom */}
      <AtomModel position={[0, 0, 0]} />
      
      {/* Water Molecules */}
      <WaterMolecule position={[-4, 2, -3]} scale={1.2} />
      <WaterMolecule position={[4.5, -1.5, -4]} scale={0.8} />
      <WaterMolecule position={[-3, -3, -2]} scale={1} />
      
      {/* Benzene Rings */}
      <BenzeneRing position={[3.5, 2.5, -3]} scale={1.5} />
      <BenzeneRing position={[-4.5, -1, -5]} scale={1.2} />
      
      {/* DNA Helix */}
      <DNAHelix position={[5, 0, -6]} />
      
      {/* Element Cubes */}
      <ElementCube position={[-2, 3, -2]} symbol="C" color="#333333" />
      <ElementCube position={[2, -3, -3]} symbol="O" color="#ef4444" />
      <ElementCube position={[-5, 1, -4]} symbol="N" color="#3b82f6" />
      <ElementCube position={[4, 3, -5]} symbol="H" color="#ffffff" />
      
      {/* Formula Particles */}
      <FormulaParticle position={[-3, 0, -2]} formula="H₂O" color="#60a5fa" />
      <FormulaParticle position={[3, 1, -2]} formula="CO₂" color="#f472b6" />
      <FormulaParticle position={[0, 3, -3]} formula="NaCl" color="#a78bfa" />
      
      {/* Glowing Particles */}
      <GlowingParticles count={150} />
    </>
  );
};

export const ChemistryScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
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
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
