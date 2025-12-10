'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail,  } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Separator } from './ui/separator'

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
    { name: "Story Library", href: "/esl-resources/stories" },
    { name: "Blog Library", href: "/esl-resources/blogs" },
    { name: "Video Library", href: "/esl-resources/videos" },
    { name: "Audio Library", href: "/esl-resources/audiso" },
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
    { name: "Free Practice Tests", href: "/tutelage-tests/practicetests" },
    { name: "Language Placement Test", href: "/tutelage-tests/languageplacement" },
    { name: "International/Mock Tests", href: "/tutelage-tests/mockexams" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/share/1EXoYc3xG4/" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/tutelage.esl?igsh=MWhhZmhlZzJ1MTB2ZA==" },
  ]

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-border">
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
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">Main</h4>
                  </Link>
                  <ul className="space-y-2">
                    {mainLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
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
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">Courses</h4>
                  </Link>
                  <ul className="space-y-2">
                    {courseLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
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
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">Skills</h4>
                  </Link>
                  <ul className="space-y-2">
                    {skillsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ESL Resources Links */}
                <div className="space-y-4">
                  <Link href="/esl-resources">
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">ESL Resources</h4>
                  </Link>
                  <ul className="space-y-2">
                    {eslResourcesLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
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
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">Levels</h4>
                  </Link>
                  <ul className="space-y-2">
                    {levelsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tutelage Tests Links */}
                <div className="space-y-4">
                  <Link href="/tutelage-tests">
                    <h4 className="text-lg font-bold text-white hover:text-primary transition-colors duration-200 mb-4 cursor-pointer">Tutelage Tests</h4>
                  </Link>
                  <ul className="space-y-2">
                    {tutelageTestsLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-primary transition-colors duration-200 text-sm"
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
            <div className="flex-shrink-0 pt-4 xl:pt-0 border-t xl:border-t-0 xl:border-l border-border xl:pl-8 xl:w-80">
              <div className="space-y-6">
                {/* Logo & Name */}
                <div className="flex items-center gap-3">
                  <Image src={'/only-logo-black-border-yellow-bg.svg'} alt='logo' width={30} height={30} />
                  <h3 className="text-2xl font-bold text-white">Tutelage</h3>
                </div>

                {/* Description */}
                <p className="text-white leading-relaxed text-sm max-w-lg">
                  Empowering students worldwide with innovative English learning solutions. Join thousands who have achieved their language goals with us.
                </p>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h5 className="text-base font-bold text-white">Contact Information</h5>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-white text-sm">New Chwar Chra, Sulaimaniyah</p>
                      <p className="text-white text-sm">Kurdistan Region, Iraq</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="flex flex-col text-left">
                      <a
                        href="tel:+9647501534240"
                        className="text-white hover:text-primary transition-colors duration-200 text-sm"
                      >
                        (+964) 07501534340
                      </a>
                      <a
                        href="tel:+9647701946364"
                        className="text-white hover:text-primary transition-colors duration-200 text-sm"
                      >
                        (+964) 07701946364
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href="mailto:Info@tutelage.krd"
                      className="text-white hover:text-primary transition-colors duration-200 text-sm"
                    >
                      Info@tutelage.krd
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-white">Office Hours</h5>
                  <div className="text-white text-sm space-y-1">
                    <p>Sunday - Thursday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: By Appointment Only</p>
                    <p>Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-border"></div>

        {/* Bottom Section - Logo, Copyright, Socials */}
        <div className="py-8">
          <div className="flex flex-row items-start md:items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className='flex items-center justify-center gap-3'>
                <Image src={'/only-logo-black-border-yellow-bg.svg'} alt='logo' width={30} height={30} />
                <h3 className="text-xl hidden sm:block font-bold text-white">Tutelage</h3>
              </div>
                    
              <div className='h-5'>
                <Separator orientation="vertical" />
              </div>

              {/* Copyright */}
              <div className="text-center">
                 <p className="text-white text-sm">
                    © {currentYear} Tutelage. All rights reserved.
                 </p>
              </div>
            </div>

            <div>
              Developed by <span className="text-primary font-bold">Nexa Void</span> team
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-primary text-white p-2.5 rounded-full transition-all duration-300 shadow-sm group"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-white transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}