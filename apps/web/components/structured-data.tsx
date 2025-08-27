import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'product' | 'faq'
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SmartVisitor',
          description: 'SmartVisitor maakt van elk event een persoonlijke ervaring. Onzichtbare technologie, zichtbare resultaten.',
          url: 'https://smartvisitor.vercel.app',
          logo: 'https://smartvisitor.vercel.app/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+31-20-123-4567',
            contactType: 'customer service',
            availableLanguage: 'Dutch'
          },
          sameAs: [
            'https://linkedin.com/company/smartvisitor',
            'https://twitter.com/smartvisitor'
          ]
        }

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data?.name || 'SmartVisitor',
          description: data?.description || 'RFID-gebaseerd event management systeem',
          brand: {
            '@type': 'Brand',
            name: 'SmartVisitor'
          },
          offers: data?.priceCents ? {
            '@type': 'Offer',
            price: (data.priceCents / 100).toString(),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock'
          } : undefined
        }

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          })) || []
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
