'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScanLine {
  id: string
  direction: 'horizontal' | 'vertical' | 'diagonal-right' | 'diagonal-left'
  color: string
  startPosition: { x: number; y: number }
  duration: number
  delay: number
}

const NEON_COLORS = [
  '#00D4FF', // Electric Blue
  '#0066FF', // Blue
  '#8A2BE2', // Purple
  '#40E0D0', // Turquoise
  '#00BFFF', // Deep Sky Blue
  '#9370DB', // Medium Purple
]

export default function RFIDScanningEffects() {
  const [scanLines, setScanLines] = useState<ScanLine[]>([])
  const [pulses, setPulses] = useState<Array<{ id: string; x: number; y: number; delay: number }>>([])

  // Generate random scan lines
  useEffect(() => {
    const generateScanLine = (): ScanLine => {
      const directions: ScanLine['direction'][] = ['horizontal', 'vertical', 'diagonal-right', 'diagonal-left']
      const direction = directions[Math.floor(Math.random() * directions.length)]
      const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
      
      let startPosition = { x: 0, y: 0 }
      
      switch (direction) {
        case 'horizontal':
          startPosition = { x: -100, y: Math.random() * 100 }
          break
        case 'vertical':
          startPosition = { x: Math.random() * 100, y: -100 }
          break
        case 'diagonal-right':
          startPosition = { x: -100, y: Math.random() * 100 }
          break
        case 'diagonal-left':
          startPosition = { x: 120, y: Math.random() * 100 }
          break
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        direction,
        color,
        startPosition,
        duration: 3 + Math.random() * 4, // 3-7 seconds
        delay: Math.random() * 2, // 0-2 seconds delay
      }
    }

    // Initial scan lines
    const initialLines = Array.from({ length: 8 }, generateScanLine)
    setScanLines(initialLines)

    // Continuously generate new scan lines
    const interval = setInterval(() => {
      setScanLines(prev => {
        const newLine = generateScanLine()
        return [...prev.slice(-7), newLine] // Keep max 8 lines
      })
    }, 2000 + Math.random() * 3000) // Every 2-5 seconds

    return () => clearInterval(interval)
  }, [])

  // Generate random pulses
  useEffect(() => {
    const generatePulse = () => {
      const newPulse = {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1,
      }
      
      setPulses(prev => [...prev.slice(-4), newPulse]) // Keep max 5 pulses
    }

    const interval = setInterval(generatePulse, 4000 + Math.random() * 6000) // Every 4-10 seconds
    
    return () => clearInterval(interval)
  }, [])

  const getScanLineMotion = (line: ScanLine) => {
    const baseMotion = {
      initial: { opacity: 0 },
      animate: { opacity: [0, 0.6, 0.8, 0.6, 0] },
      transition: {
        duration: line.duration,
        delay: line.delay,
        ease: "easeInOut",
      }
    }

    switch (line.direction) {
      case 'horizontal':
        return {
          ...baseMotion,
          animate: {
            ...baseMotion.animate,
            x: ['0vw', '100vw'],
          }
        }
      case 'vertical':
        return {
          ...baseMotion,
          animate: {
            ...baseMotion.animate,
            y: ['0vh', '100vh'],
          }
        }
      case 'diagonal-right':
        return {
          ...baseMotion,
          animate: {
            ...baseMotion.animate,
            x: ['0vw', '100vw'],
            y: ['0vh', '100vh'],
          }
        }
      case 'diagonal-left':
        return {
          ...baseMotion,
          animate: {
            ...baseMotion.animate,
            x: ['0vw', '-100vw'],
            y: ['0vh', '100vh'],
          }
        }
      default:
        return baseMotion
    }
  }

  const getScanLineStyle = (line: ScanLine) => {
    const baseStyle = {
      position: 'absolute' as const,
      background: `linear-gradient(90deg, transparent, ${line.color}40, ${line.color}80, ${line.color}40, transparent)`,
      boxShadow: `0 0 20px ${line.color}60, 0 0 40px ${line.color}30`,
      borderRadius: '2px',
      pointerEvents: 'none' as const,
      zIndex: 1000,
    }

    switch (line.direction) {
      case 'horizontal':
        return {
          ...baseStyle,
          width: '200px',
          height: '2px',
          left: `${line.startPosition.x}%`,
          top: `${line.startPosition.y}%`,
        }
      case 'vertical':
        return {
          ...baseStyle,
          width: '2px',
          height: '200px',
          left: `${line.startPosition.x}%`,
          top: `${line.startPosition.y}%`,
        }
      case 'diagonal-right':
      case 'diagonal-left':
        return {
          ...baseStyle,
          width: '300px',
          height: '2px',
          left: `${line.startPosition.x}%`,
          top: `${line.startPosition.y}%`,
          transform: line.direction === 'diagonal-right' ? 'rotate(45deg)' : 'rotate(-45deg)',
          transformOrigin: 'center',
        }
      default:
        return baseStyle
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1000 }}>
      {/* Scan Lines */}
      <AnimatePresence>
        {scanLines.map((line) => (
          <motion.div
            key={line.id}
            style={getScanLineStyle(line)}
            {...getScanLineMotion(line)}
          />
        ))}
      </AnimatePresence>

      {/* Pulse Effects */}
      <AnimatePresence>
        {pulses.map((pulse) => (
          <motion.div
            key={pulse.id}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${pulse.x}%`,
              top: `${pulse.y}%`,
              background: `radial-gradient(circle, ${NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]}80, transparent)`,
              boxShadow: `0 0 30px ${NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]}60`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0, 0.8, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 2,
              delay: pulse.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Grid Scan Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, transparent 98%, #00D4FF20 100%),
            linear-gradient(0deg, transparent 98%, #0066FF20 100%)
          `,
          backgroundSize: '100px 100px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}
