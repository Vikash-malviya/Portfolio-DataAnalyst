import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D4AF37";
const COOL = "#7DD3FC";

function latLonToVec3(lat, lon, r) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function Marker() {
  const ring = useRef();
  const pos = latLonToVec3(26.0, 73.0, 1.34);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.getElapsedTime() % 2) / 2;
    ring.current.scale.setScalar(1 + t * 1.6);
    ring.current.material.opacity = 0.8 * (1 - t);
  });
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color={COOL} emissive={COOL} emissiveIntensity={2.4} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.6, 0.4, 0]}>
        <torusGeometry args={[0.07, 0.006, 8, 32]} />
        <meshStandardMaterial color={COOL} emissive={COOL} emissiveIntensity={1.4} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function MiniBars() {
  const heights = [0.22, 0.45, 0.34, 0.62];
  return (
    <group position={[-1.2, 0.45, 1.25]} rotation={[0, 0.4, 0]} scale={0.6}>
      {heights.map((h, i) => (
        <mesh key={i} position={[i * 0.16 - 0.24, h / 2, 0]}>
          <boxGeometry args={[0.11, h, 0.11]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.9} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -0.015, 0]}>
        <boxGeometry args={[0.78, 0.02, 0.2]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function MiniTrend() {
  const pts = [
    [0, 0, 0],
    [0.18, 0.12, 0],
    [0.36, 0.08, 0],
    [0.54, 0.28, 0],
    [0.72, 0.42, 0],
  ];
  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), []);
  return (
    <group position={[1.4, 0.85, 1.2]} rotation={[0, -0.5, 0]} scale={0.9}>
      <mesh>
        <tubeGeometry args={[curve, 32, 0.014, 8, false]} />
        <meshStandardMaterial color={COOL} emissive={COOL} emissiveIntensity={1.2} />
      </mesh>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={COOL} emissive={COOL} emissiveIntensity={1.8} />
        </mesh>
      ))}
      <mesh position={[0.78, 0.48, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <coneGeometry args={[0.05, 0.12, 12]} />
        <meshStandardMaterial color={COOL} emissive={COOL} emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

function Earth() {
  const texture = useLoader(THREE.TextureLoader, "/assets/earth-texture.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial map={texture} metalness={0.35} roughness={0.6} emissive="#ffffff" emissiveMap={texture} emissiveIntensity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.31, 28, 20]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.06} />
      </mesh>
      <Marker />
    </Float>
  );
}

function Starfield({ count = 350 }) {
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
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={GOLD} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <div data-testid="hero-3d-globe" className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={100} color={GOLD} />
        <pointLight position={[-6, 2, -4]} intensity={30} color="#60a5fa" />
        <pointLight position={[0, -2, 4]} intensity={8} color="#93c5fd" />
        <Suspense fallback={null}>
          <Earth />
          <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
            <MiniBars />
          </Float>
          <Float speed={2.4} rotationIntensity={0.3} floatIntensity={1}>
            <MiniTrend />
          </Float>
        </Suspense>
        <Starfield />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
      <p className="pointer-events-none absolute right-6 top-24 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        Drag the globe
      </p>
    </div>
  );
}
