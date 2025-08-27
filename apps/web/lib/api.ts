const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'

export interface Module {
  id: string
  slug: string
  name: string
  summary: string
  description?: string
  priceCents: number | null
  features: string[]
  inputs: string[]
  outputs: string[]
  compatibleExperiences: string[]
}

export interface Package {
  id: string
  slug: string
  name: string
  items: string[]
  priceCents: number | null
  description?: string
  features: string[]
}

export interface Item {
  id: string
  type: string
  name: string
  unit?: string
  priceCents: number | null
  metadata?: any
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
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

export interface TicketFormData {
  email: string
  subject: string
  message: string
  priority?: 'low' | 'normal' | 'high'
}

// API functions
export async function submitDemo(data: DemoFormData): Promise<void> {
  const response = await fetch(`${API_BASE}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit demo request')
  }
}

export async function submitTicket(data: TicketFormData): Promise<void> {
  const response = await fetch(`${API_BASE}/api/support/ticket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit support ticket')
  }
}

export async function getPricing(): Promise<{
  items: Item[]
  modules: Module[]
  packages: Package[]
}> {
  const response = await fetch(`${API_BASE}/api/pricing`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error('Failed to fetch pricing data')
  }

  const data = await response.json()

  // Parse JSON strings back to arrays for SQLite compatibility
  return {
    items: data.items.map((item: any) => ({
      ...item,
      metadata: typeof item.metadata === 'string' ? JSON.parse(item.metadata || '{}') : item.metadata,
    })),
    modules: data.modules.map((module: any) => ({
      ...module,
      features: typeof module.features === 'string' ? JSON.parse(module.features) : module.features,
      inputs: typeof module.inputs === 'string' ? JSON.parse(module.inputs) : module.inputs,
      outputs: typeof module.outputs === 'string' ? JSON.parse(module.outputs) : module.outputs,
      compatibleExperiences: typeof module.compatibleExperiences === 'string' ? JSON.parse(module.compatibleExperiences) : module.compatibleExperiences,
    })),
    packages: data.packages.map((pkg: any) => ({
      ...pkg,
      items: typeof pkg.items === 'string' ? JSON.parse(pkg.items) : pkg.items,
      features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features,
    })),
  }
}

export async function getModules(): Promise<Module[]> {
  const response = await fetch(`${API_BASE}/api/modules`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch modules')
  }

  const modules = await response.json()

  // Parse JSON strings back to arrays for SQLite compatibility
  return modules.map((module: any) => ({
    ...module,
    features: typeof module.features === 'string' ? JSON.parse(module.features) : module.features,
    inputs: typeof module.inputs === 'string' ? JSON.parse(module.inputs) : module.inputs,
    outputs: typeof module.outputs === 'string' ? JSON.parse(module.outputs) : module.outputs,
    compatibleExperiences: typeof module.compatibleExperiences === 'string' ? JSON.parse(module.compatibleExperiences) : module.compatibleExperiences,
  }))
}

export async function getModule(slug: string): Promise<Module> {
  const response = await fetch(`${API_BASE}/api/modules/${slug}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch module')
  }

  const module = await response.json()

  // Parse JSON strings back to arrays for SQLite compatibility
  return {
    ...module,
    features: typeof module.features === 'string' ? JSON.parse(module.features) : module.features,
    inputs: typeof module.inputs === 'string' ? JSON.parse(module.inputs) : module.inputs,
    outputs: typeof module.outputs === 'string' ? JSON.parse(module.outputs) : module.outputs,
    compatibleExperiences: typeof module.compatibleExperiences === 'string' ? JSON.parse(module.compatibleExperiences) : module.compatibleExperiences,
  }
}

export async function getFAQ(): Promise<FAQ[]> {
  const response = await fetch(`${API_BASE}/api/faq`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch FAQ')
  }

  return response.json()
}
