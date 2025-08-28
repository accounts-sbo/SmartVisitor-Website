'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg" />
      


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
            <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] flex items-center justify-center">
              <Image
                src="/smartvisitor-logo.svg"
                alt="SmartVisitor Logo"
                width={512}
                height={512}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
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
              Invisible technology,
            </motion.span>
            <span className="text-white block mt-2">memorable experiences</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-space text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          What if your guests are recognized before they even speak? No badges, no scanning, no visible technology—just a unique, personalized experience from the very first moment.
          <br />
          <span className="text-electric-blue font-semibold mt-4 block">
            SmartVisitor brings data to life, without feeling like data.
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
              Request Demo
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
              View Demo
            </span>
          </motion.button>
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
