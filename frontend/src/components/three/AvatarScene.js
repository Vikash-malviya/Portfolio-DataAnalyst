import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D4AF37";
const OBSIDIAN = "#17171a";

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

function Avatar() {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.55, 0.055);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.22, 0.055);
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        {/* torso */}
        <mesh position={[0, -1.25, 0]}>
          <capsuleGeometry args={[0.78, 1.05, 8, 32]} />
          <meshStandardMaterial color={OBSIDIAN} metalness={0.75} roughness={0.3} />
        </mesh>
        {/* collar */}
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.035, 16, 64]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} emissive={GOLD} emissiveIntensity={0.35} />
        </mesh>
        {/* head */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.52, 48, 48]} />
          <meshStandardMaterial color="#1c1c20" metalness={0.85} roughness={0.22} />
        </mesh>
        {/* head wireframe shell */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.565, 18, 14]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.14} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.18, 0.34, 0.45]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2.4} />
        </mesh>
        <mesh position={[0.18, 0.34, 0.45]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2.4} />
        </mesh>
        {/* halo */}
        <mesh position={[0, 0.95, -0.15]} rotation={[Math.PI / 2.4, 0, 0]}>
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
    <div data-testid="hero-3d-avatar" className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.15, 5.4], fov: 38 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.18} />
        <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={120} color={GOLD} />
        <pointLight position={[-6, 2, -4]} intensity={30} color="#9db4d6" />
        <pointLight position={[0, -3, 3]} intensity={10} color={GOLD} />
        <Avatar />
        <Particles />
        <ContactShadows position={[0, -2.35, 0]} opacity={0.45} scale={9} blur={2.6} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
