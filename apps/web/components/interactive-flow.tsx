'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Tag, Zap, Monitor, Database, ArrowRight } from 'lucide-react'

const flowSteps = [
  {
    id: 'smarttag',
    icon: Tag,
    title: 'SmartTag',
    description: 'Onzichtbare RFID-tag die gasten dragen',
    details: 'Geen batterij, geen app, gewoon automatische detectie',
    color: 'electric-blue',
    position: { x: 0, y: 0 }
  },
  {
    id: 'trigger',
    icon: Zap,
    title: 'SmartTrigger',
    description: 'Detecteert automatisch wanneer gasten zones betreden',
    details: 'Geen handeling van de gast nodig',
    color: 'neon-orange',
    position: { x: 300, y: 0 }
  },
  {
    id: 'core',
    icon: Database,
    title: 'SmartCore',
    description: 'Centraal systeem dat alle scenario\'s beheert',
    details: 'Real-time verwerking en intelligente beslissingen',
    color: 'electric-blue',
    position: { x: 600, y: 0 }
  },
  {
    id: 'reactor',
    icon: Monitor,
    title: 'SmartReactor',
    description: 'Schermen en systemen reageren automatisch',
    details: 'Persoonlijke content en interacties',
    color: 'neon-orange',
    position: { x: 900, y: 0 }
  }
]

interface FlowStepProps {
  step: typeof flowSteps[0]
  index: number
  isActive: boolean
}

function FlowStep({ step, index, isActive }: FlowStepProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, delay: index * 0.2 }
      })
    }
  }, [isInView, controls, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={controls}
      className="relative flex flex-col items-center"
    >
      {/* Connection Line */}
      {index < flowSteps.length - 1 && (
        <motion.div
          className="absolute top-16 left-full w-24 h-0.5 bg-gradient-to-r from-current to-transparent z-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          style={{ color: `hsl(var(--${step.color}))` }}
        />
      )}

      {/* Data Flow Animation */}
      {index < flowSteps.length - 1 && isActive && (
        <motion.div
          className="absolute top-16 left-full w-2 h-2 rounded-full z-10"
          style={{ backgroundColor: `hsl(var(--${step.color}))` }}
          animate={{
            x: [0, 96, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        />
      )}

      {/* Step Card */}
      <motion.div
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
          isActive 
            ? `border-${step.color} glow-effect bg-dark-card/80` 
            : 'border-gray-600 bg-dark-card/40'
        }`}
        whileHover={{ 
          scale: 1.05,
          boxShadow: `0 0 30px hsl(var(--${step.color}) / 0.4)`
        }}
      >
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
            isActive ? `bg-${step.color}` : 'bg-gray-600'
          }`}
          animate={isActive ? { 
            boxShadow: [`0 0 20px hsl(var(--${step.color}) / 0.3)`, `0 0 40px hsl(var(--${step.color}) / 0.6)`, `0 0 20px hsl(var(--${step.color}) / 0.3)`]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <step.icon className="h-8 w-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-space font-bold text-white mb-2 text-center">
          {step.title}
        </h3>
        <p className="text-gray-300 text-sm text-center mb-3">
          {step.description}
        </p>
        <p className="text-gray-400 text-xs text-center">
          {step.details}
        </p>

        {/* Step Number */}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-dark-bg border-2 border-current rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function InteractiveFlow() {
  const [activeStep, setActiveStep] = React.useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "-200px" })

  // Auto-advance through steps
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-card overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold mb-6 text-white">
            Hoe het{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
              werkt
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space">
            Vier componenten die samen een naadloze, futuristische ervaring creëren
          </p>
        </motion.div>

        {/* Interactive Flow */}
        <div ref={containerRef} className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:flex justify-center items-center space-x-24 mb-16">
            {flowSteps.map((step, index) => (
              <FlowStep
                key={step.id}
                step={step}
                index={index}
                isActive={index <= activeStep}
              />
            ))}
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8">
            {flowSteps.map((step, index) => (
              <FlowStep
                key={step.id}
                step={step}
                index={index}
                isActive={index <= activeStep}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {flowSteps.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= activeStep ? 'bg-electric-blue' : 'bg-gray-600'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-400 bg-dark-card px-6 py-3 rounded-full border border-gray-600">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
            <span className="font-space">Real-time data flow</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
