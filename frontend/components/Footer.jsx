'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail,  } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Main navigation links
  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutus" },
    { name: "Contact Us", href: "/contact" },
  ]

  // Course links
  const courseLinks = [
    { name: "English for Kids and Teens", href: "/courses/englishforkids" },
    { name: "English for Adults", href: "/courses/englishforadults" },
    { name: "Academic English", href: "/courses/academicenglish" },
    { name: "English Proficiency Tests", href: "/courses/Englishproficiencytests" },
    { name: "Business English", href: "/courses/businessenglish" },
  ]

  // Skills links
  const skillsLinks = [
    { name: "Listening", href: "/skills/listening" },
    { name: "Speaking", href: "/skills/speaking" },
    { name: "Reading", href: "/skills/reading" },
    { name: "Writing", href: "/skills/writing" },
  ]

  // ESL Resources links
  const eslResourcesLinks = [
    { name: "Story Library", href: "/eslresources/storys" },
    { name: "Blog Library", href: "/eslresources/blogs" },
    { name: "Video Library", href: "/eslresources/video" },
    { name: "Audio Library", href: "/eslresources/audio" },
  ]

  // Levels links
  const levelsLinks = [
    { name: "A1 Level", href: "/levels/A1level" },
    { name: "A2 Level", href: "/levels/A2level" },
    { name: "B1 Level", href: "/levels/B1level" },
    { name: "B2 Level", href: "/levels/B2level" },
    { name: "C1 Level", href: "/levels/C1level" },
  ]

  // Tutelage Tests links
  const tutelageTestsLinks = [
    { name: "Free Practice Tests", href: "/tutelagetests/practicetests" },
    { name: "Language Placement Test", href: "/tutelagetests/languageplacement" },
    { name: "International/Mock Tests", href: "/tutelagetests/mockexams" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/share/1EXoYc3xG4/" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/tutelage.esl?igsh=MWhhZmhlZzJ1MTB2ZA==" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 xl:px-16 relative">
        {/* Top Section - Links */}
        <div className="py-14 sm:py-20">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
            {/* Links Section */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 xl:gap-y-10">
                {/* Main Links */}
                <div className="space-y-4">
                  <Link href="/courses">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">Main</h4>
                  </Link>
                  <ul className="space-y-2">
                    {mainLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Links */}
                <div className="space-y-4">
                  <Link href="/courses">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">Courses</h4>
                  </Link>
                  <ul className="space-y-2">
                    {courseLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Links */}
                <div className="space-y-4">
                  <Link href="/skills">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">Skills</h4>
                  </Link>
                  <ul className="space-y-2">
                    {skillsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ESL Resources Links */}
                <div className="space-y-4">
                  <Link href="/eslresources">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">ESL Resources</h4>
                  </Link>
                  <ul className="space-y-2">
                    {eslResourcesLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Levels Links */}
                <div className="space-y-4">
                  <Link href="/levels">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">Levels</h4>
                  </Link>
                  <ul className="space-y-2">
                    {levelsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tutelage Tests Links */}
                <div className="space-y-4">
                  <Link href="/tutelagetests">
                    <h4 className="text-lg font-bold text-black hover:text-yellow-400 transition-colors duration-200 mb-4 cursor-pointer">Tutelage Tests</h4>
                  </Link>
                  <ul className="space-y-2">
                    {tutelageTestsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Logo & Contact Info */}
            <div className="flex-shrink-0 pt-4 xl:pt-0 border-t xl:border-t-0 xl:border-l border-primary-foreground/30 xl:pl-8 xl:w-80">
              <div className="space-y-6">
                {/* Logo & Name */}
                <div className="flex items-center gap-3">
                  <Image src={'/only-logo-black-border-yellow-bg.svg'} alt='logo' width={30} height={30} />
                  <h3 className="text-2xl font-bold text-primary-foreground">Tutelage</h3>
                </div>

                {/* Description */}
                <p className="text-primary-foreground leading-relaxed text-sm max-w-lg">
                  Empowering students worldwide with innovative English learning solutions. Join thousands who have achieved their language goals with us.
                </p>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h5 className="text-base font-bold text-black">Contact Information</h5>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#1e1e1e] mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-primary-foreground text-sm">Suli Innovation house</p>
                      <p className="text-primary-foreground text-sm">Sulaimaniyah - Kurdistan Region</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#1e1e1e] flex-shrink-0" />
                    <div className="flex flex-col text-left">
                      <a
                        href="tel:+9647501534240"
                        className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                      >
                        (964+) 07501534240
                      </a>
                      <a
                        href="tel:+9647701946364"
                        className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                      >
                        (964+) 07701946364
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#1e1e1e] flex-shrink-0" />
                    <a
                      href="mailto:Info@tutelage.krd"
                      className="text-primary-foreground hover:text-yellow-400 transition-colors duration-200 text-sm"
                    >
                      Info@tutelage.krd
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-black">Office Hours</h5>
                  <div className="text-primary-foreground text-sm space-y-1">
                    <p>Sunday: 1:00 PM - 5:00 PM</p>
                    <p>Tuesday: 1:00 PM - 5:00 PM</p>
                    <p>Thursday: 1:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-primary-foreground/20"></div>

        {/* Bottom Section - Logo, Copyright, Socials */}
        <div className="py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image src={'/only-logo-black-border-yellow-bg.svg'} alt='logo' width={30} height={30} />
              <h3 className="text-xl font-bold text-primary-foreground">Tutelage</h3>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-primary-foreground text-sm">
                © {currentYear} Tutelage. All rights reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-[#1e1e1e] hover:bg-white hover:text-black p-2.5 rounded-full transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}