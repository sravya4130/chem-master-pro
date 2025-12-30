import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarMeshProps {
  color: string;
  isSelected: boolean;
  isSpeaking: boolean;
}

const AvatarMesh = ({ color, isSelected, isSpeaking }: AvatarMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Subtle rotation when selected
      if (isSelected) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
    
    // Speaking animation for mouth
    if (mouthRef.current && isSpeaking) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.3;
      mouthRef.current.scale.y = scale;
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isSelected ? 0.15 : 0.1}
          speed={2}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>

      {/* Left Eye */}
      <Sphere args={[0.15, 16, 16]} position={[-0.3, 0.2, 0.85]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[-0.3, 0.2, 0.95]}>
        <meshStandardMaterial color="#1a1a2e" />
      </Sphere>

      {/* Right Eye */}
      <Sphere args={[0.15, 16, 16]} position={[0.3, 0.2, 0.85]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.3, 0.2, 0.95]}>
        <meshStandardMaterial color="#1a1a2e" />
      </Sphere>

      {/* Mouth */}
      <Sphere ref={mouthRef} args={[0.12, 16, 16]} position={[0, -0.25, 0.9]} scale={[1.5, isSpeaking ? 1.2 : 0.6, 1]}>
        <meshStandardMaterial color={isSpeaking ? "#ff6b6b" : "#ff8585"} />
      </Sphere>

      {/* Cheeks (blush) */}
      <Sphere args={[0.12, 16, 16]} position={[-0.55, -0.05, 0.7]}>
        <meshStandardMaterial color="#ffb8b8" transparent opacity={0.6} />
      </Sphere>
      <Sphere args={[0.12, 16, 16]} position={[0.55, -0.05, 0.7]}>
        <meshStandardMaterial color="#ffb8b8" transparent opacity={0.6} />
      </Sphere>
    </group>
  );
};

interface TutorAvatar3DProps {
  color: string;
  isSelected: boolean;
  isSpeaking?: boolean;
}

export const TutorAvatar3D = ({ color, isSelected, isSpeaking = false }: TutorAvatar3DProps) => {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          <pointLight position={[-2, -2, 2]} intensity={0.4} color="#ffd700" />
          <AvatarMesh color={color} isSelected={isSelected} isSpeaking={isSpeaking} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
