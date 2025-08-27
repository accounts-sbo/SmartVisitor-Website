/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@smartvisitor/ui'],
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_SUPPORT_BRAND: process.env.NEXT_PUBLIC_SUPPORT_BRAND,
  },
}

module.exports = nextConfig
