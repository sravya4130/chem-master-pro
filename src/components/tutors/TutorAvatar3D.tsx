import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, RoundedBox } from '@react-three/drei';
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
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftBrowRef = useRef<THREE.Mesh>(null);
  const rightBrowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Subtle rotation when selected or speaking
      if (isSelected || isSpeaking) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      }
    }
    
    // Eye blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 4) > 0.95;
      const scaleY = blink ? 0.1 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, scaleY, 0.3);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, scaleY, 0.3);
    }

    // Eyebrow animation when speaking
    if (leftBrowRef.current && rightBrowRef.current && isSpeaking) {
      const browOffset = Math.sin(state.clock.elapsedTime * 8) * 0.03;
      leftBrowRef.current.position.y = 0.45 + browOffset;
      rightBrowRef.current.position.y = 0.45 + browOffset;
    }
    
    // Speaking animation for mouth
    if (mouthRef.current) {
      if (isSpeaking) {
        const mouthOpen = Math.abs(Math.sin(state.clock.elapsedTime * 15)) * 0.5 + 0.3;
        mouthRef.current.scale.y = mouthOpen;
        mouthRef.current.scale.x = 1.5 - mouthOpen * 0.3;
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 0.4, 0.1);
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1.2, 0.1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={isSelected ? 0.3 : 0.1} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Head */}
        <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={isSelected ? 0.12 : 0.08}
            speed={2}
            roughness={0.3}
            metalness={0.2}
          />
        </Sphere>

        {/* Hair/Top decoration - small spheres */}
        <group position={[0, 0.85, 0]}>
          {[...Array(5)].map((_, i) => (
            <Sphere 
              key={i} 
              args={[0.12, 16, 16]} 
              position={[
                Math.sin(i * Math.PI * 0.4) * 0.3,
                Math.cos(i * Math.PI * 0.2) * 0.1,
                Math.cos(i * Math.PI * 0.4) * 0.2
              ]}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.4}
                metalness={0.3}
              />
            </Sphere>
          ))}
        </group>

        {/* Left Eye White */}
        <Sphere args={[0.18, 32, 32]} position={[-0.32, 0.18, 0.82]}>
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </Sphere>
        {/* Left Pupil */}
        <Sphere ref={leftEyeRef} args={[0.1, 32, 32]} position={[-0.32, 0.18, 0.95]}>
          <meshStandardMaterial color="#1a1a2e" roughness={0.2} />
        </Sphere>
        {/* Left Eye Highlight */}
        <Sphere args={[0.03, 16, 16]} position={[-0.28, 0.22, 1.0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>

        {/* Right Eye White */}
        <Sphere args={[0.18, 32, 32]} position={[0.32, 0.18, 0.82]}>
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </Sphere>
        {/* Right Pupil */}
        <Sphere ref={rightEyeRef} args={[0.1, 32, 32]} position={[0.32, 0.18, 0.95]}>
          <meshStandardMaterial color="#1a1a2e" roughness={0.2} />
        </Sphere>
        {/* Right Eye Highlight */}
        <Sphere args={[0.03, 16, 16]} position={[0.36, 0.22, 1.0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>

        {/* Eyebrows */}
        <RoundedBox 
          ref={leftBrowRef}
          args={[0.2, 0.04, 0.05]} 
          radius={0.02}
          position={[-0.32, 0.45, 0.88]}
          rotation={[0, 0, 0.2]}
        >
          <meshStandardMaterial color="#2d2d2d" />
        </RoundedBox>
        <RoundedBox 
          ref={rightBrowRef}
          args={[0.2, 0.04, 0.05]} 
          radius={0.02}
          position={[0.32, 0.45, 0.88]}
          rotation={[0, 0, -0.2]}
        >
          <meshStandardMaterial color="#2d2d2d" />
        </RoundedBox>

        {/* Mouth */}
        <Sphere 
          ref={mouthRef} 
          args={[0.12, 32, 32]} 
          position={[0, -0.28, 0.88]} 
          scale={[1.2, 0.4, 0.8]}
        >
          <meshStandardMaterial 
            color={isSpeaking ? "#ff5555" : "#ff7777"} 
            roughness={0.3}
          />
        </Sphere>

        {/* Teeth (visible when speaking) */}
        {isSpeaking && (
          <RoundedBox 
            args={[0.15, 0.04, 0.02]} 
            radius={0.01}
            position={[0, -0.22, 0.92]}
          >
            <meshStandardMaterial color="#ffffff" />
          </RoundedBox>
        )}

        {/* Cheeks (blush) */}
        <Sphere args={[0.14, 32, 32]} position={[-0.58, -0.08, 0.65]}>
          <meshStandardMaterial color="#ffb8b8" transparent opacity={0.5} roughness={0.5} />
        </Sphere>
        <Sphere args={[0.14, 32, 32]} position={[0.58, -0.08, 0.65]}>
          <meshStandardMaterial color="#ffb8b8" transparent opacity={0.5} roughness={0.5} />
        </Sphere>

        {/* Ears */}
        <Sphere args={[0.15, 16, 16]} position={[-0.95, 0.1, 0]}>
          <meshStandardMaterial color={color} roughness={0.4} />
        </Sphere>
        <Sphere args={[0.15, 16, 16]} position={[0.95, 0.1, 0]}>
          <meshStandardMaterial color={color} roughness={0.4} />
        </Sphere>

        {/* Glow effect when selected */}
        {isSelected && (
          <Sphere args={[1.15, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={0.15} 
              emissive={color}
              emissiveIntensity={0.3}
            />
          </Sphere>
        )}
      </group>
    </Float>
  );
};

interface TutorAvatar3DProps {
  color: string;
  isSelected: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TutorAvatar3D = ({ color, isSelected, isSpeaking = false, size = 'md' }: TutorAvatar3DProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 3]} intensity={1} />
          <pointLight position={[-2, -2, 2]} intensity={0.5} color="#ffd700" />
          <pointLight position={[2, 2, -2]} intensity={0.3} color="#ff69b4" />
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
