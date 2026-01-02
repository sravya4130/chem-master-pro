import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Trail, Sparkles, Cloud, PointMaterial, Points } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState, useCallback } from 'react';
import * as THREE from 'three';

// Mouse-reactive particle system with physics
const MouseReactiveParticles = ({ count = 500 }: { count?: number }) => {
  const mesh = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const mousePos = useRef(new THREE.Vector3());
  
  const [positions, velocities, originalPositions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color('#14b8a6'), // Teal
      new THREE.Color('#60a5fa'), // Blue
      new THREE.Color('#f472b6'), // Pink
      new THREE.Color('#a78bfa'), // Purple
      new THREE.Color('#34d399'), // Green
      new THREE.Color('#fbbf24'), // Yellow
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 25;
      pos[i3 + 1] = (Math.random() - 0.5) * 25;
      pos[i3 + 2] = (Math.random() - 0.5) * 15 - 5;
      
      origPos[i3] = pos[i3];
      origPos[i3 + 1] = pos[i3 + 1];
      origPos[i3 + 2] = pos[i3 + 2];
      
      vel[i3] = 0;
      vel[i3 + 1] = 0;
      vel[i3 + 2] = 0;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
      
      siz[i] = Math.random() * 0.08 + 0.02;
    }
    
    return [pos, vel, origPos, col, siz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    mousePos.current.set(mouseX, mouseY, 0);
    
    const posAttr = mesh.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Repel particles from mouse
      if (dist < 3) {
        const force = (3 - dist) / 3 * 0.15;
        velocities[i3] += (dx / dist) * force;
        velocities[i3 + 1] += (dy / dist) * force;
      }
      
      // Spring back to original position
      velocities[i3] += (originalPositions[i3] - posArray[i3]) * 0.01;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.01;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.01;
      
      // Apply damping
      velocities[i3] *= 0.92;
      velocities[i3 + 1] *= 0.92;
      velocities[i3 + 2] *= 0.92;
      
      // Update position
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
      
      // Add organic floating motion
      posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={mesh} positions={positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

// Enhanced Water Molecule with glow
const WaterMolecule = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group 
        ref={groupRef} 
        position={position} 
        scale={hovered ? scale * 1.3 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Glow sphere */}
        <Sphere args={[0.6, 16, 16]}>
          <meshBasicMaterial color="#ef4444" transparent opacity={hovered ? 0.2 : 0.05} />
        </Sphere>
        {/* Oxygen */}
        <Sphere args={[0.25, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={hovered ? 0.8 : 0.3} />
        </Sphere>
        {/* Hydrogen 1 */}
        <Sphere args={[0.15, 32, 32]} position={[-0.35, 0.2, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={hovered ? 0.6 : 0.2} />
        </Sphere>
        {/* Hydrogen 2 */}
        <Sphere args={[0.15, 32, 32]} position={[0.35, 0.2, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={hovered ? 0.6 : 0.2} />
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

// Enhanced Benzene Ring with animated pi electrons
const BenzeneRing = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const piElectronsRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
    if (piElectronsRef.current) {
      piElectronsRef.current.rotation.z = state.clock.elapsedTime * 2;
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
      <group 
        ref={groupRef} 
        position={position} 
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Glow */}
        <Sphere args={[0.9, 16, 16]}>
          <meshBasicMaterial color="#14b8a6" transparent opacity={hovered ? 0.15 : 0.05} />
        </Sphere>
        {/* Carbons */}
        {carbonPositions.map((pos, i) => (
          <Sphere key={i} args={[0.1, 16, 16]} position={pos}>
            <meshStandardMaterial color="#333333" emissive="#14b8a6" emissiveIntensity={hovered ? 0.6 : 0.3} />
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
        {/* Animated pi electron cloud */}
        <mesh ref={piElectronsRef}>
          <torusGeometry args={[0.35, 0.04, 16, 32]} />
          <meshStandardMaterial 
            color="#f472b6" 
            emissive="#f472b6" 
            emissiveIntensity={hovered ? 1.2 : 0.8} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
        <mesh ref={piElectronsRef} position={[0, 0, 0.08]}>
          <torusGeometry args={[0.35, 0.02, 16, 32]} />
          <meshStandardMaterial 
            color="#a78bfa" 
            emissive="#a78bfa" 
            emissiveIntensity={0.6} 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      </group>
    </Float>
  );
};

// DNA Helix with trailing effect
const DNAHelix = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const helixPoints = useMemo(() => {
    const points: { pos1: [number, number, number]; pos2: [number, number, number] }[] = [];
    for (let i = 0; i < 25; i++) {
      const t = i * 0.25;
      points.push({
        pos1: [Math.cos(t) * 0.3, t * 0.12 - 1.5, Math.sin(t) * 0.3],
        pos2: [Math.cos(t + Math.PI) * 0.3, t * 0.12 - 1.5, Math.sin(t + Math.PI) * 0.3],
      });
    }
    return points;
  }, []);

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {helixPoints.map((point, i) => (
          <group key={i}>
            <Trail
              width={0.3}
              length={3}
              color="#14b8a6"
              attenuation={(t) => t * t}
            >
              <Sphere args={[0.05, 8, 8]} position={point.pos1}>
                <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.6} />
              </Sphere>
            </Trail>
            <Trail
              width={0.3}
              length={3}
              color="#f472b6"
              attenuation={(t) => t * t}
            >
              <Sphere args={[0.05, 8, 8]} position={point.pos2}>
                <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.6} />
              </Sphere>
            </Trail>
            {i % 2 === 0 && (
              <mesh position={[(point.pos1[0] + point.pos2[0]) / 2, point.pos1[1], (point.pos1[2] + point.pos2[2]) / 2]}>
                <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
                <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.4} transparent opacity={0.7} />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </Float>
  );
};

// Interactive Element Cube
const ElementCube = ({ position, symbol, color }: { position: [number, number, number]; symbol: string; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      if (hovered) {
        meshRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 5) * 0.1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <group>
        {/* Glow */}
        {hovered && (
          <Sphere args={[0.6, 16, 16]} position={position}>
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </Sphere>
        )}
        <mesh 
          ref={meshRef} 
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.3 : 1}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 1 : 0.4}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Enhanced Orbiting Electron with trail
const OrbitingElectron = ({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshStandardMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <Trail
          width={0.6}
          length={8}
          color={color}
          attenuation={(t) => t * t}
        >
          <Sphere args={[0.07, 16, 16]} position={[radius, 0, 0]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
          </Sphere>
        </Trail>
      </group>
    </group>
  );
};

// Central Nucleus with pulsing effect
const AtomModel = ({ position }: { position: [number, number, number] }) => {
  const nucleusRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (nucleusRef.current) {
      nucleusRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.1} />
      </Sphere>
      
      {/* Nucleus */}
      <Sphere ref={nucleusRef} args={[0.35, 32, 32]}>
        <MeshDistortMaterial
          color="#14b8a6"
          attach="material"
          distort={0.4}
          speed={5}
          roughness={0.1}
          metalness={0.9}
          emissive="#14b8a6"
          emissiveIntensity={0.7}
        />
      </Sphere>
      
      {/* Sparkles around nucleus */}
      <Sparkles count={50} scale={2} size={2} speed={0.4} color="#14b8a6" />
      
      {/* Electron orbits */}
      <OrbitingElectron radius={0.8} speed={1.8} color="#60a5fa" tilt={0} />
      <OrbitingElectron radius={1.0} speed={-1.4} color="#f472b6" tilt={Math.PI / 3} />
      <OrbitingElectron radius={1.2} speed={1.0} color="#a78bfa" tilt={-Math.PI / 4} />
      <OrbitingElectron radius={1.5} speed={-0.7} color="#fbbf24" tilt={Math.PI / 2} />
    </group>
  );
};

// Mouse-following light with smooth interpolation
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const targetPos = useRef(new THREE.Vector3());
  const { mouse, viewport } = useThree();
  
  useFrame(() => {
    if (lightRef.current) {
      targetPos.current.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        3
      );
      lightRef.current.position.lerp(targetPos.current, 0.1);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={3} color="#14b8a6" distance={15} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#a78bfa" distance={10} />
    </>
  );
};

// Wave shader plane for organic background
const WaveBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color1: { value: new THREE.Color('#0d1117') },
    color2: { value: new THREE.Color('#14b8a6') },
    color3: { value: new THREE.Color('#1e293b') },
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 0, -15]} rotation={[0, 0, 0]}>
      <planeGeometry args={[60, 40, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.3 + time * 0.5) * sin(pos.y * 0.3 + time * 0.3) * 2.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixValue = (vElevation + 2.0) / 4.0;
            vec3 color = mix(color1, color3, vUv.y);
            color = mix(color, color2, mixValue * 0.3);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#14b8a6" />
      <pointLight position={[5, -5, -5]} intensity={0.6} color="#f472b6" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#a78bfa" />
      
      <MouseLight />
      <WaveBackground />
      
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0.5} fade speed={0.8} />
      
      {/* Mouse-reactive particles */}
      <MouseReactiveParticles count={400} />
      
      {/* Central Atom */}
      <AtomModel position={[0, 0, 0]} />
      
      {/* Water Molecules */}
      <WaterMolecule position={[-4, 2, -2]} scale={1.2} />
      <WaterMolecule position={[4.5, -1.5, -3]} scale={0.9} />
      <WaterMolecule position={[-3, -3, -1]} scale={1} />
      
      {/* Benzene Rings */}
      <BenzeneRing position={[3.5, 2.5, -2]} scale={1.5} />
      <BenzeneRing position={[-4.5, -1, -4]} scale={1.2} />
      
      {/* DNA Helix */}
      <DNAHelix position={[5.5, 0, -4]} />
      
      {/* Element Cubes */}
      <ElementCube position={[-2, 3, -1]} symbol="C" color="#333333" />
      <ElementCube position={[2, -3, -2]} symbol="O" color="#ef4444" />
      <ElementCube position={[-5, 1, -3]} symbol="N" color="#3b82f6" />
      <ElementCube position={[4, 3, -3]} symbol="H" color="#ffffff" />
      <ElementCube position={[0, -4, -2]} symbol="S" color="#fbbf24" />
      <ElementCube position={[-3, 4, -2]} symbol="P" color="#f97316" />
      
      {/* Additional sparkles */}
      <Sparkles count={100} scale={15} size={3} speed={0.3} color="#60a5fa" />
      <Sparkles count={80} scale={12} size={2} speed={0.2} color="#f472b6" />
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
          failIfMajorPerformanceCaveat: false,
          alpha: true
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x0d1117, 1);
        }}
        style={{ background: 'linear-gradient(180deg, #0d1117 0%, #1a1f2e 50%, #0d1117 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
