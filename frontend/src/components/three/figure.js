import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#EE2737";
const SUIT = "#A4121E";
const WEB = "#0a0a0a";
const SILK = "#f2f2f5";

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
      <pointsMaterial size={0.022} color={GOLD} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
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
          <meshStandardMaterial color={WEB} roughness={0.4} />
        </mesh>,
      );
    });
  });
  return (
    <group position={[0, -0.92, 0.66]}>
      <mesh scale={[1, 1.5, 0.5]}>
        <octahedronGeometry args={[0.075]} />
        <meshStandardMaterial color={WEB} metalness={0.6} roughness={0.3} />
      </mesh>
      {legs}
    </group>
  );
}

function WebShooterArm({ side }) {
  return (
    <group>
      <mesh position={[side * 0.62, -0.82, 0]} rotation={[0, 0, side * 0.93]}>
        <capsuleGeometry args={[0.13, 0.5, 6, 16]} />
        <meshStandardMaterial color={SUIT} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[side * 0.92, -0.56, 0.08]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={SUIT} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* silver web line from the wrist */}
      <mesh position={[side * 1.75, 0.1, 0.1]} rotation={[0, 0, side * 0.93]}>
        <cylinderGeometry args={[0.008, 0.008, 2.1, 6]} />
        <meshStandardMaterial color={SILK} emissive={SILK} emissiveIntensity={0.5} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export function HeroFigure({ withOrbits = true, swing = true }) {
  const head = useRef();
  const inner = useRef();
  const entranceWeb = useRef();

  useFrame((state) => {
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.25, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, state.pointer.y * 0.12, 0.08);
    }
    if (!swing) return;
    // web-swing entrance: drop in from above-left on a web line, pendulum sway, then the web fades
    const t = state.clock.getElapsedTime();
    const p = THREE.MathUtils.clamp((t - 1.7) / 2.1, 0, 1);
    const e = 1 - Math.pow(1 - p, 3);
    if (inner.current) {
      inner.current.position.y = (1 - e) * 5.5;
      inner.current.position.x = (1 - e) * -3.5;
      inner.current.rotation.z = Math.sin(p * Math.PI * 2.2) * (1 - p) * 0.45;
    }
    if (entranceWeb.current) {
      const target = p >= 1 ? 0 : 0.9;
      entranceWeb.current.material.opacity = THREE.MathUtils.lerp(entranceWeb.current.material.opacity, target, 0.08);
    }
  });

  return (
    <group ref={inner}>
      {swing && (
        <mesh ref={entranceWeb} position={[2.14, 2.73, 0.1]} rotation={[0, 0, -0.36]}>
          <cylinderGeometry args={[0.012, 0.012, 7, 6]} />
          <meshStandardMaterial color={SILK} emissive={SILK} emissiveIntensity={0.7} transparent opacity={0.9} />
        </mesh>
      )}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.85}>
        {/* torso */}
        <mesh position={[0, -1.25, 0]}>
          <capsuleGeometry args={[0.78, 1.05, 8, 32]} />
          <meshStandardMaterial color={SUIT} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* black webbing rings on the suit */}
        <mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.79, 0.007, 8, 64]} />
          <meshStandardMaterial color={WEB} roughness={0.4} />
        </mesh>
        <mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.79, 0.007, 8, 64]} />
          <meshStandardMaterial color={WEB} roughness={0.4} />
        </mesh>

        <SpiderEmblem />
        <WebShooterArm side={1} />
        <WebShooterArm side={-1} />

        {/* masked head */}
        <group ref={head} position={[0, 0.28, 0]}>
          <mesh>
            <sphereGeometry args={[0.52, 48, 48]} />
            <meshStandardMaterial color={SUIT} metalness={0.55} roughness={0.3} />
          </mesh>
          {/* black web rings around the mask */}
          <mesh rotation={[Math.PI / 2.15, 0, 0]}>
            <torusGeometry args={[0.51, 0.007, 8, 72]} />
            <meshStandardMaterial color={WEB} roughness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
            <torusGeometry args={[0.515, 0.006, 8, 72]} />
            <meshStandardMaterial color={WEB} roughness={0.4} />
          </mesh>
          <mesh rotation={[0.2, 0, Math.PI / 2]}>
            <torusGeometry args={[0.515, 0.006, 8, 72]} />
            <meshStandardMaterial color={WEB} roughness={0.4} />
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

        {/* silver web arcs behind the figure */}
        <mesh position={[0, -0.3, -1.2]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[1.9, 0.006, 8, 96, Math.PI * 0.85]} />
          <meshStandardMaterial color={SILK} emissive={SILK} emissiveIntensity={0.4} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, -0.1, -1.4]} rotation={[-0.4, 0.4, Math.PI * 0.4]}>
          <torusGeometry args={[2.2, 0.005, 8, 96, Math.PI * 0.7]} />
          <meshStandardMaterial color={SILK} emissive={SILK} emissiveIntensity={0.4} transparent opacity={0.22} />
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
    <ambientLight intensity={0.4} />
    <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={110} color="#ff6b6b" />
    <pointLight position={[-6, 2, -4]} intensity={30} color="#9db4d6" />
    <pointLight position={[0, 1, 4]} intensity={18} color="#f0d9d9" />
    <pointLight position={[5, -1, 3]} intensity={16} color={GOLD} />
    <pointLight position={[0, -3, 3]} intensity={10} color={GOLD} />
  </>
);

export const WebDecor = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="#EE2737" strokeWidth="1">
    <path d="M0 0 L200 200 M0 0 L140 200 M0 0 L200 140 M0 0 L60 200 M0 0 L200 60" opacity="0.8" />
    <path d="M28 8 Q32 24 12 28 M62 18 Q70 52 22 62 M98 26 Q112 84 30 96 M136 36 Q156 118 40 134 M172 46 Q200 152 50 172" />
  </svg>
);
