"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SHAPE_COUNT = 15;

export default function WireframeGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const items: {
      position: THREE.Vector3;
      rotationSpeed: THREE.Vector3;
      driftSpeed: THREE.Vector3;
      scale: number;
      geometry: THREE.BufferGeometry;
    }[] = [];

    for (let i = 0; i < SHAPE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 6;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 8,
        Math.sin(angle) * radius - 5 // Push back in Z
      );

      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.0003,
        0.00035 + Math.random() * 0.0002, // Y rotation ~0.02 deg/frame
        (Math.random() - 0.5) * 0.0003
      );

      const driftSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001
      );

      const scale = 0.5 + Math.random() * 1.5;

      // Random wireframe shape: box or tetrahedron
      const geometry =
        Math.random() > 0.5
          ? new THREE.BoxGeometry(1, 1, 1)
          : new THREE.TetrahedronGeometry(1, 0);

      items.push({ position, rotationSpeed, driftSpeed, scale, geometry });
    }

    return items;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const shape = shapes[i];
      if (!shape) return;

      child.rotation.x += shape.rotationSpeed.x;
      child.rotation.y += shape.rotationSpeed.y;
      child.rotation.z += shape.rotationSpeed.z;

      child.position.x += shape.driftSpeed.x;
      child.position.y += shape.driftSpeed.y;
      child.position.z += shape.driftSpeed.z;
    });
  });

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#C9A96E"),
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <lineSegments
          key={i}
          position={shape.position}
          scale={[shape.scale, shape.scale, shape.scale]}
          geometry={new THREE.WireframeGeometry(shape.geometry)}
          material={lineMaterial}
        />
      ))}
    </group>
  );
}
