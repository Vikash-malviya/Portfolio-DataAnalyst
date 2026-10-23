import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D4AF37";

function Particles({ count = 320 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.7 - 0.8;
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={GOLD} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Saturn() {
  const planet = useRef();
  const moons = useRef();
  useFrame((_, delta) => {
    if (planet.current) planet.current.rotation.y += delta * 0.12;
    if (moons.current) moons.current.rotation.y += delta * 0.35;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.7}>
      {/* planet */}
      <mesh ref={planet}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <meshStandardMaterial color="#C9A227" metalness={0.7} roughness={0.28} emissive={GOLD} emissiveIntensity={0.12} />
      </mesh>
      {/* bands */}
      <mesh rotation={[Math.PI / 2.15, 0, 0]}>
        <torusGeometry args={[0.86, 0.008, 8, 96]} />
        <meshStandardMaterial color="#8a6d1f" transparent opacity={0.6} />
      </mesh>
      {/* rings */}
      <mesh rotation={[Math.PI / 2.35, 0, 0.25]}>
        <ringGeometry args={[1.15, 1.78, 128]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0, 0.25]}>
        <ringGeometry args={[1.88, 2.08, 128]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* moons */}
      <group ref={moons}>
        <mesh position={[2.5, 0.4, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#e8e8ec" emissive={GOLD} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-2.3, -0.5, 0.6]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#e8e8ec" emissive={GOLD} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.4, -0.9, -2.2]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#e8e8ec" emissive={GOLD} emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function SaturnScene() {
  return (
    <div
      data-testid="about-3d-saturn"
      className="relative flex h-full min-h-[420px] cursor-grab items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0C] active:cursor-grabbing"
    >
      <Canvas camera={{ position: [0, 0.4, 4.4], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={110} color={GOLD} />
        <pointLight position={[-6, 2, -4]} intensity={26} color="#9db4d6" />
        <pointLight position={[0, -3, 3]} intensity={10} color={GOLD} />
        <Saturn />
        <Particles />
        <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={8} blur={2.6} far={4} color="#000000" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={0.9}
        />
      </Canvas>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
      <p className="pointer-events-none absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        Drag to orbit
      </p>
    </div>
  );
}
