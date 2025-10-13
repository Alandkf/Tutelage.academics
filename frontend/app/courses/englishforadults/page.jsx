'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {  Clock, Users, Award, ChevronRight, ArrowRight, Phone, HelpCircle, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const EnglishForAdultsPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'
  
  const title = t('inglishForAdults.first.title')
  const heroImage = "/hero.jpg"
  const description = t('inglishForAdults.first.description')
  const enrollButtonText = t('inglishForAdults.first.enrollButtonText')

  // Get class types from translation
  const publicClass = {
    title: t('inglishForAdults.classTypes.public.title'),
    image: "/hero.jpg",
    features: t('inglishForAdults.classTypes.public.features', { returnObjects: true }),
    buttonText: t('inglishForAdults.classTypes.public.buttonText')
  }

  const privateClass = {
    title: t('inglishForAdults.classTypes.private.title'),
    image: "/hero.jpg",
    features: t('inglishForAdults.classTypes.private.features', { returnObjects: true }),
    buttonText: t('inglishForAdults.classTypes.private.buttonText')
  }

  const classTypes = [publicClass, privateClass]

  // Reusable Class Card Component
  const ClassCard = ({ classType }) => (
    <div className="bg-card border border-border rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-72 sm:h-96">
        <Image
          src={classType.image}
          alt={classType.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6 sm:p-8">
        <h3 className={`text-2xl sm:text-3xl font-bold text-foreground mb-6 ${isRTL ? 'text-right' : ''}`}>
          {classType.title}
        </h3>

        <ul className="flex flex-col gap-1 mb-8" dir="ltr">
          {classType.features.map((feature, index) => (
            <li key={index} className="flex items-start w-full">
              <div className={`w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`}></div>
              <span className={`text-foreground font-medium flex-1 ${isRTL ? 'text-right order-1' : 'order-2'}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={"#form-section"}>
          <Button 
            size="lg" 
            className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {classType.buttonText}
            <ChevronRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </Link>
      </div>
    </div>
  )

  const handleEnrollClick = () => {
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }

  const EnrollmentStep = ({ number, title, description }) => (
    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 border border-border rounded-lg px-6 py-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
      <div className="mb-10 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
          <span className="text-white text-2xl font-bold">
            {number}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-foreground mb-4">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )

  const enrollmentStepsData = t('inglishForAdults.howToEnroll.steps', { returnObjects: true })
  const enrollmentSteps = enrollmentStepsData.map((step, index) => ({
    number: index + 1,
    ...step
  }))

  const [formData, setFormData] = useState({
    countryOfResidence: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    interestedIn: '',
    classType: '',
    testType: ''
  })
  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'interestedIn' && { classType: '', testType: '' })
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const requiredFields = ['countryOfResidence', 'firstName', 'lastName', 'email', 'phone', 'interestedIn']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        toast("Please fill in all required fields", { variant: "destructive" })
        return
      }

      const response = await fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          age: '18',
          education: 'Not specified',
          course: formData.interestedIn,
          classType: formData.classType,
          testType: formData.testType,
          countryOfResidence: formData.countryOfResidence,
          zipCode: formData.zipCode,
          requestType: 'pricing_information'
        })
      })

      const result = await response.json()

      if (!response.ok) {
        toast("Request Failed", {
          description: result.message || 'Please check your information and try again'
        })
        return
      }

      toast("Request Submitted Successfully! 🎉", {
        description: "Our enrollment advisor will contact you within 24 hours"
      })

      setFormData({
        countryOfResidence: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        interestedIn: '',
        classType: '',
        testType: ''
      })

    } catch (error) {
      toast("Connection Error", {
        description: "Unable to submit request. Please try again later."
      })
    } finally {
      setFormLoading(false)
    }
  }

  const courseOptions = [
    'English for Kids and Teens',
    'English for Adults', 
    'Academic English',
    'Business English',
    'English Proficiency Tests'
  ]

  const classTypeOptions = [
    'Private Classes',
    'Public Classes',
    'In-person Classes'
  ]

  const testTypeOptions = [
    'IELTS Academic',
    'IELTS General',
    'IELTS for UKVI', 
    'IELTS Life Skills',
    'TOEFL',
    'PTE',
    'OET'
  ]

  const showClassType = formData.interestedIn && formData.interestedIn !== 'English Proficiency Tests'
  const showTestType = formData.interestedIn === 'English Proficiency Tests'

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqs = t('inglishForAdults.faq.questions', { returnObjects: true })

  return (
    <div className="relative min-h-screen bg-background pt-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {title}
              </h1>
            </div>

            <div className="flex-shrink-0">
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 ">
                  <Button 
                    onClick={handleEnrollClick}
                    size={"lg"} 
                    className=" md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {enrollButtonText}
                    <ChevronRight className={`w-6 h-6 ${isRTL ? 'mr-3 rotate-180' : 'ml-3'}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={`${title} Course`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl">
          <p className={`text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Course Information Cards */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Subtitle Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('inglishForAdults.second.mainTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t('inglishForAdults.second.subtitle')}
            </p>
          </div>

          {/* Class Type Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {classTypes.map((classType, index) => (
              <ClassCard key={index} classType={classType} />
            ))}
          </div>
        </div>
      </div>

      {/* In-Person Classes Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('inglishForAdults.inPerson.title')}
            </h2>
            <p className={`text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {t('inglishForAdults.inPerson.description')}
            </p>
          </div>

          {/* Contact Information */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              {t('inglishForAdults.inPerson.contactTitle')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone 1 */}
              <a
                href="tel:+9647501534240"
                className={`flex items-center justify-center bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg p-6 transition-all duration-300 group ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">(964+) 07501534240</span>
              </a>
              
              {/* Phone 2 */}
              <a
                href="tel:+9647701946364"
                className={`flex items-center justify-center bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg p-6 transition-all duration-300 group ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">(964+) 07701946364</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Learn a New Language in an Interactive Way Section */}
      <div className="py-10 p-4">
        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
          <div className={`flex flex-col-reverse items-stretch gap-0 ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            {/* Content */}
            <div className={`w-full lg:w-1/2 flex items-center px-4 sm:px-6 ${isRTL ? 'lg:mr-10' : 'lg:ml-10'}`}>
              <div className={`w-full py-10 lg:py-24 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
                <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t('inglishForAdults.interactiveWay.title')}
                </h2>
                
                <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                  {t('inglishForAdults.interactiveWay.description')}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                <Image
                  src="/hero.jpg"
                  alt="Interactive English learning for adults"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('inglishForAdults.faq.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t('inglishForAdults.faq.subtitle')}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Question Bar */}
                <button
                  onClick={() => toggleFaq(index)}
                  className={` ${isRTL ? "flex-row-reverse" : ""} w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-muted/50`}
                >
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-between' : ""} gap-4 flex-1 `}>
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className={`text-base font-semibold text-foreground pr-4 `}>
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-2">
                        <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right pr-9' : 'pl-9'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Enroll Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('inglishForAdults.howToEnroll.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('inglishForAdults.howToEnroll.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {enrollmentSteps.map((step, index) => (
              <EnrollmentStep
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Request Pricing and Course Information Section */}
      <div className="py-20 bg-muted/20" id="form-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('inglishForAdults.requestPricing.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('inglishForAdults.requestPricing.description')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* First Row: Country and Names */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="country" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.country')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.countryOfResidence}
                    onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="firstName" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.firstName')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="lastName" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.lastName')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              </div>

              {/* Second Row: Email, Phone, Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                <div className="sm:col-span-3 flex flex-col gap-1 items-start">
                  <Label htmlFor="email" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.email')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="phone" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.phone')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="zipCode" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.zipCode')}</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              </div>

              {/* Third Row: Course Interest and Additional Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.interestedIn')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                  <Select onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className={"w-full"} >
                      <SelectValue placeholder={t('inglishForAdults.requestPricing.form.selectCourse')} />
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showClassType && (
                  <div className="flex flex-col gap-1 items-start">
                    <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.classType')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                    <Select onValueChange={(value) => handleInputChange('classType', value)}>
                      <SelectTrigger className={`w-full`} >
                        <SelectValue placeholder={t('inglishForAdults.requestPricing.form.selectClassType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {classTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {showTestType && (
                  <div className="flex flex-col gap-1 items-start">
                    <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.testType')} {t('inglishForAdults.requestPricing.form.required')}</Label>
                    <Select onValueChange={(value) => handleInputChange('testType', value)}>
                      <SelectTrigger >
                        <SelectValue placeholder={t('inglishForAdults.requestPricing.form.selectTestType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {testTypeOptions.map((test) => (
                          <SelectItem key={test} value={test}>
                            {test}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1 items-start">
                <Label htmlFor="message" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForAdults.requestPricing.form.message')}</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t('inglishForAdults.requestPricing.form.messagePlaceholder')}
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full min-h-[100px] px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y ${isRTL ? 'text-right' : ''}`}
                />
              </div>

              {/* Information Points */}
              <div className="">
                <ul className="space-y-3" dir="ltr">
                  <li className="flex items-start w-full">
                    <div className={`w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`}></div>
                    <span className={`text-sm text-muted-foreground flex-1 ${isRTL ? 'text-right order-1' : 'order-2'}`}>
                      {t('inglishForAdults.requestPricing.form.info1')}
                    </span>
                  </li>
                  <li className="flex items-start w-full">
                    <div className={`w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`}></div>
                    <span className={`text-sm text-muted-foreground flex-1 ${isRTL ? 'text-right order-1' : 'order-2'}`}>
                      {t('inglishForAdults.requestPricing.form.info2')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={formLoading}
                >
                  {formLoading ? t('inglishForAdults.requestPricing.form.submittingButton') : t('inglishForAdults.requestPricing.form.submitButton')}
                  <ChevronRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnglishForAdultsPage
                   