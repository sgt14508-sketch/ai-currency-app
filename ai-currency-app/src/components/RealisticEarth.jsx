import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import earthTextureUrl from "../assets/earth-night.jpg";

const cities = [
  { name: "New York", lat: 40.71, lng: -74.00 },
  { name: "London", lat: 51.50, lng: -0.12 },
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Sydney", lat: -33.86, lng: 151.20 },
  { name: "Dubai", lat: 25.20, lng: 55.27 },
  { name: "Mumbai", lat: 19.07, lng: 72.87 },
];

// 1. Animated Network Arcs
function NetworkArcs({ radius }) {
  const routes = [
    { start: cities[0], end: cities[1] },
    { start: cities[0], end: cities[2] },
    { start: cities[1], end: cities[3] },
    { start: cities[4], end: cities[2] },
    { start: cities[5], end: cities[4] },
  ];

  const latLngToVector3 = (lat, lng, r) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Generate the curved paths
  const arcs = useMemo(() => {
    return routes.map((route) => {
      const start = latLngToVector3(route.start.lat, route.start.lng, radius);
      const end = latLngToVector3(route.end.lat, route.end.lng, radius);
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(radius * 1.25);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(50);
    });
  }, [radius]);

  // Animate a pulse flying along the line
  const lineRefs = useRef([]);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lineRefs.current.forEach((line, index) => {
      if (line) {
        // Offset the dash to make it look like it's traveling
        line.material.dashOffset = -(time * 2 + index);
      }
    });
  });

  return (
    <group>
      {arcs.map((points, i) => (
        <Line
          key={i}
          ref={(el) => (lineRefs.current[i] = el)}
          points={points}
          color="#22d3ee"
          lineWidth={2}
          dashed
          dashScale={20}
          dashSize={0.5}
          dashOffset={0}
          transparent
          opacity={0.8}
        />
      ))}
    </group>
  );
}

// 2. Glowing City Markers
function CityMarkers({ radius }) {
  const latLngToVector3 = (lat, lng, r) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  };

  return (
    <group>
      {cities.map((city, i) => {
        const pos = latLngToVector3(city.lat, city.lng, radius);
        return (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh>
              <ringGeometry args={[0.03, 0.04, 32]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 3. The Earth Model
function EarthModel() {
  const meshRef = useRef();
  
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(earthTextureUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Perfectly round Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          color="#111111" // Slightly lighter so we see oceans
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={1.5} // Bright city lights
        />
      </Sphere>
      <NetworkArcs radius={2} />
      <CityMarkers radius={2} />
    </group>
  );
}

export default function RealisticEarth() {
  return (
    <div className="w-full h-full min-h-[600px] relative flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        
        {/* Atmosphere Glow - perfectly centered */}
        <Sphere args={[2.1, 64, 64]}>
          <meshBasicMaterial 
            color="#00d8ff" 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending} 
          />
        </Sphere>

        <EarthModel />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}