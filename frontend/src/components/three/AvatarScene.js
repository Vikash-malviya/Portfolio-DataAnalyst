import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { HeroFigure, Particles, SCENE_LIGHTS } from "./figure";

export default function AvatarScene() {
  return (
    <div data-testid="hero-3d-avatar" className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.15, 5.4], fov: 38 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        {SCENE_LIGHTS}
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
