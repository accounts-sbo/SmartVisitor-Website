import { Card, CardContent, CardHeader, CardTitle } from '@smartvisitor/ui'

export const metadata = {
  title: 'Privacy & Voorwaarden - SmartVisitor',
  description: 'Privacy policy en algemene voorwaarden van SmartVisitor.',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Privacy & Voorwaarden
          </h1>
          <p className="text-xl text-gray-600">
            Transparantie over hoe we omgaan met jouw gegevens
          </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <p className="text-sm text-muted-foreground">
                Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
              </p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>1. Gegevensverzameling</h3>
              <p>
                SmartVisitor verzamelt alleen de gegevens die nodig zijn voor het leveren van onze diensten:
              </p>
              <ul>
                <li>Contactgegevens (naam, e-mail, telefoon) voor demo aanvragen</li>
                <li>Bedrijfsgegevens voor offertes en facturatie</li>
                <li>Event data voor service levering</li>
                <li>Technische logs voor support en verbetering</li>
              </ul>

              <h3>2. Gebruik van gegevens</h3>
              <p>We gebruiken jouw gegevens voor:</p>
              <ul>
                <li>Het leveren van SmartVisitor diensten</li>
                <li>Communicatie over je account en diensten</li>
                <li>Support en technische assistentie</li>
                <li>Verbetering van onze producten en diensten</li>
              </ul>

              <h3>3. Gegevens delen</h3>
              <p>
                We delen jouw gegevens niet met derden, behalve:
              </p>
              <ul>
                <li>Met jouw expliciete toestemming</li>
                <li>Voor wettelijke verplichtingen</li>
                <li>Met vertrouwde service providers (onder strikte contracten)</li>
              </ul>

              <h3>4. Beveiliging</h3>
              <p>
                We implementeren passende technische en organisatorische maatregelen om jouw gegevens te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging.
              </p>

              <h3>5. Jouw rechten</h3>
              <p>Onder de AVG heb je recht op:</p>
              <ul>
                <li>Inzage in jouw gegevens</li>
                <li>Rectificatie van onjuiste gegevens</li>
                <li>Verwijdering van gegevens</li>
                <li>Beperking van verwerking</li>
                <li>Gegevensoverdraagbaarheid</li>
                <li>Bezwaar tegen verwerking</li>
              </ul>

              <h3>6. Contact</h3>
              <p>
                Voor vragen over deze privacy policy of het uitoefenen van je rechten, neem contact op via:
                <br />
                E-mail: privacy@smartvisitor.nl
                <br />
                Telefoon: +31 (0)20 123 4567
              </p>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card>
            <CardHeader>
              <CardTitle>Algemene Voorwaarden</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>1. Toepasselijkheid</h3>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen SmartVisitor en opdrachtgevers betreffende de levering van SmartVisitor diensten.
              </p>

              <h3>2. Dienstverlening</h3>
              <p>SmartVisitor levert:</p>
              <ul>
                <li>RFID-gebaseerde event technologie</li>
                <li>Software en hardware voor event management</li>
                <li>Technische support tijdens events</li>
                <li>Configuratie en setup diensten</li>
              </ul>

              <h3>3. Verplichtingen opdrachtgever</h3>
              <p>De opdrachtgever zorgt voor:</p>
              <ul>
                <li>Tijdige verstrekking van benodigde informatie</li>
                <li>Toegang tot event locatie voor setup</li>
                <li>Stabiele internetverbinding</li>
                <li>Naleving van veiligheidsvoorschriften</li>
              </ul>

              <h3>4. Prijzen en betaling</h3>
              <p>
                Alle prijzen zijn exclusief BTW. Betaling geschiedt binnen 30 dagen na factuurdatum. Bij te late betaling zijn wij gerechtigd wettelijke rente in rekening te brengen.
              </p>

              <h3>5. Aansprakelijkheid</h3>
              <p>
                Onze aansprakelijkheid is beperkt tot het factuurbedrag van de betreffende opdracht. We zijn niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
              </p>

              <h3>6. Force majeure</h3>
              <p>
                Bij overmacht zijn partijen niet gehouden tot nakoming van hun verplichtingen. Onder overmacht verstaan we onder andere: natuurrampen, oorlog, terrorisme, pandemieën, en overheidsmaatregelen.
              </p>

              <h3>7. Toepasselijk recht</h3>
              <p>
                Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Cookie Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Wat zijn cookies?</h3>
              <p>
                Cookies zijn kleine tekstbestanden die op jouw apparaat worden opgeslagen wanneer je onze website bezoekt.
              </p>

              <h3>Welke cookies gebruiken we?</h3>
              <ul>
                <li><strong>Functionele cookies:</strong> Voor het goed functioneren van de website</li>
                <li><strong>Analytische cookies:</strong> Voor het meten van websitegebruik (geanonimiseerd)</li>
                <li><strong>Marketing cookies:</strong> Alleen met jouw toestemming</li>
              </ul>

              <h3>Cookies beheren</h3>
              <p>
                Je kunt cookies uitschakelen in je browserinstellingen. Let op: dit kan de functionaliteit van onze website beperken.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
