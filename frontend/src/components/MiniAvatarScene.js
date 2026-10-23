import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { HeroFigure, Particles, SCENE_LIGHTS, WebDecor } from "./three/figure";

export default function MiniAvatarScene() {
  return (
    <div
      data-testid="about-3d-avatar"
      className="relative flex h-full min-h-[420px] cursor-grab items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0C] active:cursor-grabbing"
    >
      <Canvas camera={{ position: [0, -0.1, 4.4], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        {SCENE_LIGHTS}
        <group position={[0, -0.15, 0]}>
          <HeroFigure withOrbits={false} />
        </group>
        <Particles count={260} />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={8} blur={2.6} far={4} color="#000000" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={1.1}
          target={[0, -0.3, 0]}
        />
      </Canvas>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
      <WebDecor className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 opacity-20" />
      <p className="pointer-events-none absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        Drag me
      </p>
    </div>
  );
}
