/* eslint-disable */
import * as THREE from "three";
import { Euler } from "three";

import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // look at mouse
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    ref.current.lookAt(x, y, 1);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Scene = (props: JSX.IntrinsicElements["mesh"]) => {
  const fbxRef = useRef<THREE.Mesh>(null!);
  const result = useLoader(FBXLoader, "Room1.fbx");

  // lookAt mouse
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    fbxRef.current.lookAt(x, y, 1);
  });

  return (
    <mesh ref={fbxRef} {...props}>
      <primitive object={result} scale={0.002} />
    </mesh>
  );
};

export default function ThreeModel() {
  return (
    <Canvas className="flex justify-center items-center">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* Euler represent rotation axis */}
      <Scene position={[-1, 0, 0]} rotation={new Euler(0.7, -1, 0)} />
      {/* <Box position={[-1.2, 0, 0]} /> */}
      <Box position={[2, 1, 0]} />
    </Canvas>
  );
}
