import { SupportForm } from '../../components/support-form'
import { Card, CardContent, CardHeader, CardTitle } from '@smartvisitor/ui'
import { Clock, MessageCircle, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Support - SmartVisitor',
  description: 'Hulp nodig? Ons support team staat klaar om je te helpen met SmartVisitor.',
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Support & Contact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We staan klaar om je te helpen. Stel je vraag of neem direct contact met ons op.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <SupportForm />
          </div>

          {/* Contact Info & SLA */}
          <div className="space-y-6">
            {/* SLA Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Service Level Agreement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-sm">Demo aanvragen</div>
                    <div className="text-sm text-gray-600">Binnen 24 uur een werkende demo</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-sm">Support tickets</div>
                    <div className="text-sm text-gray-600">Binnen 4 uur reactie op werkdagen</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-sm">Event support</div>
                    <div className="text-sm text-gray-600">24/7 beschikbaar tijdens events</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Direct contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Telefoon</div>
                    <div className="text-sm text-gray-600">+31 (0)20 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">E-mail</div>
                    <div className="text-sm text-gray-600">support@smartvisitor.nl</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="font-semibold text-sm">Live chat</div>
                    <div className="text-sm text-gray-600">Beschikbaar op werkdagen</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Veelgestelde vragen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a 
                    href="/#faq" 
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → Heb ik een app nodig?
                  </a>
                  <a 
                    href="/#faq" 
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → Werkt dit met mijn CRM?
                  </a>
                  <a 
                    href="/#faq" 
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → Hoe snel staat een demo?
                  </a>
                  <a 
                    href="/#faq" 
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → Is dit schaalbaar?
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
