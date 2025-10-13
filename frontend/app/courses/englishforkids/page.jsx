'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {  Clock, Users, Award, ChevronRight, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { useTranslation } from 'react-i18next'

const EnglishCourseForKidsAndTeens = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'
  
  // Actual course data
  const title = t('inglishForKids.first.title')
  const heroImage = "/hero.jpg"
  const description = t('inglishForKids.first.description')
  const enrollButtonText = t('inglishForKids.first.enrollButtonText')

  // Get class types from translation
  const publicClass = {
    title: t('inglishForKids.classTypes.public.title'),
    image: "/hero.jpg",
    features: t('inglishForKids.classTypes.public.features', { returnObjects: true }),
    buttonText: t('inglishForKids.classTypes.public.buttonText')
  }

  const privateClass = {
    title: t('inglishForKids.classTypes.private.title'),
    image: "/hero.jpg",
    features: t('inglishForKids.classTypes.private.features', { returnObjects: true }),
    buttonText: t('inglishForKids.classTypes.private.buttonText')
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

        <ul className="flex flex-col gap-1 mb-8" dir={isRTL ? 'ltr' : 'ltr'}>
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

  // All available courses data
  const allCourses = [
    {
      title: "English for Adults",
      description: "Comprehensive English language program tailored for adult learners with busy schedules.",
      image: "/hero.jpg",
      href: "/courses/englishforadults",
      duration: "12-16 weeks"
    },
    {
      title: "Academic English",
      description: "Master academic English skills for university study and professional research.",
      image: "/hero.jpg", 
      href: "/courses/academicenglish",
      duration: "16-20 weeks"
    },
    {
      title: "Business English",
      description: "Master professional English communication for the global business world.",
      image: "/hero.jpg",
      href: "/courses/businessenglish",
      duration: "12-16 weeks"
    }
  ]

  const similarCourses = allCourses.filter(course => course.title !== title)

  // Reusable Feature Item Component
  const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="text-center px-4 py-2 md:py-6">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16  flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )

  // Why we are the best choice data
  const whyBestItems = t('inglishForKids.whyBest.items', { returnObjects: true })
  const whyBestChoice = [
    { icon: Users, ...whyBestItems[0] },
    { icon: Clock, ...whyBestItems[1] },
    { icon: Award, ...whyBestItems[2] },
    { icon: ChevronRight, ...whyBestItems[3] }
  ]

  // Reusable Enrollment Step Component
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

  // Enrollment steps data
  const enrollmentStepsData = t('inglishForKids.howToEnroll.steps', { returnObjects: true })
  const enrollmentSteps = enrollmentStepsData.map((step, index) => ({
    number: index + 1,
    ...step
  }))

  // Form state
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
                <div className="flex items-center gap-2">
                    <Button 
                        onClick={handleEnrollClick}
                        size={"lg"} 
                        className="md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
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
              {t('inglishForKids.second.mainTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t('inglishForKids.second.subtitle')}
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

      {/* Learn a New Language the Fun Way Section */}
      <div className="py-10 bg-muted/20 p-4">
        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
          <div className={`flex flex-col-reverse items-stretch gap-0 ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            {/* Content */}
            <div className={`w-full lg:w-1/2 flex items-center px-4 sm:px-6 ${isRTL ? 'lg:mr-10' : 'lg:ml-10'}`}>
              <div className={`w-full py-10 lg:py-24 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
                <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t('inglishForKids.funWay.title')}
                </h2>
                
                <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                  {t('inglishForKids.funWay.description')}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                <Image
                  src="/hero.jpg"
                  alt="Fun language learning for kids and teens"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why We Are The Best Choice Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('inglishForKids.whyBest.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8 lg:gap-12">
            {whyBestChoice.map((item, index) => (
              <FeatureItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Similar Courses Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('inglishForKids.similarCourses.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('inglishForKids.similarCourses.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCourses.map((course, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={`${course.title} course`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-semibold text-foreground mb-3 ${isRTL ? 'text-right' : ''}`}>
                    {course.title}
                  </h3>
                  
                  <p className={`text-muted-foreground text-sm mb-4 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {course.description}
                  </p>

                  <div className={`flex items-center justify-between text-xs text-muted-foreground mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <Link href={course.href} className="block">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors duration-200"
                      size="sm"
                    >
                      {t('inglishForKids.similarCourses.viewButton')}
                      <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="px-8 py-3">
                {t('inglishForKids.similarCourses.viewAllButton')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* How to Enroll Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('inglishForKids.howToEnroll.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('inglishForKids.howToEnroll.description')}
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
              {t('inglishForKids.requestPricing.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('inglishForKids.requestPricing.description')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* First Row: Country and Names */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="country" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.country')} {t('inglishForKids.requestPricing.form.required')}</Label>
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
                  <Label htmlFor="firstName" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.firstName')} {t('inglishForKids.requestPricing.form.required')}</Label>
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
                  <Label htmlFor="lastName" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.lastName')} {t('inglishForKids.requestPricing.form.required')}</Label>
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
                  <Label htmlFor="email" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.email')} {t('inglishForKids.requestPricing.form.required')}</Label>
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
                  <Label htmlFor="phone" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.phone')} {t('inglishForKids.requestPricing.form.required')}</Label>
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
                  <Label htmlFor="zipCode" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.zipCode')}</Label>
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
                  <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.interestedIn')} {t('inglishForKids.requestPricing.form.required')}</Label>
                  <Select onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className="w-full" >
                      <SelectValue placeholder={t('inglishForKids.requestPricing.form.selectCourse')} />
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
                    <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.classType')} {t('inglishForKids.requestPricing.form.required')}</Label>
                    <Select onValueChange={(value) => handleInputChange('classType', value)}>
                      <SelectTrigger className="w-full" >
                        <SelectValue placeholder={t('inglishForKids.requestPricing.form.selectClassType')} />
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
                    <Label className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.testType')} {t('inglishForKids.requestPricing.form.required')}</Label>
                    <Select onValueChange={(value) => handleInputChange('testType', value)}>
                      <SelectTrigger >
                        <SelectValue placeholder={t('inglishForKids.requestPricing.form.selectTestType')} />
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
                <Label htmlFor="message" className={`text-base font-medium ${isRTL ? 'items-end' : ''}`}>{t('inglishForKids.requestPricing.form.message')}</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t('inglishForKids.requestPricing.form.messagePlaceholder')}
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full min-h-[100px] px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y ${isRTL ? 'text-right' : ''}`}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={formLoading}
                >
                  {formLoading ? t('inglishForKids.requestPricing.form.submittingButton') : t('inglishForKids.requestPricing.form.submitButton')}
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

export default EnglishCourseForKidsAndTeens
