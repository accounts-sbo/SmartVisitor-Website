'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Calendar, Users, Building, Mail, Phone, MessageSquare } from 'lucide-react'

interface DemoFormProps {
  onSubmit?: (data: DemoFormData) => Promise<void>
  className?: string
}

export interface DemoFormData {
  name: string
  email: string
  company?: string
  phone?: string
  eventDate?: string
  attendees?: number
  interest: string[]
  notes?: string
}

export function DemoForm({ onSubmit, className }: DemoFormProps) {
  const [formData, setFormData] = useState<DemoFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    eventDate: '',
    attendees: undefined,
    interest: [],
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const interestOptions = [
    'Core Module',
    'Garderobe',
    'Interactie/Ontvangst',
    'Zone Management',
    'VIP Access',
    'Beveiliging',
    'Personeel Management',
    'Belevingsconcepten',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubmit) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.includes(option)
        ? prev.interest.filter(i => i !== option)
        : [...prev.interest, option]
    }))
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Demo aangevraagd!</h3>
            <p className="text-muted-foreground mb-4">
              Bedankt voor je interesse. We nemen binnen 24 uur contact met je op voor een werkende demo.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Nieuwe aanvraag
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Vraag een demo aan</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Binnen 24 uur een werkende demo of prijsindicatie
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Naam *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Je volledige naam"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="je@bedrijf.nl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrijf</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Bedrijfsnaam"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefoon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+31 6 12345678"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event datum</label>
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Aantal gasten</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={formData.attendees || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value ? parseInt(e.target.value) : undefined }))}
                    placeholder="Geschat aantal"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Interesse in modules</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {interestOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interest.includes(option)}
                      onChange={() => handleInterestChange(option)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Aanvullende opmerkingen</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Vertel ons meer over je event of specifieke wensen..."
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Versturen...' : 'Demo aanvragen'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
