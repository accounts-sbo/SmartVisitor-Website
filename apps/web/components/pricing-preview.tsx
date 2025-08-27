'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, formatPrice } from '@smartvisitor/ui'
import { Package } from '../lib/api'
import { Check, ArrowRight } from 'lucide-react'

interface PricingPreviewProps {
  packages: Package[]
  onViewAll?: () => void
  onDemoClick?: (packageSlug: string) => void
}

export function PricingPreview({ packages, onViewAll, onDemoClick }: PricingPreviewProps) {
  // Show top 3 packages
  const featuredPackages = packages.slice(0, 3)

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
            Pakketten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kies het pakket dat bij jouw event past
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={index === 1 ? 'md:scale-105' : ''}
            >
              <Card className={`h-full ${index === 1 ? 'border-primary shadow-xl' : 'hover:shadow-lg'} transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  {index === 1 && (
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                      POPULAIR
                    </div>
                  )}
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(pkg.priceCents)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{pkg.features.length - 4} meer features
                      </li>
                    )}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={index === 1 ? 'default' : 'outline'}
                    onClick={() => onDemoClick?.(pkg.slug)}
                  >
                    Demo aanvragen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" onClick={onViewAll}>
            Bekijk alle prijzen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
