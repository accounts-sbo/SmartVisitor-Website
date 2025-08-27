'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Tag, Zap, Monitor, Database } from 'lucide-react'

const steps = [
  {
    icon: Tag,
    title: 'SmartTags',
    description: 'Onzichtbare RFID-tags die gasten dragen. Geen batterij, geen app, gewoon automatische detectie.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'SmartTriggers',
    description: 'Detecteren automatisch wanneer gasten zones betreden. Geen handeling van de gast nodig.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Monitor,
    title: 'SmartReactors',
    description: 'Schermen, audio en andere systemen reageren automatisch op de aanwezigheid van gasten.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Database,
    title: 'SmartCore',
    description: 'Centraal systeem dat alle scenario\'s beheert en data verzamelt voor inzichten.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Hoe het werkt
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vier componenten die samen een naadloze ervaring creëren
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Real-time data flow</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
