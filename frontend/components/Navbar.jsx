'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageWrapper from './LanguageWrapper'
import Language from './Language'


export default function Navbar (){
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // track which top-level mobile dropdowns are open (by name)
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState({})
  const pathname = usePathname()

  const toggleMobileDropdown = (name) => {
    setMobileOpenDropdowns(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      dropdown: null,
    },
    {
      name: "Courses",
      href: "/courses",
      dropdown: [
        { name: "English for kids and teens", href: "/courses/englishforkids" },
        { name: "English for adults", href: "/courses/englishforadults" },
        { name: "Academic English", href: "/courses/academicenglish" },
        { name: "English proficiency Tests", href: "/courses/Englishproficiencytests" },
        { name: "Business English", href: "/courses/businessenglish" },
      ],
    },
    {
      name: "Skills",
      href: "/skills",
      dropdown: [
        { name: "Listening", href: "/skills/listening" },
        { name: "Speaking", href: "/skills/speaking" },
        { name: "Reading", href: "/skills/reading" },
        { name: "Writing", href: "/skills/writing" },
      ],
    },
    {
      name: "ESL resources",
      href: "/esl-resources",
      dropdown: [
        { name: "Story Library", href: "/esl-resources/storys" },
        { name: "Blog Library", href: "/esl-resources/blogs" },
        { name: "Video Library", href: "/esl-resources/videos" },
        { name: "Audio Library", href: "/esl-resources/audio" },
      ],
    },
     {
      name: "Levels",
      href: "/levels",
      dropdown: [
        { name: "A1 Level", href: "/levels/a1" },
        { name: "A2 Level", href: "/levels/a2" },
        { name: "B1 Level", href: "/levels/b1" },
        { name: "B2 Level", href: "/levels/b2" },
        { name: "C1 Level", href: "/levels/c1" },
      ],
    },
    {
      name: "Tutelage Tests",
      href: "/tutelagetests",
      dropdown: [
        { name: "Free Practice Tests", href: "/tutelagetests/practicetests" },
        { name: "Language placement test", href: "/tutelagetests/languageplacement" },
        { name: "International/ mock test", href: "/tutelagetests/mockexams" },
      ],
    },
    {
      name: "About Us",
      href: "/about-us",
      dropdown: null,
    },
    {
      name: "Contact",
      href: "/contact",
      dropdown: null,
    },
  ]

  return (
    <nav className="top-0 z-50 bg-background md:pt-4 ">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 bg-background">
        <div className="max-w-6xl w-full flex items-center justify-between mx-auto">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-3">
            <Image src={'/only-logo-black-border-yellow-bg.svg'} className='w-[35px] h-[35px] md:w-[40px] md:h-[40px]' alt='logo' width={40} height={40} />
            <h3 className="font-bold text-foreground text-lg md:text-xl">Tutelage</h3>
          </Link>
          {/* Search + ThemeToggle */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search..."
                className="w-48 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 shadow-sm"
              />
              <LanguageWrapper >
                <Language />
              </LanguageWrapper>
              <ThemeToggle />
            </div>
            {/* Mobile search icon */}
            <div className="lg:hidden flex items-center gap-2">
              <MobileSearchOverlay />
              <ThemeToggle />
            </div>
            {/* Changing Websites */}
            <div className='hidden lg:flex items-center justify-center gap-2 text-md md:text-lg ml-4'>
              <div className='text-primary font-bold cursor-pointer'>
                <h1>Tutelage</h1>
              </div>
              <p className='text-foreground'>|</p>
              <Link href="http://tutelage.vercel.app" className='text-muted-foreground font-bold cursor-pointer'>
                <h1>Tutelage AI</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar: Navigation */}
      <div className="w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center justify-center">
              <div className="hidden lg:flex lg:space-x-2 xl:space-x-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href.trim()
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-lg font-semibold flex items-center gap-1 transition-colors duration-200 ${isActive ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
                      >
                        {item.name}
                        {item.dropdown && (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Link>
                      <AnimatePresence>
                        {item.dropdown && activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
                          >
                            <div className="py-2">
                              {item.dropdown.map((dropdownItem, index) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={`block px-4 py-3 transition-all duration-200 ${pathname === dropdownItem.href.trim() ? 'text-primary font-semibold' : 'text-foreground hover:text-primary hover:bg-primary/10'}`}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="flex items-center justify-between w-full lg:hidden ml-auto">

              <div className=''>
                    {/* Changing Websites */}
                    <div className='flex items-center justify-center gap-2 text-lg'>
                        <div className='text-foreground font-bold cursor-pointer'>
                            <h1>Tutelage</h1>
                        </div>
                        <p className='text-foreground'>|</p>
                        <div className='text-muted-foreground font-bold cursor-pointer'>
                            <h1>Tutelage AI</h1>
                        </div>
                    </div>
              </div>

              {/* MENU ICON */}
              <div className=''>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-foreground hover:text-primary p-2"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>  
            </div>
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
            className="lg:hidden bg-background border-t border-b border-border overflow-y-auto"
            style={{ maxHeight: 'calc(88dvh - 4rem)' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    // Render parent as toggle when it has dropdown on mobile
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium transition-colors duration-200 ${mobileOpenDropdowns[item.name] ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${mobileOpenDropdowns[item.name] ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileOpenDropdowns[item.name] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="ml-4 space-y-1"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2 text-sm transition-colors duration-200 ${pathname === dropdownItem.href.trim() ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}`}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${pathname === item.href.trim() ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Mobile search overlay
function MobileSearchOverlay() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="text-foreground hover:text-primary"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] bg-background/95 flex items-start justify-center pt-10 px-4">
          <div className="relative w-full max-w-xs mx-auto">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 shadow-sm"
              autoFocus
            />
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}