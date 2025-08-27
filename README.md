# SmartVisitor Website

Een moderne, snelle marketing- en productsite voor SmartVisitor: een modulair, RFID-gedreven bezoekers-interactiesysteem.

## 🚀 Features

- **Next.js 14** met App Router en React Server Components
- **Tailwind CSS** voor styling
- **Framer Motion** voor animaties
- **Express API** met Prisma ORM
- **PostgreSQL** database
- **n8n webhook** integratie
- **SEO optimized** met structured data
- **Responsive design** en accessibility

## 📁 Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express API backend
├── packages/
│   └── ui/           # Shared UI components
└── prisma/           # Database schema & seeds
```

## 🛠 Development Setup

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL (or use Docker)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd smartvisitor-website
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Copy example files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

4. Start PostgreSQL (using Docker)
```bash
docker-compose -f docker-compose.dev.yml up postgres -d
```

5. Set up database
```bash
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed
```

6. Start development servers
```bash
# From root directory
pnpm dev
```

This will start:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## 🗄 Database

### Schema

- **Items**: Losse items, SmartTags bundels, en experiences
- **Modules**: SmartVisitor modules met features en prijzen
- **Packages**: Voorgedefinieerde pakketten
- **FAQ**: Veelgestelde vragen
- **Leads**: Demo aanvragen
- **Tickets**: Support tickets

### Seeding

De database wordt automatisch gevuld met data uit de SmartVisitor PDF:

```bash
cd apps/api
pnpm prisma db seed
```

## 🌐 Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_BASE`: Your Railway API URL
   - `NEXT_PUBLIC_SUPPORT_BRAND`: SmartVisitor

3. Deploy automatically on push to main

### Backend (Railway)

1. Connect repository to Railway
2. Set environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `N8N_WEBHOOK_URL_SUPPORT`: n8n support webhook
   - `N8N_WEBHOOK_URL_DEMO`: n8n demo webhook
   - `ALLOWED_ORIGINS`: Frontend URL

3. Deploy automatically on push to main

## 🔗 API Endpoints

- `POST /api/lead` - Demo aanvragen
- `POST /api/support/ticket` - Support tickets
- `GET /api/pricing` - Alle prijzen
- `GET /api/modules` - Alle modules
- `GET /api/modules/:slug` - Module details
- `GET /api/faq` - FAQ items

## 🎨 UI Components

Herbruikbare components in `packages/ui/`:

- `Hero` - Homepage hero sectie
- `HowItWorks` - Uitleg sectie
- `ModuleCard` - Module weergave
- `DemoForm` - Demo aanvraag formulier
- `PricingPreview` - Prijzen overzicht

## 📱 Pages

- `/` - Homepage met hero, uitleg, modules, prijzen, FAQ
- `/pricing` - Volledige prijslijst met filters
- `/modules` - Alle modules overzicht
- `/modules/[slug]` - Module detail pagina
- `/demo` - Demo aanvraag formulier
- `/support` - Support en contact
- `/cases` - Success stories
- `/legal` - Privacy en voorwaarden

## 🔧 Scripts

```bash
# Development
pnpm dev              # Start all dev servers
pnpm build            # Build all apps
pnpm start            # Start production servers

# Database
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio

# Utilities
pnpm lint             # Lint all code
pnpm clean            # Clean build artifacts
```

## 🎯 SEO & Performance

- **Core Web Vitals** optimized
- **Structured data** voor Google
- **Sitemap** automatisch gegenereerd
- **Meta tags** voor social sharing
- **Image optimization** met Next.js
- **Edge runtime** waar mogelijk

## 🔒 Security & Privacy

- **GDPR compliant** privacy policy
- **Helmet.js** security headers
- **Input validation** met Zod
- **CORS** configuratie
- **Rate limiting** (production)

## 📞 Support

Voor vragen over de implementatie:
- Email: support@smartvisitor.nl
- Telefoon: +31 (0)20 123 4567

## 📄 License

Proprietary - SmartVisitor
