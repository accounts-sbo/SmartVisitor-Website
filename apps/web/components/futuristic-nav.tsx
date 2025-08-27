'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Hoe het werkt', href: '/hoe-het-werkt' },
  { 
    name: 'Producten', 
    href: '/modules',
    submenu: [
      { name: 'Modules', href: '/modules' },
      { name: 'Belevingsconcepten', href: '/belevingsconcepten' },
    ]
  },
  { name: 'Pakketten & Prijzen', href: '/pricing' },
  { name: 'Cases', href: '/cases' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Over ons', href: '/over-ons' },
]

export function FuturisticNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark-bg/95 backdrop-blur-lg border-b border-gray-800' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/smartvisitor-logo.svg"
                  alt="SmartVisitor"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                />
              </motion.div>
              <span className="text-xl font-space font-bold text-white group-hover:text-electric-blue transition-colors">
                SmartVisitor
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-300 hover:text-electric-blue transition-colors font-space font-medium"
                  >
                    <span>{item.name}</span>
                    {item.submenu && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Link>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-dark-card border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-300 hover:text-electric-blue hover:bg-gray-800 transition-colors font-space"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold rounded-lg glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/demo'}
              >
                Demo aanvragen
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark-bg/95 backdrop-blur-lg" />
            <div className="relative h-full flex flex-col pt-20 px-4">
              <div className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-2xl font-space font-semibold text-white hover:text-electric-blue transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="mt-2 ml-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-lg text-gray-300 hover:text-electric-blue transition-colors font-space"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <motion.button
                  className="w-full px-6 py-4 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold text-lg rounded-lg glow-effect"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = '/demo'
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Demo aanvragen
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
