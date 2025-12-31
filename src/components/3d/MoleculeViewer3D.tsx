import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

interface AtomData {
  element: string;
  position: [number, number, number];
  color: string;
  size: number;
}

interface BondData {
  from: number;
  to: number;
  type: 'single' | 'double' | 'triple';
}

interface MoleculeData {
  atoms: AtomData[];
  bonds: BondData[];
  name: string;
}

// Atom colors and sizes
const ATOM_CONFIG: Record<string, { color: string; size: number }> = {
  C: { color: '#333333', size: 0.4 },
  H: { color: '#ffffff', size: 0.25 },
  O: { color: '#ef4444', size: 0.38 },
  N: { color: '#3b82f6', size: 0.36 },
  S: { color: '#eab308', size: 0.45 },
  Cl: { color: '#22c55e', size: 0.42 },
};

// Parse structure string to molecule data
export const parseMolecule = (structure: string): MoleculeData => {
  // Simplified parser for common structures
  const molecules: Record<string, MoleculeData> = {
    'CH₃-CH₂-CH₂-CH₃': {
      name: 'Butane',
      atoms: [
        { element: 'C', position: [-1.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [-0.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [0.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [1.5, 0, 0], color: '#333333', size: 0.4 },
        // Hydrogens on C1
        { element: 'H', position: [-1.5, 0.7, 0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [-1.5, 0.7, -0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [-2.2, -0.3, 0], color: '#ffffff', size: 0.25 },
        // Hydrogens on C2
        { element: 'H', position: [-0.5, 0.7, 0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [-0.5, -0.7, 0.5], color: '#ffffff', size: 0.25 },
        // Hydrogens on C3
        { element: 'H', position: [0.5, 0.7, -0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [0.5, -0.7, -0.5], color: '#ffffff', size: 0.25 },
        // Hydrogens on C4
        { element: 'H', position: [1.5, 0.7, 0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [1.5, 0.7, -0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [2.2, -0.3, 0], color: '#ffffff', size: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 1, to: 2, type: 'single' },
        { from: 2, to: 3, type: 'single' },
      ],
    },
    'CH₂=CH-CH₂-CH₃': {
      name: 'But-1-ene',
      atoms: [
        { element: 'C', position: [-1.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [-0.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [0.5, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [1.5, 0, 0], color: '#333333', size: 0.4 },
        // Hydrogens
        { element: 'H', position: [-2.2, 0.5, 0], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [-2.2, -0.5, 0], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [-0.5, 0.8, 0], color: '#ffffff', size: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, type: 'double' },
        { from: 1, to: 2, type: 'single' },
        { from: 2, to: 3, type: 'single' },
      ],
    },
    'CH≡C-CH₃': {
      name: 'Propyne',
      atoms: [
        { element: 'C', position: [-1, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [0, 0, 0], color: '#333333', size: 0.4 },
        { element: 'C', position: [1, 0, 0], color: '#333333', size: 0.4 },
        { element: 'H', position: [-1.8, 0, 0], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [1.5, 0.5, 0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [1.5, 0.5, -0.5], color: '#ffffff', size: 0.25 },
        { element: 'H', position: [1.5, -0.7, 0], color: '#ffffff', size: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, type: 'triple' },
        { from: 1, to: 2, type: 'single' },
      ],
    },
  };

  // Return default if structure not found
  return molecules[structure] || {
    name: 'Unknown',
    atoms: [
      { element: 'C', position: [0, 0, 0], color: '#333333', size: 0.4 },
    ],
    bonds: [],
  };
};

// Atom component
const Atom = ({ element, position, color, size }: AtomData) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {element}
      </Text>
    </group>
  );
};

// Bond component
const Bond = ({ from, to, type, atoms }: { from: number; to: number; type: 'single' | 'double' | 'triple'; atoms: AtomData[] }) => {
  const startPos = new THREE.Vector3(...atoms[from].position);
  const endPos = new THREE.Vector3(...atoms[to].position);
  
  const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(endPos, startPos);
  const length = direction.length() - atoms[from].size - atoms[to].size;
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  const getBondColor = () => {
    switch (type) {
      case 'single': return '#888888';
      case 'double': return '#60a5fa';
      case 'triple': return '#f472b6';
      default: return '#888888';
    }
  };

  const bondRadius = type === 'single' ? 0.06 : 0.04;
  const offsets = type === 'single' ? [0] : type === 'double' ? [-0.08, 0.08] : [-0.1, 0, 0.1];

  return (
    <group position={midPoint} quaternion={quaternion}>
      {offsets.map((offset, i) => (
        <mesh key={i} position={[offset, 0, 0]}>
          <cylinderGeometry args={[bondRadius, bondRadius, length * 0.8, 16]} />
          <meshStandardMaterial 
            color={getBondColor()} 
            emissive={getBondColor()} 
            emissiveIntensity={type !== 'single' ? 0.3 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Orbital visualization
const OrbitalLobe = ({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Pi bond orbital visualization
const PiBondOrbital = ({ from, to, atoms }: { from: number; to: number; atoms: AtomData[] }) => {
  const startPos = new THREE.Vector3(...atoms[from].position);
  const endPos = new THREE.Vector3(...atoms[to].position);
  const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group position={midPoint}>
        {/* Top lobe */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
        </mesh>
        {/* Bottom lobe */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

// Molecule component
const Molecule = ({ data, showOrbitals = false }: { data: MoleculeData; showOrbitals?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Render atoms */}
      {data.atoms.map((atom, i) => (
        <Atom key={i} {...atom} />
      ))}
      
      {/* Render bonds */}
      {data.bonds.map((bond, i) => (
        <Bond key={i} {...bond} atoms={data.atoms} />
      ))}
      
      {/* Show pi bond orbitals for double/triple bonds */}
      {showOrbitals && data.bonds
        .filter(b => b.type === 'double' || b.type === 'triple')
        .map((bond, i) => (
          <PiBondOrbital key={i} from={bond.from} to={bond.to} atoms={data.atoms} />
        ))
      }
    </group>
  );
};

// Scene
const Scene = ({ structure, showOrbitals }: { structure: string; showOrbitals: boolean }) => {
  const moleculeData = useMemo(() => parseMolecule(structure), [structure]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#14b8a6" />
      
      <Molecule data={moleculeData} showOrbitals={showOrbitals} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
interface MoleculeViewer3DProps {
  structure: string;
  showOrbitals?: boolean;
  className?: string;
}

export const MoleculeViewer3D = ({ structure, showOrbitals = false, className = '' }: MoleculeViewer3DProps) => {
  return (
    <div className={`relative w-full h-64 rounded-xl overflow-hidden bg-secondary/50 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene structure={structure} showOrbitals={showOrbitals} />
        </Suspense>
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-2 text-xs">
        <div className="flex items-center gap-1 bg-background/80 rounded px-2 py-1">
          <div className="w-3 h-3 rounded-full bg-[#333333]" />
          <span>C</span>
        </div>
        <div className="flex items-center gap-1 bg-background/80 rounded px-2 py-1">
          <div className="w-3 h-3 rounded-full bg-white border" />
          <span>H</span>
        </div>
        {showOrbitals && (
          <div className="flex items-center gap-1 bg-background/80 rounded px-2 py-1">
            <div className="w-3 h-3 rounded-full bg-[#a78bfa] opacity-50" />
            <span>π orbital</span>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 rounded px-2 py-1">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};
