"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // Clear existing data
    await prisma.ticket.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.fAQ.deleteMany();
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
            features: JSON.stringify(['Automatische jas-tag koppeling', 'Vertrek detectie', 'Staff notificaties']),
            inputs: JSON.stringify(['SmartTag detectie', 'Garderobe sensoren']),
            outputs: JSON.stringify(['Staff alerts', 'Retrieval notifications']),
            compatibleExperiences: JSON.stringify(['coat-carousel', 'smart-entrance']),
        },
        {
            slug: 'interactie',
            name: 'Interactie / Ontvangst',
            summary: 'Persoonlijke begroeting en ontvangst',
            description: 'Automatische herkenning en persoonlijke begroeting van gasten bij binnenkomst.',
            priceCents: 89500,
            features: JSON.stringify(['Persoonlijke begroeting', 'Welkomstschermen', 'Check-in automatie']),
            inputs: JSON.stringify(['SmartTag detectie', 'Guest database']),
            outputs: JSON.stringify(['Welcome screens', 'Check-in confirmations']),
            compatibleExperiences: JSON.stringify(['smart-entrance', 'magic-mirror', 'smart-info']),
        },
    ];
    for (const module of modules) {
        await prisma.module.create({ data: module });
    }
    console.log('✅ Modules seeded');
    // Seed Experiences
    const experiences = [
        {
            type: 'EXPERIENCE',
            name: 'Fortuneteller',
            priceCents: 189500,
            metadata: JSON.stringify({
                description: 'AI-powered waarzegger die persoonlijke voorspellingen geeft',
                features: ['AI personality analysis', 'Personalized predictions', 'Interactive experience'],
            }),
        },
        {
            type: 'EXPERIENCE',
            name: 'Magic Mirror',
            priceCents: 225000,
            metadata: JSON.stringify({
                description: 'Interactieve spiegel met augmented reality features',
                features: ['AR overlays', 'Photo capture', 'Social sharing'],
            }),
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
            items: JSON.stringify(['core', 'interactie', 'smart-entrance']),
            features: JSON.stringify(['Persoonlijke begroeting', 'Automatische check-in', 'Welkomstschermen']),
        },
        {
            slug: 'smartstart',
            name: 'SmartStart',
            priceCents: 225000,
            description: 'Basis SmartVisitor pakket voor kleine events',
            items: JSON.stringify(['core', 'interactie', 'smarttag-core']),
            features: JSON.stringify(['Basis functionaliteit', 'Tag management', 'Guest interaction']),
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
    ];
    for (const faq of faqs) {
        await prisma.fAQ.create({ data: faq });
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
//# sourceMappingURL=seed-sqlite.js.map