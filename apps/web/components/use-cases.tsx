'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@smartvisitor/ui'
import { Users, Shield, Sparkles } from 'lucide-react'

const useCases = [
  {
    icon: Users,
    title: 'Corporate Events',
    description: 'Automatische check-in, gepersonaliseerde welkom, en naadloze netwerking voor zakelijke bijeenkomsten.',
    features: ['Automatische registratie', 'VIP herkenning', 'Netwerk facilitatie'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Sparkles,
    title: 'Product Launches',
    description: 'Interactieve ervaringen die producten tot leven brengen met gepersonaliseerde demonstraties.',
    features: ['Product interacties', 'Demo triggers', 'Lead capture'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Shield,
    title: 'Exclusive Events',
    description: 'VIP behandeling en beveiligde toegang voor high-end events en private gatherings.',
    features: ['VIP zones', 'Beveiligde toegang', 'Premium service'],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
]

export function UseCases() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Toepassingen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Van corporate events tot product launches - SmartVisitor past zich aan elke situatie aan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${useCase.bgColor} rounded-full flex items-center justify-center mb-6`}>
                    <useCase.icon className={`h-8 w-8 ${useCase.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
