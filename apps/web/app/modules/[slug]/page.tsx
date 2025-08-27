import { getModule, getModules } from '../../../lib/api'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, formatPrice } from '@smartvisitor/ui'
import { ArrowLeft, Check, ArrowRight, Zap, Monitor, Database } from 'lucide-react'
import { notFound } from 'next/navigation'

interface ModulePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const modules = await getModules()
  return modules.map((module: any) => ({
    slug: module.slug,
  }))
}

export async function generateMetadata({ params }: ModulePageProps) {
  try {
    const module = await getModule(params.slug)
    return {
      title: `${module.name} - SmartVisitor Module`,
      description: module.summary,
    }
  } catch {
    return {
      title: 'Module niet gevonden - SmartVisitor',
    }
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  let module: any
  try {
    module = await getModule(params.slug)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                Module
              </Badge>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {module.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {module.summary}
              </p>
            </div>

            {module.description && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Beschrijving</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {module.features.map((feature: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inputs/Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-500" />
                    Inputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.inputs.map((input: any, index: number) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2 text-green-500" />
                    Outputs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.outputs.map((output: any, index: number) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Compatible Experiences */}
            {module.compatibleExperiences.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-500" />
                    Compatibele Ervaringen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {module.compatibleExperiences.map((experience: any, index: number) => (
                      <Badge key={index} variant="outline">
                        {experience}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(module.priceCents)}
                  </div>
                  {module.priceCents && (
                    <div className="text-sm text-muted-foreground mb-4">
                      excl. BTW
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    window.location.href = `/demo?module=${module.slug}`
                  }}
                >
                  Demo aanvragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/pricing'
                  }}
                >
                  Bekijk alle prijzen
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3 text-sm">
                    Waarom deze module?
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Binnen 24 uur werkende demo
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Modulair uitbreidbaar
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      24/7 support tijdens events
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Integratie met bestaande systemen
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
