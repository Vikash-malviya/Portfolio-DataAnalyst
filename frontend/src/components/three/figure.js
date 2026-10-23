import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D4AF37";
const SUIT = "#0d0d10";

export function Particles({ count = 650 }) {
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

export function OrbitRing({ radius, tilt, speed, satelliteOffset = 0 }) {
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

function SpiderEmblem() {
  const legs = [];
  [-1, 1].forEach((side) => {
    [0.45, 0.85, 1.25, 1.65].forEach((a, i) => {
      legs.push(
        <mesh
          key={`${side}-${i}`}
          position={[side * 0.11, 0.05 - i * 0.045, 0]}
          rotation={[0, 0, side * (Math.PI / 2 - a * 0.55)]}
        >
          <cylinderGeometry args={[0.011, 0.011, 0.24, 8]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} />
        </mesh>,
      );
    });
  });
  return (
    <group position={[0, -0.92, 0.66]}>
      <mesh scale={[1, 1.5, 0.5]}>
        <octahedronGeometry args={[0.075]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} metalness={0.8} roughness={0.25} />
      </mesh>
      {legs}
    </group>
  );
}

function WebShooterArm({ side }) {
  return (
    <group>
      {/* arm raised in web-slinging pose */}
      <mesh position={[side * 0.62, -0.82, 0]} rotation={[0, 0, side * 0.93]}>
        <capsuleGeometry args={[0.13, 0.5, 6, 16]} />
        <meshStandardMaterial color={SUIT} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* hand */}
      <mesh position={[side * 0.92, -0.56, 0.08]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={SUIT} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* gold web line shooting from the wrist */}
      <mesh position={[side * 1.75, 0.1, 0.1]} rotation={[0, 0, side * 0.93]}>
        <cylinderGeometry args={[0.008, 0.008, 2.1, 6]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.1} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

export function HeroFigure({ withOrbits = true }) {
  const head = useRef();

  useFrame((state) => {
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.25, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, state.pointer.y * 0.12, 0.08);
    }
  });

  return (
    <group>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.85}>
        {/* torso */}
        <mesh position={[0, -1.25, 0]}>
          <capsuleGeometry args={[0.78, 1.05, 8, 32]} />
          <meshStandardMaterial color={SUIT} metalness={0.8} roughness={0.28} />
        </mesh>
        {/* torso web rings */}
        <mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.79, 0.005, 8, 64]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.7} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.79, 0.005, 8, 64]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.7} transparent opacity={0.3} />
        </mesh>

        <SpiderEmblem />
        <WebShooterArm side={1} />
        <WebShooterArm side={-1} />

        {/* masked head */}
        <group ref={head} position={[0, 0.28, 0]}>
          <mesh>
            <sphereGeometry args={[0.52, 48, 48]} />
            <meshStandardMaterial color={SUIT} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* gold web rings wrapped around the mask */}
          <mesh rotation={[Math.PI / 2.15, 0, 0]}>
            <torusGeometry args={[0.51, 0.005, 8, 72]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} transparent opacity={0.45} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
            <torusGeometry args={[0.515, 0.004, 8, 72]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[0.2, 0, Math.PI / 2]}>
            <torusGeometry args={[0.515, 0.004, 8, 72]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} transparent opacity={0.3} />
          </mesh>
          {/* big white spider lenses */}
          <mesh position={[-0.21, 0.1, 0.4]} rotation={[0, 0, 0.32]} scale={[1.05, 1.5, 0.45]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#f5f5f7" emissive="#ffffff" emissiveIntensity={0.55} roughness={0.15} />
          </mesh>
          <mesh position={[0.21, 0.1, 0.4]} rotation={[0, 0, -0.32]} scale={[1.05, 1.5, 0.45]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial color="#f5f5f7" emissive="#ffffff" emissiveIntensity={0.55} roughness={0.15} />
          </mesh>
        </group>

        {/* web arcs behind the figure */}
        <mesh position={[0, -0.3, -1.2]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[1.9, 0.006, 8, 96, Math.PI * 0.85]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, -0.1, -1.4]} rotation={[-0.4, 0.4, Math.PI * 0.4]}>
          <torusGeometry args={[2.2, 0.005, 8, 96, Math.PI * 0.7]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} transparent opacity={0.22} />
        </mesh>

        {withOrbits && (
          <>
            <OrbitRing radius={1.55} tilt={[Math.PI / 2.15, 0.25, 0]} speed={0.4} />
            <OrbitRing radius={2.05} tilt={[Math.PI / 1.85, -0.35, 0]} speed={-0.25} satelliteOffset={2.1} />
          </>
        )}
      </Float>
    </group>
  );
}

export const SCENE_LIGHTS = (
  <>
    <ambientLight intensity={0.35} />
    <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={120} color={GOLD} />
    <pointLight position={[-6, 2, -4]} intensity={30} color="#9db4d6" />
    <pointLight position={[0, 1, 4]} intensity={18} color="#c9d4e8" />
    <pointLight position={[5, -1, 3]} intensity={14} color="#ff3849" />
    <pointLight position={[0, -3, 3]} intensity={10} color={GOLD} />
  </>
);

export const WebDecor = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="#D4AF37" strokeWidth="1">
    <path d="M0 0 L200 200 M0 0 L140 200 M0 0 L200 140 M0 0 L60 200 M0 0 L200 60" opacity="0.8" />
    <path d="M28 8 Q32 24 12 28 M62 18 Q70 52 22 62 M98 26 Q112 84 30 96 M136 36 Q156 118 40 134 M172 46 Q200 152 50 172" />
  </svg>
);
