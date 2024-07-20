import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  useGLTF,
  SoftShadows,
  useTexture,
} from "@react-three/drei";
import { RepeatWrapping, SpotLightHelper, type Mesh } from "three";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

const Jar: React.FC = () => {
  const gltf = useGLTF("jar.glb");
  const jarRef = useRef<Mesh>(null);

  // モデルの回転と位置を設定
  gltf.scene.rotation.y = -Math.PI / 2; // Y軸周りに90度回転

  gltf.scene.traverse((child) => {
    if (child) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={gltf.scene} ref={jarRef} />;
};

const Floor: React.FC = () => {
  const texture = useTexture("/sand.jpg");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1c1c1c" map={texture} />
    </mesh>
  );
};

export const GL: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw", backgroundColor: "#000" }}
      camera={{ position: [0.5, 0.5, 1.5] }}
      shadows
    >
      <spotLight color={"#ee82ee"} intensity={40} castShadow decay={3} />
      <rectAreaLight
        intensity={4}
        width={10}
        height={12}
        position={[0, 0, 4]}
      />

      <Jar />
      <Floor />

      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        maxDistance={3}
        minDistance={1}
      />
      <SoftShadows />
      {/* <DebugFrame /> */}
    </Canvas>
  );
};

const DebugFrame: React.FC = () => {
  return (
    <>
      <Grid infiniteGrid={true} cellSize={1} sectionSize={5} />
      <axesHelper args={[5]} />
    </>
  );
};
