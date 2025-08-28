'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'What is SmartVisitor', href: '/what-is-smartvisitor' },
  { name: 'Modules', href: '/modules' },
  { name: 'Experience Concepts', href: '/experience-concepts' },
  { name: 'Packages & Pricing', href: '/packages-pricing' },
  { name: 'Cases & Stories', href: '/cases-stories' },
  { name: 'About Us', href: '/about-us' },
  { name: 'FAQ & Support', href: '/faq-support' },
  { name: 'Contact & Demo', href: '/contact-demo' },
]

export function MinimalNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-electric-blue/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu Button - Left */}
            <motion.button
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-electric-blue/20 to-blue-600/20 backdrop-blur-lg border border-electric-blue/30 hover:from-electric-blue/30 hover:to-blue-600/30 transition-all duration-300 glow-effect-subtle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-electric-blue" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-electric-blue" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Contact Us Button - Right */}
            <motion.button
              className="group relative px-6 py-3 bg-gradient-to-r from-electric-blue to-blue-600 text-white font-space font-semibold text-sm rounded-lg overflow-hidden glow-effect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact-demo'}
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Futuristic Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 hero-grid opacity-10" />
            
            {/* Menu Content */}
            <div className="flex items-center justify-center min-h-screen p-8">
              <div className="text-center space-y-8 max-w-md w-full">
                {/* Menu Items */}
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block py-4 px-6 text-xl font-semibold text-white hover:text-electric-blue transition-all duration-300 rounded-xl hover:bg-electric-blue/10 border border-transparent hover:border-electric-blue/30 glow-effect-subtle"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            →
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-8"
                >
                  <Link
                    href="/contact-demo"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-electric-blue to-blue-600 hover:from-blue-600 hover:to-electric-blue text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl glow-effect"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get in Touch
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
