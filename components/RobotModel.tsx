import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const RobotModel = () => {
  const { scene } = useGLTF('/public/assets/cool-robot.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2.3} position={[0, -1.5, 0]} />;
};

export default RobotModel;
