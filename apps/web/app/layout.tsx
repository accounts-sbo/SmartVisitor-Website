import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StructuredData } from '../components/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartVisitor - Geen app. Geen scan. Wel impact.',
  description: 'SmartVisitor maakt van elk event een persoonlijke ervaring. Onzichtbare technologie, zichtbare resultaten.',
  keywords: 'RFID, event technology, smart events, visitor management, contactless, automation',
  authors: [{ name: 'SmartVisitor' }],
  openGraph: {
    title: 'SmartVisitor - Geen app. Geen scan. Wel impact.',
    description: 'SmartVisitor maakt van elk event een persoonlijke ervaring. Onzichtbare technologie, zichtbare resultaten.',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartVisitor - Geen app. Geen scan. Wel impact.',
    description: 'SmartVisitor maakt van elk event een persoonlijke ervaring. Onzichtbare technologie, zichtbare resultaten.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="dark">
      <body className={`${inter.className} bg-dark-bg text-white antialiased`}>
        <StructuredData type="organization" />
        {children}
      </body>
    </html>
  )
}
