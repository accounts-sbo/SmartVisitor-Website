'use client'

import { FuturisticHero } from '../components/futuristic-hero'
import { InteractiveFlow } from '../components/interactive-flow'
import { FuturisticNav } from '../components/futuristic-nav'

export default function HomePage() {
  return (
    <>
      <FuturisticNav />
      <main className="bg-dark-bg">
        <FuturisticHero />
        <InteractiveFlow />

        {/* Target Audience Section */}
        <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 text-white">
                Voor wie is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                  SmartVisitor
                </span>{' '}
                bedoeld?
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto font-space">
                Van festivals tot zakelijke events - SmartVisitor transformeert elke gelegenheid tot een unieke ervaring
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Festivalorganisatoren',
                  description: 'Innovatieve festivalmanagers die hun bezoekers een unieke, persoonlijke ervaring willen bieden zonder technische complexiteit.',
                  icon: '🎪',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Zakelijke Events',
                  description: 'Corporate event professionals die indruk willen maken met cutting-edge technologie en meetbare resultaten.',
                  icon: '🏢',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Culturele Instellingen',
                  description: 'Musea en culturele centra die hun bezoekers willen verrassen met interactieve, gepersonaliseerde ervaringen.',
                  icon: '🏛️',
                  gradient: 'from-green-500 to-teal-500'
                },
                {
                  title: 'Overheid & Gemeenten',
                  description: 'Evenementencoördinatoren die veiligheid en bezoekersbeheer willen optimaliseren met slimme technologie.',
                  icon: '🏛️',
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Event Marketing Bureaus',
                  description: 'Creatieve bureaus die hun klanten willen onderscheiden met innovatieve, meetbare event concepten.',
                  icon: '🎨',
                  gradient: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Hospitality & Venues',
                  description: 'Locaties en venues die hun gasten een premium ervaring willen bieden met naadloze service.',
                  icon: '🏨',
                  gradient: 'from-yellow-500 to-orange-500'
                }
              ].map((audience, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-dark-bg rounded-2xl border border-gray-700 hover:border-electric-blue transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{audience.icon}</div>
                    <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                      {audience.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {audience.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-dark-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 text-white">
                Modulair{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                  Interactiesysteem
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto font-space">
                SmartVisitor werkt op basis van draadloze herkenning (RFID) en bestaat uit drie hoofdcomponenten: SmartTriggers, SmartReactors en de SmartVisitor Core.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'SmartTrigger',
                  description: 'Detectiepunten die gasten automatisch herkennen en bijbehorende acties activeren. Van korte- tot langeafstandsscan.',
                  icon: '📡'
                },
                {
                  title: 'SmartReactor',
                  description: 'Reageren op een tag of actie en genereren output zoals audio, beeld of notificaties voor een complete ervaring.',
                  icon: '⚡'
                },
                {
                  title: 'SmartVisitor Core',
                  description: 'De centrale server die alle systeeminteracties beheert, dataverwerking verzorgt en realtime bezoekersinzichten biedt.',
                  icon: '🧠'
                },
                {
                  title: 'Onzichtbare Technologie',
                  description: 'Geen apps, geen scanning, geen zichtbare techniek. Alleen een naadloze, persoonlijke ervaring.',
                  icon: '👻'
                },
                {
                  title: 'Voor Entertainment',
                  description: 'Van festivals tot zakelijke events - SmartVisitor maakt elk evenement uniek en meetbaar.',
                  icon: '🎭'
                },
                {
                  title: 'Veiligheid & Inzicht',
                  description: 'Realtime bezoekersinzichten en toegangscontrole voor optimale veiligheid en gemak.',
                  icon: '🔒'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-dark-bg rounded-2xl border border-gray-700 hover:border-electric-blue transition-all duration-300 hover:glow-effect"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 font-space">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 text-white">
              Klaar voor de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                toekomst
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-space">
              Binnen 24 uur een werkende demo of prijsindicatie
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold text-lg rounded-lg glow-effect hover:scale-105 transition-transform"
                onClick={() => window.location.href = '/demo'}
              >
                Vraag demo aan
              </button>
              <button
                className="px-8 py-4 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-dark-bg font-space font-semibold text-lg rounded-lg transition-all"
                onClick={() => window.location.href = '/pricing'}
              >
                Bekijk prijzen
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
