'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'


export default function Navbar (){
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Home",
      href: "/",
      dropdown: null,
    },
    {
      name: "ESL resources ",
      href: "/eslresources ",
      dropdown: [
        { name: "Short Story", href: "/shortstory" },
        { name: "Blog", href: "/blogs" },
        { name: "Video", href: "/Video" },
        { name: "authentic material", href: "/authenticmaterial" },
      ],
    },
    {
      name: "Courses",
      href: "/courses",
      dropdown: [
        { name: "General English", href: "/generalenglish" },
        { name: "Academic English", href: "/academicenglish" },
        { name: "Language Preparation Test", href: "/languagepreparationtest" },
        { name: "ESP", href: "/esp" },
        { name: "Business English", href: "/businessenglish" },
        { name: "Entrepreneurship", href: "/entrepreneurship" },
      ],
    },
     {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Group VIP Classes", href: "/vipclasses" },
        { name: "Private Tutoring", href: "/privatetouring" },
        { name: "Virtual Classes", href: "/virtualclasses, " },
        { name: "Physical Classes", href: "/physicalclasses" },
        { name: "Corporate Training ", href: "/corporatetraining " }
      ],
    },
    {
      name: "Tutelage Tests ",
      href: "/tutelagetests ",
      dropdown: [
        { name: "Practice Tests", href: "/practicetests" },
        { name: "IELTS Preparation", href: "/IELTS-preparation" },
        { name: "Mock exams", href: "/mockexams" },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      dropdown: null,
    },
  ]

  return (
    <nav className="bg-black border-b border-yellow-400/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-4 md:space-x-10">
            <div className="text-yellow-400 font-bold text-lg md:text-xl">
              <div className='flex items-center space-x-2 md:space-x-4'>
                  <Image src={'/only-logo-black-border-yellow-bg.svg'} className='w-[35px] h-[35px] md:w-[40px] md:h-[40px]' alt='logo' width={40} height={40} />
                  <h3 className="font-bold text-white">Tutelage</h3>
              </div>
            </div>
            

            {/* CHAHNGING WEBSITES */}
            <div className='flex items-center justify-center gap-2 text-md md:text-lg'>
                <div className='text-white font-bold cursor-pointer'>
                  <h1>Tutelage</h1>
                </div>

                <p className='text-white'>|</p>

                <div className='text-gray-500 font-bold cursor-pointer'>
                  <h1>Tutelage AI</h1>
                </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
                  >
                    {item.name}
                    {item.dropdown && (
                      <div
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-sm border border-yellow-400/20 rounded-lg shadow-xl overflow-hidden"
                      >
                        <div className="py-2">
                          {item.dropdown.map((dropdownItem, index) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-white hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200"
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-400 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-sm border-t border-yellow-400/20 overflow-y-auto"
            style={{ maxHeight: 'calc(100dvh - 4rem)' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="text-white hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-sm transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}