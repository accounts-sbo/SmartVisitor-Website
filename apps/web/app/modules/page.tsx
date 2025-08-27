import { getModules } from '../../lib/api'
import { ModuleCard } from '@smartvisitor/ui'

export const metadata = {
  title: 'Modules - SmartVisitor',
  description: 'Ontdek alle SmartVisitor modules en hun mogelijkheden. Van basis functionaliteit tot geavanceerde ervaringen.',
}

export default async function ModulesPage() {
  const modules = await getModules()

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            SmartVisitor Modules
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modulair systeem dat zich aanpast aan jouw event. Kies de modules die perfect passen bij jouw behoeften.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onDemoClick={(slug) => {
                window.location.href = `/demo?module=${slug}`
              }}
              onLearnMore={(slug) => {
                window.location.href = `/modules/${slug}`
              }}
            />
          ))}
        </div>

        {modules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Geen modules beschikbaar
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Niet zeker welke modules je nodig hebt?
            </h2>
            <p className="text-gray-600 mb-6">
              Onze experts helpen je graag bij het samenstellen van het perfecte pakket voor jouw event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/demo'}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Vraag advies aan
              </button>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Bekijk alle prijzen
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
