'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@smartvisitor/ui'
import { submitTicket, type TicketFormData } from '../lib/api'
import { Mail, MessageSquare, AlertCircle } from 'lucide-react'

interface SupportFormProps {
  className?: string
}

export function SupportForm({ className }: SupportFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await submitTicket(formData)
      setSubmitted(true)
    } catch (error) {
      console.error('Support ticket submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
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
            <h3 className="text-xl font-semibold mb-2">Ticket aangemaakt!</h3>
            <p className="text-muted-foreground mb-4">
              We hebben je vraag ontvangen en nemen zo snel mogelijk contact met je op.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Nieuwe vraag stellen
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
            <Mail className="h-5 w-5" />
            <span>Support ticket</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Stel je vraag en we helpen je graag verder
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Onderwerp *</label>
              <Input
                required
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Korte beschrijving van je vraag"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioriteit</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="low">Laag</option>
                <option value="normal">Normaal</option>
                <option value="high">Hoog</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bericht *</label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Beschrijf je vraag of probleem zo gedetailleerd mogelijk..."
                rows={5}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Versturen...' : 'Ticket aanmaken'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
