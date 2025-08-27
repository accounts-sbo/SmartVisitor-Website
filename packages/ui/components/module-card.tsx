'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { formatPrice } from '../lib/utils'
import { ArrowRight, Check } from 'lucide-react'

interface ModuleCardProps {
  module: {
    id: string
    slug: string
    name: string
    summary: string
    priceCents: number | null
    features: string[]
  }
  onDemoClick?: (slug: string) => void
  onLearnMore?: (slug: string) => void
}

export function ModuleCard({ module, onDemoClick, onLearnMore }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              Module
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(module.priceCents)}
              </div>
              {module.priceCents && (
                <div className="text-xs text-muted-foreground">
                  excl. BTW
                </div>
              )}
            </div>
          </div>
          <CardTitle className="text-xl mb-2">{module.name}</CardTitle>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {module.summary}
          </p>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-900 mb-3">
              Belangrijkste features:
            </h4>
            {module.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
            {module.features.length > 3 && (
              <div className="text-xs text-muted-foreground mt-2">
                +{module.features.length - 3} meer features
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={() => onDemoClick?.(module.slug)}
          >
            Vraag demo aan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onLearnMore?.(module.slug)}
          >
            Meer informatie
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
