import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  SoftShadows,
  useTexture,
  Clone,
} from "@react-three/drei";
import { Group } from "three";

const Jar: React.FC<{ x?: number; z?: number }> = ({ x = 0, z = 0 }) => {
  const gltf = useGLTF("jar.glb");
  const jarRef = useRef<Group>(null);

  // モデルの回転と位置を設定
  // gltf.scene.rotation.y = -Math.PI / 2; // Y軸周りに90度回転

  gltf.scene.traverse((child) => {
    if (child) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.position.x = x;
      child.position.z = z;
      child.rotation.y = Math.random() * 1.5;
    }
  });

  // return <primitive object={gltf.scene} ref={jarRef} onClick={handleClick} />;
  return <Clone object={gltf.scene} ref={jarRef} />;
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

const JarGroup: React.FC = () => {
  return (
    <>
      <Jar />
      <Jar x={0.8} />
      <Jar x={-0.8} />
      <Jar x={-1.6} />
      <Jar x={0.8} z={0.8} />
      <Jar x={-1.6} z={-0.8} />
      <Jar z={-0.8} />
      <Jar z={-1.6} />
      <Jar x={0} z={0.8} />
    </>
  );
};

export const GL: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw", backgroundColor: "#000" }}
      camera={{ position: [0.5, 2, 2] }}
      shadows
    >
      <spotLight color={"#ee82ee"} intensity={40} castShadow decay={3} />
      <rectAreaLight
        intensity={4}
        width={10}
        height={12}
        position={[0, 0, 4]}
      />

      {/* <Title /> */}
      <JarGroup />
      <Floor />

      <OrbitControls
        enablePan={false}
        // maxPolarAngle={Math.PI / 2}
        // maxDistance={3}
        // minDistance={1}
        autoRotate
      />
      <SoftShadows />
      {/* <DebugFrame /> */}
    </Canvas>
  );
};

// const Title: React.FC = () => {
//   const ref = useRef<Group>(null);

//   // useFrame(() => {
//   //   if (ref.current) {
//   //     ref.current.rotation.y = Math.sin(performance.now() * 0.01) * 0.1;
//   //   }
//   // });

//   return (
//     <Billboard>
//       <group ref={ref}>
//         <Text position={[-1, 0, 0]} fontSize={0.6}>
//           壺墓場
//         </Text>
//         {/* <Text position={[1, 0, 0]} fontSize={0.6}>
//           壺
//         </Text> */}
//       </group>
//     </Billboard>
//   );
// };

// const DebugFrame: React.FC = () => {
//   return (
//     <>
//       <Grid infiniteGrid={true} cellSize={1} sectionSize={5} />
//       <axesHelper args={[5]} />
//     </>
//   );
// };
