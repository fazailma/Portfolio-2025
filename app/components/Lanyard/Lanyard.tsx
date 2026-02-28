/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Extend JSX IntrinsicElements untuk TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// replace with your own imports
const cardGLB = "/assets/lanyard/card.glb"
const lanyard = "/assets/lanyard/lanyard.png"

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ maxSpeed = 40, minSpeed = 0 }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: false,
    colliders: false,
    angularDamping: 8,
    linearDamping: 8,
    friction: 0.3
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(false);

  useEffect(() => {
    // Set initial state after mount to avoid hydration mismatch
    setIsSmall(window.innerWidth < 1024);

    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.16, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      // Get card's anchor position (fixed point at top)
      const anchorX = 0;
      const anchorY = 4;
      const anchorZ = 0;
      
      // Calculate initial target position
      let targetX = vec.x - dragged.x;
      let targetY = vec.y - dragged.y;
      let targetZ = vec.z - dragged.z;
      
      // Calculate distances from anchor
      let distX = targetX - anchorX;
      let distY = targetY - anchorY;
      let distZ = targetZ - anchorZ;
      
      // Max distance constraints - generous but safe
      const maxDistX = 3.2;  // Left-Right limit
      const maxDistZ = 3.0;  // Front-Back limit
      const maxDistYDown = 6.0;  // Downward limit
      const maxDistYUp = 1.5;    // Upward limit
      
      // Clamp X axis (left-right) with smooth enforcement
      if (Math.abs(distX) > maxDistX) {
        distX = Math.sign(distX) * maxDistX;
        targetX = anchorX + distX;
      }
      
      // Clamp Z axis (front-back) with smooth enforcement
      if (Math.abs(distZ) > maxDistZ) {
        distZ = Math.sign(distZ) * maxDistZ;
        targetZ = anchorZ + distZ;
      }
      
      // Clamp Y axis (up-down) with asymmetric limits
      if (distY < -maxDistYDown) {
        distY = -maxDistYDown;
        targetY = anchorY + distY;
      } else if (distY > maxDistYUp) {
        distY = maxDistYUp;
        targetY = anchorY + distY;
      }
      
      // Wake up all joints to prevent sleeping
      [card, j1, j2, j3, fixed].forEach(ref => {
        if (ref.current?.wakeUp) ref.current.wakeUp();
      });
      
      // Set card position with kinematic mode - safe position update
      try {
        if (card.current?.setNextKinematicTranslation) {
          card.current.setNextKinematicTranslation({
            x: targetX,
            y: targetY,
            z: targetZ
          });
        }
      } catch (e) {
        console.error('Error setting kinematic translation:', e);
      }
    }
    
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (ref.current) {
          if (!ref.current.lerped) {
            ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
          }
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
          ref.current.lerped?.lerp(
            ref.current.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          );
        }
      });
      
      // Update curve points safely
      if (band.current && band.current.geometry) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped || j2.current.translation());
        curve.points[2].copy(j1.current.lerped || j1.current.translation());
        curve.points[3].copy(fixed.current.translation());
        try {
          band.current.geometry.setPoints(curve.getPoints(32));
        } catch (e) {
          console.error('Error updating band geometry:', e);
        }
      }
      
      // Velocity damping for rope segments
      [j1, j2, j3].forEach(ref => {
        if (ref.current?.linvel) {
          const vel = ref.current.linvel();
          const damping = 0.84;
          try {
            ref.current.setLinvel({
              x: vel.x * damping,
              y: vel.y * damping,
              z: vel.z * damping
            });
          } catch (e) {
            // Silently ignore linvel errors
          }
        }
      });
      
      // Apply velocity damping to card
      if (card.current?.linvel) {
        const cardVel = card.current.linvel();
        const velMagnitude = Math.sqrt(cardVel.x * cardVel.x + cardVel.y * cardVel.y + cardVel.z * cardVel.z);
        const maxVelocity = 48;
        
        if (velMagnitude > maxVelocity) {
          const scale = maxVelocity / velMagnitude;
          try {
            card.current.setLinvel({
              x: cardVel.x * scale,
              y: cardVel.y * scale,
              z: cardVel.z * scale
            });
          } catch (e) {
            // Silently ignore setLinvel errors
          }
        }
      }
      
      if (card.current?.angvel && card.current?.rotation) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        try {
          card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        } catch (e) {
          // Silently ignore angvel errors
        }
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.64, 0.9, 0.008]} />
          <group
            scale={1.8}
            position={[0, -0.96, -0.04]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1.5}
        />
      </mesh>
    </>
  );
}