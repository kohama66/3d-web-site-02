import { Grid, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type React from "react";

export const WhaleGL: React.FC = () => {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", backgroundColor: "#151321" }}
      camera={{ position: [0.5, -0.2, -0.5], fov: 60 }}
    >
      <hemisphereLight intensity={2} color="#8e82e5" groundColor="#aa78cc" />
      <Whale />
      <OrbitControls makeDefault position={[5, 2, 5]} target={[0, 0, -0.1]} />
    </Canvas>
  );
};

const Whale: React.FC = () => {
  const { scene } = useGLTF("whale.glb");

  return <primitive object={scene} />;
};
