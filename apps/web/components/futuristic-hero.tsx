'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Hero3D } from './hero-3d'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'

export function FuturisticHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      {/* 3D Background */}
      <Hero3D />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 text-center text-white"
      >
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto mb-6"
        >
          {/* SmartVisitor Logo - Direct boven titel */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center mb-4"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              <Image
                src="/smartvisitor-logo.svg"
                alt="SmartVisitor Logo"
                width={384}
                height={384}
                className="w-full h-full object-contain filter brightness-0 invert opacity-95 hover:opacity-100 transition-opacity duration-500"
                priority
              />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6 leading-tight text-center">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange text-glow block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Onzichtbare technologie,
            </motion.span>
            <span className="text-white block mt-2">zichtbare resultaten</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-space text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Wat als je gasten worden herkend nog vóór ze iets zeggen? Geen badges, geen scanning, geen techniek in het zicht—alleen een unieke, persoonlijke ervaring vanaf het eerste moment.
          <br />
          <span className="text-electric-blue font-semibold mt-4 block">
            SmartVisitor brengt data tot leven, zonder dat je het voelt als data.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold text-lg rounded-lg overflow-hidden glow-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/demo'}
          >
            <span className="relative z-10 flex items-center">
              Vraag demo aan
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          
          <motion.button
            className="group px-8 py-4 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-dark-bg font-space font-semibold text-lg rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Bekijk demo
            </span>
          </motion.button>
        </motion.div>

        {/* Floating Data Visualization */}
        <motion.div
          className="relative"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        >
          <div className="flex justify-center space-x-8 opacity-60">
            {['SmartTag', 'Trigger', 'Core', 'Reactor'].map((item, index) => (
              <motion.div
                key={item}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-3 h-3 bg-neon-orange rounded-full mb-2 animate-pulse" />
                <span className="text-xs text-gray-400 font-space">{item}</span>
                {index < 3 && (
                  <div className="absolute top-1.5 left-full w-8 h-0.5 bg-gradient-to-r from-neon-orange to-transparent data-flow" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-electric-blue rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-3 bg-electric-blue rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-orange rounded-full opacity-10 blur-3xl" />
    </section>
  )
}
