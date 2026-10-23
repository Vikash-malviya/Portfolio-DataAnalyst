import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D4AF37";
const OBSIDIAN = "#17171a";
const SPIKE = "#101013";

function Particles({ count = 650 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.7 - 1;
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color={GOLD} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function OrbitRing({ radius, tilt, speed, satelliteOffset = 0 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.006, 8, 128]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} transparent opacity={0.55} />
        </mesh>
        <mesh position={[radius * Math.cos(satelliteOffset), radius * Math.sin(satelliteOffset), 0]}>
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.6} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

const SPIKES = [
  // [position x,y,z, rotation x,z, scale] — spiky anime hair around the skull
  [[0, 0.86, 0.02], [0.15, 0], 1.15],
  [[-0.3, 0.78, 0.08], [0.1, 0.55], 1.0],
  [[0.3, 0.78, 0.08], [0.1, -0.55], 1.0],
  [[-0.48, 0.6, 0.05], [0, 1.0], 0.9],
  [[0.48, 0.6, 0.05], [0, -1.0], 0.9],
  [[-0.2, 0.72, -0.3], [-0.7, 0.35], 1.0],
  [[0.2, 0.72, -0.3], [-0.7, -0.35], 1.0],
  [[0, 0.7, -0.42], [-1.0, 0], 1.05],
  [[-0.52, 0.38, -0.12], [-0.3, 1.25], 0.8],
  [[0.52, 0.38, -0.12], [-0.3, -1.25], 0.8],
];

function HeroFigure() {
  const group = useRef();
  const head = useRef();

  useFrame((state) => {
    // subtle head-tracking toward the cursor; drag rotation handled by OrbitControls
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.25, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, state.pointer.y * 0.12, 0.08);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.85}>
        {/* torso */}
        <mesh position={[0, -1.25, 0]}>
          <capsuleGeometry args={[0.78, 1.05, 8, 32]} />
          <meshStandardMaterial color={OBSIDIAN} metalness={0.75} roughness={0.3} />
        </mesh>
        {/* cape flare */}
        <mesh position={[0, -1.1, -0.45]} rotation={[0.35, 0, 0]}>
          <coneGeometry args={[1.05, 1.7, 32, 1, true]} />
          <meshStandardMaterial color="#0c0c0e" metalness={0.6} roughness={0.45} side={THREE.DoubleSide} />
        </mesh>
        {/* collar */}
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.035, 16, 64]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} emissive={GOLD} emissiveIntensity={0.35} />
        </mesh>

        {/* sword on the back */}
        <group position={[0.42, -0.55, -0.5]} rotation={[0.15, 0, -0.62]}>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.075, 1.7, 0.02]} />
            <meshStandardMaterial color="#2b2b31" metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.42, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.075, 0.16, 0.02]} />
            <meshStandardMaterial color="#2b2b31" metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.025, 12, 32]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} emissive={GOLD} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.35, 16]} />
            <meshStandardMaterial color="#0e0e10" roughness={0.6} />
          </mesh>
        </group>

        {/* head group (tracks cursor) */}
        <group ref={head} position={[0, 0.28, 0]}>
          <mesh>
            <sphereGeometry args={[0.52, 48, 48]} />
            <meshStandardMaterial color="#1c1c20" metalness={0.85} roughness={0.22} />
          </mesh>
          {/* spiky anime hair */}
          {SPIKES.map(([pos, rot, s], i) => (
            <mesh key={i} position={pos} rotation={[rot[0], 0, rot[1]]} scale={s}>
              <coneGeometry args={[0.16, 0.5, 12]} />
              <meshStandardMaterial color={SPIKE} metalness={0.7} roughness={0.35} emissive={GOLD} emissiveIntensity={0.06} />
            </mesh>
          ))}
          {/* headband */}
          <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2.15, 0, 0]}>
            <torusGeometry args={[0.5, 0.028, 12, 64]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} emissive={GOLD} emissiveIntensity={0.4} />
          </mesh>
          {/* anime eyes — white + gold iris */}
          <mesh position={[-0.19, 0.05, 0.44]} scale={[1, 1.35, 0.6]}>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial color="#e8e8ec" roughness={0.25} />
          </mesh>
          <mesh position={[0.19, 0.05, 0.44]} scale={[1, 1.35, 0.6]}>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial color="#e8e8ec" roughness={0.25} />
          </mesh>
          <mesh position={[-0.19, 0.05, 0.51]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.19, 0.05, 0.51]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2} />
          </mesh>
          {/* determined brows */}
          <mesh position={[-0.19, 0.24, 0.46]} rotation={[0, 0, -0.28]}>
            <boxGeometry args={[0.16, 0.025, 0.02]} />
            <meshStandardMaterial color={SPIKE} roughness={0.5} />
          </mesh>
          <mesh position={[0.19, 0.24, 0.46]} rotation={[0, 0, 0.28]}>
            <boxGeometry args={[0.16, 0.025, 0.02]} />
            <meshStandardMaterial color={SPIKE} roughness={0.5} />
          </mesh>
        </group>

        {/* halo */}
        <mesh position={[0, 1.05, -0.15]} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.62, 0.012, 16, 100]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} transparent opacity={0.9} />
        </mesh>

        {/* data orbits */}
        <OrbitRing radius={1.55} tilt={[Math.PI / 2.15, 0.25, 0]} speed={0.4} />
        <OrbitRing radius={2.05} tilt={[Math.PI / 1.85, -0.35, 0]} speed={-0.25} satelliteOffset={2.1} />
      </Float>
    </group>
  );
}

export default function AvatarScene() {
  return (
    <div data-testid="hero-3d-avatar" className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.15, 5.4], fov: 38 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={120} color={GOLD} />
        <pointLight position={[-6, 2, -4]} intensity={30} color="#9db4d6" />
        <pointLight position={[0, 1, 4]} intensity={18} color="#c9d4e8" />
        <pointLight position={[0, -3, 3]} intensity={10} color={GOLD} />
        <HeroFigure />
        <Particles />
        <ContactShadows position={[0, -2.35, 0]} opacity={0.45} scale={9} blur={2.6} far={4} color="#000000" />
        <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.7} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Drag to spin the hero
      </p>
    </div>
  );
}
