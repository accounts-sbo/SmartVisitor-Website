'use client'

import { DemoForm, type DemoFormData } from '@smartvisitor/ui'
import { submitDemo } from '../../lib/api'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function DemoPageContent() {
  const searchParams = useSearchParams()
  const moduleParam = searchParams.get('module')
  const packageParam = searchParams.get('package')

  const handleSubmit = async (data: DemoFormData) => {
    // Pre-fill interest based on URL params
    const interest = [...data.interest]
    if (moduleParam && !interest.includes(moduleParam)) {
      interest.push(moduleParam)
    }
    if (packageParam && !interest.includes(packageParam)) {
      interest.push(packageParam)
    }

    await submitDemo({
      ...data,
      interest,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Vraag een demo aan
            </h1>
            <p className="text-xl text-gray-600">
              Binnen 24 uur een werkende demo of prijsindicatie
            </p>
          </div>
          
          <DemoForm onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="h-96 bg-white rounded-lg animate-pulse" />
          </div>
        </div>
      </main>
    }>
      <DemoPageContent />
    </Suspense>
  )
}
