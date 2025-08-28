'use client'

import { FuturisticHero } from '../components/futuristic-hero'
import { InteractiveFlow } from '../components/interactive-flow'
import { MinimalNav } from '../components/minimal-nav'
import RFIDWaves from '../components/layout/rfid-waves'
import RFIDScanningEffects from '../components/rfid-scanning-effects'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative">
      <RFIDWaves />
      <RFIDScanningEffects />
      <MinimalNav />
      <div className="relative z-10">
        <FuturisticHero />

        {/* Three Department Images Section */}
        <section className="py-16 bg-gradient-to-b from-slate-900 to-dark-bg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border-2 border-electric-blue hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-electric-blue/20">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/belevingen/FeelWelcome.svg"
                    alt="Feel Welcome Experience"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border-2 border-electric-blue hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-electric-blue/20">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/belevingen/MagicMirror.svg"
                    alt="Magic Mirror Experience"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border-2 border-electric-blue hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-electric-blue/20">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/belevingen/SmartVIP.svg"
                    alt="Smart VIP Experience"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <InteractiveFlow />

        {/* Target Audience Section */}
        <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 text-white">
                Who is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                  SmartVisitor
                </span>{' '}
                for?
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto font-space">
                From festivals to corporate events - SmartVisitor transforms every occasion into a unique experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Festival Organizers',
                  description: 'Innovative festival managers who want to offer their visitors a unique, personal experience without technical complexity.',
                  icon: '🎪',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Corporate Events',
                  description: 'Corporate event professionals who want to impress with cutting-edge technology and measurable results.',
                  icon: '🏢',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Cultural Institutions',
                  description: 'Museums and cultural centers that want to surprise their visitors with interactive, personalized experiences.',
                  icon: '🏛️',
                  gradient: 'from-green-500 to-teal-500'
                },
                {
                  title: 'Government & Municipalities',
                  description: 'Event coordinators who want to optimize safety and visitor management with smart technology.',
                  icon: '🏛️',
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Event Marketing Agencies',
                  description: 'Creative agencies that want to distinguish their clients with innovative, measurable event concepts.',
                  icon: '🎨',
                  gradient: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Hospitality & Venues',
                  description: 'Locations and venues that want to offer their guests a premium experience with seamless service.',
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
                How does it{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                  work
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto font-space">
                SmartVisitor works based on wireless recognition (RFID) and consists of four main components: Tag, Trigger, Core, and React.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Tag',
                  description: 'Smart RFID tags that guests carry, enabling seamless wireless recognition without any visible technology.',
                  icon: '🏷️'
                },
                {
                  title: 'Trigger',
                  description: 'Detection points that automatically recognize guests and activate corresponding actions. From short to long-range scanning.',
                  icon: '📡'
                },
                {
                  title: 'Core',
                  description: 'The central server that manages all system interactions, handles data processing and provides real-time visitor insights.',
                  icon: '🧠'
                },
                {
                  title: 'React',
                  description: 'Respond to a tag or action and generate output such as audio, visuals or notifications for a complete experience.',
                  icon: '⚡'
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

        {/* Three Departments Section */}
        <section className="py-20 bg-gradient-to-b from-dark-card to-dark-bg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border border-gray-700 hover:border-electric-blue transition-all duration-300 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎪</span>
                  </div>
                  <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                    Department 1
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Festival and event management solutions
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border border-gray-700 hover:border-electric-blue transition-all duration-300 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-orange to-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                    Department 2
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Corporate event technology
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-dark-card border border-gray-700 hover:border-electric-blue transition-all duration-300 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <h3 className="text-xl font-space font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                    Department 3
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Cultural and institutional experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6 text-white">
              Ready for the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
                future
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-space">
              Get a working demo or price indication within 24 hours
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold text-lg rounded-lg glow-effect hover:scale-105 transition-transform"
                onClick={() => window.location.href = '/demo'}
              >
                Request Demo
              </button>
              <button
                className="px-8 py-4 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-dark-bg font-space font-semibold text-lg rounded-lg transition-all"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}