import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import type { Mesh } from "three";

function CameraZoom({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Move camera forward as scroll progresses (z: 5 → 1.5)
    const targetZ = 5 - progress * 3.5;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
  });

  return null;
}

function FloatingSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1e3a5f"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[0.6, 0.2, 32, 64]} position={[2.5, 1, -2]}>
        <meshStandardMaterial
          color="#2d5a8e"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.8}
        />
      </Torus>
    </Float>
  );
}

function FloatingIcosahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[0.5, 1]} position={[-2.5, -1, -1]}>
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.4}
          metalness={0.6}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
}

export default function Scene3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ pointerEvents: "none" }}
      dpr={[1, 2]}
    >
      <CameraZoom progress={scrollProgress} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <FloatingSphere />
      <FloatingTorus />
      <FloatingIcosahedron />
    </Canvas>
  );
}
