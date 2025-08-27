'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Html } from '@react-three/drei'
import * as THREE from 'three'

interface MousePosition {
  x: number
  y: number
}

function AnimatedPoints({ mousePosition }: { mousePosition: MousePosition }) {
  const ref = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.x = state.clock.elapsedTime * 0.05 + mousePosition.y * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.08 + mousePosition.x * 0.3

      // Mouse influence on position
      ref.current.position.x = mousePosition.x * 0.5
      ref.current.position.y = mousePosition.y * 0.3
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0066ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function SmartTag({ mousePosition }: { mousePosition: MousePosition }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + mousePosition.x * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 + mousePosition.y * 0.1
      meshRef.current.position.x = mousePosition.x * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
      <meshStandardMaterial
        color="#0066ff"
        emissive="#0066ff"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function DataStreams({ mousePosition }: { mousePosition: MousePosition }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2 + mousePosition.x * 0.1
      groupRef.current.position.x = mousePosition.x * 0.3
      groupRef.current.position.y = mousePosition.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 2, Math.sin(i * Math.PI / 4) * 2, 0]}>
          <boxGeometry args={[0.02, 0.02, 2]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff6600"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}



function FloatingExperienceCards({ mousePosition }: { mousePosition: MousePosition }) {
  const experiences: Array<{ name: string; position: [number, number, number]; color: string; image: string }> = [
    { name: 'Feel Welcome', position: [-3, 2, -1], color: '#8B5CF6', image: '/belevingen/FeelWelcome.svg' },
    { name: 'Magic Mirror', position: [3, -1, -2], color: '#06B6D4', image: '/belevingen/MagicMirror.svg' },
    { name: 'Fotobooth', position: [-2, -2, 1], color: '#10B981', image: '/belevingen/fotobooth.svg' },
    { name: 'Smart Waiter', position: [2, 2, -1], color: '#F59E0B', image: '/belevingen/SmartWaiter.svg' },
    { name: 'Smart VIP', position: [-1, 0, 2], color: '#EF4444', image: '/belevingen/SmartVIP.svg' }
  ]

  return (
    <group>
      {experiences.map((exp, index) => (
        <FloatingCard
          key={exp.name}
          position={exp.position}
          color={exp.color}
          name={exp.name}
          image={exp.image}
          mousePosition={mousePosition}
          delay={index * 0.5}
        />
      ))}
    </group>
  )
}

function FloatingCard({
  position,
  color,
  name,
  image,
  mousePosition,
  delay
}: {
  position: [number, number, number]
  color: string
  name: string
  image: string
  mousePosition: MousePosition
  delay: number
}) {
  const cardRef = useRef<THREE.Group>(null!)
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (cardRef.current && !isClicked) {
      // Floating animation with 360 degree rotation
      cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + delay) * 0.5
      cardRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3 + delay) * 0.3
      cardRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mousePosition.x * 0.1 // 360 graden rotatie
      cardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + delay) * 0.15 + mousePosition.y * 0.1
      cardRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15 + delay) * 0.05
    } else if (cardRef.current && isClicked) {
      // Stil en vergroot wanneer geklikt
      cardRef.current.rotation.y = 0 // Recht naar voren
      cardRef.current.rotation.x = 0
      cardRef.current.rotation.z = 0
    }
  })

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <group ref={cardRef} position={[position[0], position[1], position[2]]}>
      {/* Enkele kaart met native afbeeldingsgrootte */}
      <Html
        position={[0, 0, 0]}
        transform
        occlude={false}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none'
        }}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: isClicked ? '600px' : '120px',
            height: isClicked ? '600px' : '120px',
            position: isClicked ? 'fixed' : 'relative',
            top: isClicked ? '50%' : 'auto',
            left: isClicked ? '50%' : 'auto',
            transform: isClicked ? 'translate(-50%, -50%)' : 'none',
            border: `3px solid #0066ff`,
            borderRadius: '0px', // Rechthoekige rand
            overflow: 'hidden',
            boxShadow: isHovered || isClicked
              ? '0 8px 32px rgba(0, 102, 255, 0.8), 0 0 40px rgba(0, 102, 255, 0.6)'
              : '0 4px 16px rgba(0, 102, 255, 0.5), 0 0 20px rgba(0, 102, 255, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: isClicked ? 1000 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px'
          }}
        >
          <div style={{
            width: isClicked ? '588px' : '108px',
            height: isClicked ? '588px' : '108px',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={image}
              alt={name}
              style={{
                width: isClicked ? '588px' : '108px',
                height: isClicked ? '588px' : '108px',
                objectFit: 'contain',
                imageRendering: 'auto'
              } as React.CSSProperties}
            />
          </div>
        </div>
      </Html>
    </group>
  )
}

export function Hero3D() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066ff" />

        <AnimatedPoints mousePosition={mousePosition} />
        <SmartTag mousePosition={mousePosition} />
        <DataStreams mousePosition={mousePosition} />
        <FloatingExperienceCards mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
