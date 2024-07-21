import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import { Color, Group, Mesh } from "three";

export const WhaleGL: React.FC = () => {
  const speed = 10;
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, -2.5] }}
        style={{ backgroundColor: "#ededed" }}
      >
        <OrbitControls />

        <ambientLight intensity={1.2} />
        <Environment resolution={1024}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer
              intensity={4}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
              <Lightformer
                key={i}
                form="circle"
                intensity={4}
                rotation={[Math.PI / 2, 0, 0]}
                position={[x, 4, i * 4]}
                scale={[4, 1, 1]}
              />
            ))}
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[50, 2, 1]}
            />
            <Lightformer
              intensity={12}
              rotation-y={-Math.PI / 8}
              position={[10, 1, 0]}
              scale={[50, 2, 1]}
            />
          </group>
        </Environment>

        <Aquarium>
          <Float rotationIntensity={1} floatIntensity={1} speed={speed / 2}>
            <Whale />
          </Float>
        </Aquarium>
      </Canvas>
    </div>
  );
};

const Whale: React.FC = () => {
  const { scene } = useGLTF("whale.glb");

  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const Aquarium: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group rotation={[0, 1.5, 0]} ref={ref}>
      <mesh position={[0, 0, 0]}>
        {/* <sphereGeometry args={[1, 64, 64]} /> */}
        {/* <boxGeometry args={[1, 1.2, 2]} /> */}
        <RoundedBox
          args={[1, 1.2, 2]} // サイズ
          radius={0.05} // 角の半径
          smoothness={4} // 丸角の滑らかさ
          position={[0, 0, 0]} // 位置
        >
          <MeshTransmissionMaterial
            ior={1.33} // 水の屈折率に近い値
            background={new Color("#c6e5db")}
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={4}
            temporalDistortion={1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
          />
        </RoundedBox>
      </mesh>
      <group>{children}</group>
    </group>
  );
};
