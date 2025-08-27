'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, formatPrice } from '@smartvisitor/ui'
import { getPricing, type Item, type Module, type Package } from '../../lib/api'
import { Filter, Search } from 'lucide-react'

interface PricingData {
  items: Item[]
  modules: Module[]
  packages: Package[]
}

export default function PricingPage() {
  const [data, setData] = useState<PricingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'items' | 'modules' | 'packages' | 'experiences'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pricingData = await getPricing()
        setData(pricingData)
      } catch (error) {
        console.error('Failed to fetch pricing data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Fout bij laden van prijzen
          </h1>
          <Button onClick={() => window.location.reload()}>
            Probeer opnieuw
          </Button>
        </div>
      </main>
    )
  }

  // Filter and search logic
  const filteredItems = () => {
    let allItems: Array<Item | Module | Package> = []
    
    if (filter === 'all' || filter === 'items') {
      allItems = [...allItems, ...data.items.filter(item => item.type !== 'EXPERIENCE')]
    }
    if (filter === 'all' || filter === 'experiences') {
      allItems = [...allItems, ...data.items.filter(item => item.type === 'EXPERIENCE')]
    }
    if (filter === 'all' || filter === 'modules') {
      allItems = [...allItems, ...data.modules]
    }
    if (filter === 'all' || filter === 'packages') {
      allItems = [...allItems, ...data.packages]
    }

    if (searchTerm) {
      allItems = allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return allItems
  }

  const getItemType = (item: Item | Module | Package): string => {
    if ('type' in item) {
      switch (item.type) {
        case 'CORE_LICENSE': return 'Licentie'
        case 'TRIGGER': return 'Trigger'
        case 'REACTOR': return 'Reactor'
        case 'TAG_BUNDLE': return 'SmartTags'
        case 'EXPERIENCE': return 'Ervaring'
        default: return 'Item'
      }
    }
    if ('slug' in item && 'features' in item) {
      return 'Module'
    }
    return 'Pakket'
  }

  const getItemPrice = (item: Item | Module | Package): number | null => {
    return item.priceCents
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Prijzen & Pakketten
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparante prijzen voor alle SmartVisitor modules en pakketten
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Alles' },
              { key: 'packages', label: 'Pakketten' },
              { key: 'modules', label: 'Modules' },
              { key: 'experiences', label: 'Ervaringen' },
              { key: 'items', label: 'Losse items' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(key as any)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems().map((item, index) => (
            <Card key={`${getItemType(item)}-${item.id}`} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">
                    {getItemType(item)}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(getItemPrice(item))}
                    </div>
                    {getItemPrice(item) && (
                      <div className="text-xs text-muted-foreground">
                        excl. BTW
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                {'summary' in item && (
                  <p className="text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                )}
                {'description' in item && item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {'features' in item && item.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      const itemName = encodeURIComponent(item.name)
                      window.location.href = `/demo?interest=${itemName}`
                    }}
                  >
                    Demo aanvragen
                  </Button>
                  {'slug' in item && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        window.location.href = `/modules/${item.slug}`
                      }}
                    >
                      Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Geen resultaten gevonden voor "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
