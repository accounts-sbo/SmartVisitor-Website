"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // Clear existing data
    await prisma.ticket.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.faq.deleteMany();
    await prisma.package.deleteMany();
    await prisma.module.deleteMany();
    await prisma.item.deleteMany();
    // Seed Items (Losse items)
    const items = [
        {
            type: 'CORE_LICENSE',
            name: 'SmartCore licentie',
            priceCents: 9500,
        },
        {
            type: 'TRIGGER',
            name: 'SmartTrigger (per stuk)',
            priceCents: 19500,
        },
        {
            type: 'REACTOR',
            name: 'SmartReactor (per stuk)',
            priceCents: 14500,
        },
    ];
    for (const item of items) {
        await prisma.item.create({ data: item });
    }
    // Seed SmartTags bundels
    const tagBundles = [
        {
            type: 'TAG_BUNDLE',
            name: 'SmartTags (50)',
            unit: '50 stuks',
            priceCents: 12500,
        },
        {
            type: 'TAG_BUNDLE',
            name: 'SmartTags (100)',
            unit: '100 stuks',
            priceCents: 19500,
        },
        {
            type: 'TAG_BUNDLE',
            name: 'SmartTags (300)',
            unit: '300 stuks',
            priceCents: 49500,
        },
        {
            type: 'TAG_BUNDLE',
            name: 'SmartTags (500)',
            unit: '500 stuks',
            priceCents: 75000,
        },
        {
            type: 'TAG_BUNDLE',
            name: 'SmartTags (1000)',
            unit: '1000 stuks',
            priceCents: null,
            metadata: JSON.stringify({ price: 'Op aanvraag' }),
        },
    ];
    for (const bundle of tagBundles) {
        await prisma.item.create({ data: bundle });
    }
    console.log('✅ Items and bundles seeded');
    // Seed Modules
    const modules = [
        {
            slug: 'core',
            name: 'Core',
            summary: 'Basis SmartVisitor systeem met SmartCore licentie',
            description: 'Het hart van SmartVisitor. Beheert alle SmartTags, SmartTriggers en SmartReactors. Inclusief dashboard en basis scenario\'s.',
            priceCents: 69500,
            features: JSON.stringify(['SmartCore dashboard', 'Tag management', 'Basis scenario\'s', 'Real-time monitoring']),
            inputs: JSON.stringify(['SmartTag detectie', 'Manual triggers']),
            outputs: JSON.stringify(['Data logging', 'Basic notifications']),
            compatibleExperiences: JSON.stringify(['smart-entrance', 'smart-info']),
        },
        {
            slug: 'garderobe',
            name: 'Garderobe (SmartWardrobe)',
            summary: 'Automatische garderobe met SmartTag koppeling',
            description: 'Volledig geautomatiseerde garderobe. Gasten krijgen automatisch hun jas terug bij vertrek.',
            priceCents: 125000,
            features: ['Automatische jas-tag koppeling', 'Vertrek detectie', 'Staff notificaties'],
            inputs: ['SmartTag detectie', 'Garderobe sensoren'],
            outputs: ['Staff alerts', 'Retrieval notifications'],
            compatibleExperiences: ['coat-carousel', 'smart-entrance'],
        },
        {
            slug: 'interactie',
            name: 'Interactie / Ontvangst',
            summary: 'Persoonlijke begroeting en ontvangst',
            description: 'Automatische herkenning en persoonlijke begroeting van gasten bij binnenkomst.',
            priceCents: 89500,
            features: ['Persoonlijke begroeting', 'Welkomstschermen', 'Check-in automatie'],
            inputs: ['SmartTag detectie', 'Guest database'],
            outputs: ['Welcome screens', 'Check-in confirmations'],
            compatibleExperiences: ['smart-entrance', 'magic-mirror', 'smart-info'],
        },
        {
            slug: 'zone',
            name: 'Zone',
            summary: 'Zone-gebaseerde triggers en acties',
            description: 'Definieer zones en automatische acties wanneer gasten zones betreden of verlaten.',
            priceCents: 59500,
            features: ['Zone definitie', 'Entry/exit triggers', 'Zone-specifieke acties'],
            inputs: ['SmartTag zone detectie'],
            outputs: ['Zone notifications', 'Automated actions'],
            compatibleExperiences: ['smart-waiter', 'zonevip', 'zonepersoneel'],
        },
        {
            slug: 'beveiliging',
            name: 'Beveiliging',
            summary: 'Toegangscontrole en beveiligingsmonitoring',
            description: 'Gecontroleerde toegang tot restricted areas en real-time beveiligingsmonitoring.',
            priceCents: 79500,
            features: ['Access control', 'Restricted area monitoring', 'Security alerts'],
            inputs: ['SmartTag detectie', 'Security sensors'],
            outputs: ['Access grants/denials', 'Security notifications'],
            compatibleExperiences: ['vip-access', 'smart-entrance'],
        },
        {
            slug: 'personeel',
            name: 'Personeel',
            summary: 'Staff management en communicatie',
            description: 'Real-time staff locatie, taak management en interne communicatie.',
            priceCents: 65000,
            features: ['Staff tracking', 'Task assignments', 'Internal messaging'],
            inputs: ['Staff SmartTags', 'Task inputs'],
            outputs: ['Staff notifications', 'Task updates'],
            compatibleExperiences: ['smart-waiter', 'zonepersoneel'],
        },
        {
            slug: 'vip-access',
            name: 'VIP Access',
            summary: 'Exclusieve VIP behandeling en toegang',
            description: 'Speciale behandeling voor VIP gasten met exclusieve toegang en services.',
            priceCents: 69500,
            features: ['VIP identification', 'Exclusive access', 'Premium services'],
            inputs: ['VIP SmartTags', 'VIP database'],
            outputs: ['VIP notifications', 'Exclusive access grants'],
            compatibleExperiences: ['zonevip', 'magic-mirror', 'smart-waiter'],
        },
        {
            slug: 'crosscoretrigger',
            name: 'CrossCoreTrigger',
            summary: 'Cross-platform integraties',
            description: 'Koppeling met externe systemen en platforms voor uitgebreide functionaliteit.',
            priceCents: 49500,
            features: ['API integraties', 'Webhook support', 'External triggers'],
            inputs: ['External APIs', 'Webhook calls'],
            outputs: ['System integrations', 'Data sync'],
            compatibleExperiences: ['smart-connector'],
        },
        {
            slug: 'smarttag-core',
            name: 'SmartTag Core (koppelen/programmeren)',
            summary: 'SmartTag configuratie en programmering',
            description: 'Tools voor het koppelen en programmeren van SmartTags aan gasten en objecten.',
            priceCents: 39500,
            features: ['Tag programming', 'Guest linking', 'Bulk operations'],
            inputs: ['Guest data', 'Tag IDs'],
            outputs: ['Programmed tags', 'Link confirmations'],
            compatibleExperiences: ['smart-entrance', 'smart-goodiebag'],
        },
    ];
    for (const module of modules) {
        await prisma.module.create({ data: module });
    }
    console.log('✅ Modules seeded');
    // Seed Belevingsconcepten (SmartVisitor Compatible)
    const experiences = [
        {
            type: 'EXPERIENCE',
            name: 'Fortuneteller',
            priceCents: 189500,
            metadata: {
                description: 'AI-powered waarzegger die persoonlijke voorspellingen geeft',
                features: ['AI personality analysis', 'Personalized predictions', 'Interactive experience'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Magic Mirror',
            priceCents: 225000,
            metadata: {
                description: 'Interactieve spiegel met augmented reality features',
                features: ['AR overlays', 'Photo capture', 'Social sharing'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Coat Carousel',
            priceCents: 249500,
            metadata: {
                description: 'Geautomatiseerde garderobe carrousel',
                features: ['Automated retrieval', 'RFID tracking', 'Express service'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Smart-Waiter',
            priceCents: 185000,
            metadata: {
                description: 'Automatische drankjes en snacks service',
                features: ['Automatic ordering', 'Location-based service', 'Payment integration'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Smart-Info',
            priceCents: 209500,
            metadata: {
                description: 'Contextuele informatie op basis van locatie',
                features: ['Location-aware content', 'Multi-language support', 'Interactive displays'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Smart-Connector',
            priceCents: 199000,
            metadata: {
                description: 'Netwerking facilitator voor events',
                features: ['Profile matching', 'Meeting suggestions', 'Contact exchange'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'SmartPhotobooth',
            priceCents: 115000,
            metadata: {
                description: 'Automatische fotobooth met instant sharing',
                features: ['Auto-trigger photos', 'Instant sharing', 'Brand customization'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Smart-Entrance',
            priceCents: 125000,
            metadata: {
                description: 'Intelligente toegangscontrole en welkom',
                features: ['Automatic check-in', 'Welcome messages', 'Access control'],
            },
        },
        {
            type: 'EXPERIENCE',
            name: 'Smart-Goodiebag',
            priceCents: 149500,
            metadata: {
                description: 'Gepersonaliseerde goodiebag samenstelling',
                features: ['Personalized selection', 'Automated packing', 'Preference learning'],
            },
        },
    ];
    for (const experience of experiences) {
        await prisma.item.create({ data: experience });
    }
    console.log('✅ Experiences seeded');
    // Seed Packages
    const packages = [
        {
            slug: 'feelwelcome',
            name: 'FeelWelcome',
            priceCents: 299500,
            description: 'Complete ontvangst en welkom ervaring',
            items: ['core', 'interactie', 'smart-entrance'],
            features: ['Persoonlijke begroeting', 'Automatische check-in', 'Welkomstschermen'],
        },
        {
            slug: 'zonevip',
            name: 'ZoneVIP',
            priceCents: 214500,
            description: 'VIP behandeling en exclusieve toegang',
            items: ['core', 'zone', 'vip-access'],
            features: ['VIP herkenning', 'Exclusieve zones', 'Premium service'],
        },
        {
            slug: 'zonepersoneel',
            name: 'ZonePersoneel',
            priceCents: 209500,
            description: 'Staff management en zone controle',
            items: ['core', 'zone', 'personeel'],
            features: ['Staff tracking', 'Zone management', 'Task coordination'],
        },
        {
            slug: 'smartstart',
            name: 'SmartStart',
            priceCents: 225000,
            description: 'Basis SmartVisitor pakket voor kleine events',
            items: ['core', 'interactie', 'smarttag-core'],
            features: ['Basis functionaliteit', 'Tag management', 'Guest interaction'],
        },
        {
            slug: 'smartevent',
            name: 'SmartEvent',
            priceCents: 379500,
            description: 'Uitgebreid pakket voor middelgrote events',
            items: ['core', 'interactie', 'zone', 'garderobe', 'smarttag-core'],
            features: ['Volledige event management', 'Garderobe service', 'Zone controle'],
        },
        {
            slug: 'smartexperience',
            name: 'SmartExperience',
            priceCents: 625000,
            description: 'Premium pakket met alle modules en experiences',
            items: ['core', 'interactie', 'zone', 'garderobe', 'beveiliging', 'personeel', 'vip-access', 'crosscoretrigger', 'smarttag-core'],
            features: ['Alle modules', 'VIP service', 'Beveiliging', 'Staff management', 'Integraties'],
        },
    ];
    for (const pkg of packages) {
        await prisma.package.create({ data: pkg });
    }
    console.log('✅ Packages seeded');
    // Seed FAQ
    const faqs = [
        {
            question: 'Heb ik een app nodig?',
            answer: 'Nee. SmartVisitor werkt met onzichtbare SmartTags en automatische detectie—geen app, geen scan.',
            order: 1,
        },
        {
            question: 'Werkt dit met mijn CRM?',
            answer: 'Ja. Data is koppelbaar aan CRM, e‑mailfunnels en social tooling.',
            order: 2,
        },
        {
            question: 'Hoe snel staat een demo?',
            answer: 'Binnen 24 uur leveren we een werkende demo of prijsindicatie.',
            order: 3,
        },
        {
            question: 'Is dit schaalbaar?',
            answer: 'Ja, van 50 tot 5000+ bezoekers, modulair uitbreidbaar per module/zone.',
            order: 4,
        },
        {
            question: 'Wat zijn SmartTags?',
            answer: 'Onzichtbare RFID-tags die gasten dragen. Geen batterij, geen app, gewoon automatische detectie.',
            order: 5,
        },
        {
            question: 'Hoe werkt de installatie?',
            answer: 'Wij zorgen voor complete setup en configuratie. Binnen 2 uur operationeel.',
            order: 6,
        },
        {
            question: 'Welke data krijg ik?',
            answer: 'Real-time dashboards, heatmaps, interactie-analytics en exporteerbare rapporten.',
            order: 7,
        },
        {
            question: 'Is er technische support?',
            answer: 'Ja, 24/7 support tijdens events en standaard support voor configuratie.',
            order: 8,
        },
    ];
    for (const faq of faqs) {
        await prisma.faq.create({ data: faq });
    }
    console.log('✅ FAQ seeded');
    console.log('🎉 Database seeded successfully!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map