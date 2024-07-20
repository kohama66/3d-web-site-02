import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  useGLTF,
  SoftShadows,
  useTexture,
  Text,
  Billboard,
} from "@react-three/drei";
import { Group, RepeatWrapping, SpotLightHelper, type Mesh } from "three";
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

  const handleClick = () => {
    if (jarRef.current) {
      jarRef.current.rotation.y = Math.random() * 2 - 1;
    }
  };

  return <primitive object={gltf.scene} ref={jarRef} onClick={handleClick} />;
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

      <Title />
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

const Title: React.FC = () => {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(performance.now() * 0.01) * 0.1;
    }
  });

  return (
    <Billboard>
      <group ref={ref}>
        <Text position={[-1, 0, 0]} fontSize={0.6}>
          壺
        </Text>
        <Text position={[1, 0, 0]} fontSize={0.6}>
          壺
        </Text>
      </group>
    </Billboard>
  );
};

// const DebugFrame: React.FC = () => {
//   return (
//     <>
//       <Grid infiniteGrid={true} cellSize={1} sectionSize={5} />
//       <axesHelper args={[5]} />
//     </>
//   );
// };
