import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@smartvisitor/ui'
import { Users, Building, Sparkles, ArrowRight, Check } from 'lucide-react'

export const metadata = {
  title: 'Cases - SmartVisitor',
  description: 'Ontdek hoe SmartVisitor wordt ingezet bij verschillende soorten events. Van corporate events tot product launches.',
}

const cases = [
  {
    id: 'corporate-event',
    icon: Building,
    title: 'Corporate Event - Tech Conference',
    subtitle: '500 deelnemers, 2 dagen',
    description: 'Een grote tech conference met automatische check-in, netwerking faciliteiten en VIP behandeling voor sprekers.',
    challenge: 'Lange wachtrijen bij registratie, moeilijk netwerken tussen deelnemers, en onduidelijke VIP behandeling.',
    solution: [
      'SmartTags voor alle deelnemers bij aankomst',
      'Automatische check-in zonder wachtrijen',
      'Smart-Connector voor geautomatiseerd netwerken',
      'VIP Access module voor sprekers en sponsors',
      'Real-time analytics dashboard voor organisatoren'
    ],
    results: [
      '90% minder wachttijd bij registratie',
      '3x meer networking connecties',
      '95% tevredenheid over VIP service',
      'Complete event analytics beschikbaar'
    ],
    modules: ['Core', 'Interactie/Ontvangst', 'VIP Access', 'Smart-Connector'],
    color: 'blue',
  },
  {
    id: 'product-launch',
    icon: Sparkles,
    title: 'Product Launch - Fashion Brand',
    subtitle: '200 influencers & media',
    description: 'Exclusieve product launch met interactieve ervaringen, automatische content creatie en gepersonaliseerde goodiebags.',
    challenge: 'Creëren van buzz op social media, persoonlijke ervaring voor elke gast, en efficiënte content distributie.',
    solution: [
      'SmartPhotobooth met automatische triggers',
      'Magic Mirror voor interactieve product ervaring',
      'Smart-Goodiebag met gepersonaliseerde selectie',
      'Automatische social media sharing',
      'Real-time engagement tracking'
    ],
    results: [
      '500+ social media posts gegenereerd',
      '85% van gasten deelde content',
      '100% gepersonaliseerde goodiebags',
      '40% toename in brand engagement'
    ],
    modules: ['Core', 'SmartPhotobooth', 'Magic Mirror', 'Smart-Goodiebag'],
    color: 'purple',
  },
  {
    id: 'exclusive-gala',
    icon: Users,
    title: 'Exclusive Gala - Charity Event',
    subtitle: '150 VIP gasten',
    description: 'High-end charity gala met beveiligde toegang, premium service en naadloze garderobe ervaring.',
    challenge: 'Discrete maar effectieve beveiliging, premium service niveau, en vlotte garderobe afhandeling.',
    solution: [
      'Beveiliging module voor toegangscontrole',
      'Smart-Waiter voor discrete service',
      'Garderobe module met automatische herkenning',
      'VIP zones met exclusieve toegang',
      'Personeel module voor staff coördinatie'
    ],
    results: [
      '100% beveiligde toegang zonder incidenten',
      '2 minuten gemiddelde garderobe tijd',
      '98% gast tevredenheid score',
      '€50.000 extra donaties door smooth experience'
    ],
    modules: ['Core', 'Beveiliging', 'Garderobe', 'VIP Access', 'Smart-Waiter', 'Personeel'],
    color: 'green',
  },
]

const colorClasses = {
  blue: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-800',
  },
  purple: {
    icon: 'text-purple-500',
    bg: 'bg-purple-50',
    badge: 'bg-purple-100 text-purple-800',
  },
  green: {
    icon: 'text-green-500',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-800',
  },
}

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Success Cases
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ontdek hoe SmartVisitor wordt ingezet bij verschillende soorten events en welke resultaten dat oplevert.
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <Card key={caseStudy.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Header */}
                <div className="lg:col-span-3 border-b pb-6">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 ${colorClasses[caseStudy.color as keyof typeof colorClasses].bg} rounded-full flex items-center justify-center`}>
                        <caseStudy.icon className={`h-8 w-8 ${colorClasses[caseStudy.color as keyof typeof colorClasses].icon}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{caseStudy.title}</CardTitle>
                        <p className="text-muted-foreground">{caseStudy.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.description}
                    </p>
                  </CardHeader>
                </div>

                {/* Challenge */}
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg mb-4 text-red-600">Uitdaging</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </CardContent>

                {/* Solution */}
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg mb-4 text-blue-600">Oplossing</h3>
                  <ul className="space-y-2">
                    {caseStudy.solution.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Results */}
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg mb-4 text-green-600">Resultaten</h3>
                  <ul className="space-y-2 mb-6">
                    {caseStudy.results.map((result, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Gebruikte modules:</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.modules.map((module, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className={colorClasses[caseStudy.color as keyof typeof colorClasses].badge}
                        >
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Klaar voor jouw eigen success story?
              </h2>
              <p className="text-gray-600 mb-6">
                Laat ons zien hoe SmartVisitor jouw event naar het volgende niveau kan tillen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.location.href = '/demo'}
                >
                  Vraag demo aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/pricing'}
                >
                  Bekijk prijzen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
