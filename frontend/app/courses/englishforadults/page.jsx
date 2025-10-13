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

// Class type data
const classTypes = [
  {
    title: "Public Classes",
    image: "/hero.jpg",
    features: [
      "Live online classes",
      "Practice your language in small groups (3-5) students only",
      "Thorough language placement test",
      "Detailed curriculum backed by Tutelage Method designed to deliver a real-life language exposure to you",
      "Continuous feedback on your fluency and accuracy progress",
      "Course duration is 5 consecutive weeks, 15 classes, more than 22 hours of real conversation with our experienced instructors",
      "Tutelage's certificate of participation"
    ]
  },
  {
    title: "Private Classes",
    image: "/hero.jpg",
    features: [
      "Live online class",
      "A Dedicated experienced instructor with full studying support throughout your course",
      "Extra daily materials delivered via a private group with the instructor",
      "The flexibility of creating your own studying package",
      "Tutelage AI: Your personalized 24/7 practice partner, providing instant feedback and customized conversation exercises outside of class time"
    ]
  }
]



const EnglishForAdultsPage = () => {
  const router = useRouter()
  
  const title = "English for Adults"
  const heroImage = "/hero.jpg"
  const description = "Comprehensive English language program tailored specifically for adult learners with busy schedules. Our flexible approach combines professional instruction, real-world conversation practice, and modern teaching methods to help you achieve fluency and confidence in English communication."
  const enrollButtonText = "Enroll Now"

  // Reusable Class Card Component
  const ClassCard = ({ classType }) => (
    <div className="bg-card border border-border rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-72 sm:h-96">
        <Image
          src={classType.image}
          alt={`${classType.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          {classType.title}
        </h3>

        {/* Features List */}
        <ul className="flex flex-col items-start justify-start gap-1 mb-8">
          {classType.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0`}></div>
              <span className="text-foreground font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href={"#form-section"}>
          <Button 
            size="lg" 
            className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Request Price
            <ChevronRight className="ml-2 w-5 h-5" />
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

  const enrollmentSteps = [
    {
      number: 1,
      title: "Request Payment",
      description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
    },
    {
      number: 2,
      title: "Enroll",
      description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
    },
    {
      number: 3,
      title: "Placement Test",
      description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
    },
    {
      number: 4,
      title: "Start Learning",
      description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
    }
  ]

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

  const faqs = [
    {
      question: "What level of English do I need to enroll in the course?",
      answer: "The courses are organized based on the student's level. It is required from you to go through a language placement test before starting. This ensures we place you in the group that matches your level or helps the private tutor to tailor the curriculum based on your needs."
    },
    {
      question: "How is the class structure designed to be interactive and engaging?",
      answer: "Tutelage classes are both designed and taught in interactive and creative ways. Our experienced instructors encourage and guide the students to incorporate their first language skills into their second language learning. Then implement many lively activities such as: guiding discussions through group and pair work alongside many dynamic activities that maximize your speaking time inside the classroom."
    },
    {
      question: "What is the Tutelage Method, and how does it ensure real-life language exposure?",
      answer: "The Tutelage Method is backed by intensive research written by Tutelage's academic staff in 2022 it includes a detailed curriculum and a full educational framework backing our courses. It is specifically designed to move beyond textbook exercises and provide you with language skills and scenarios relevant to real-life situations, making sure you can confidently use what you learn immediately outside of the classroom."
    },
    {
      question: "What kind of feedback will I receive on my progress?",
      answer: "You will receive continuous feedback from your experienced instructors on both your fluency (how smoothly you speak) and your accuracy (grammar and vocabulary use), helping you clearly understand and track your improvements throughout the entire course. It doesn't matter whether you have enrolled in a group or private course, you are going to receive necessary feedback in both classes."
    },
    {
      question: "Will I receive a certificate after completing the course?",
      answer: "Yes, all participants who successfully complete the course will receive a Tutelage's certificate of participation to officially recognize your progress and achievement."
    }
  ]

  return (
    <div className="relative min-h-screen bg-background pt-4">
      {/* Header Section */}
      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
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
                    <ChevronRight className="md:ml-3 w-6 h-6" />
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
          <p className="text-lg text-muted-foreground leading-relaxed">
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
              Let English be your superpower
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Reach fluency in no time
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
              In-Person Classes
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our in-person classes available at specific locations, offering the same 
              quality and personalized experience as our online programs, with the added 
              benefit of face-to-face interaction and a collaborative learning atmosphere.
            </p>
          </div>

          {/* Contact Information */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-6 text-center">
              Contact us for more information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone 1 */}
              <a
                href="tel:+9647501534240"
                className="flex items-center justify-center space-x-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg p-6 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">(964+) 07501534240</span>
              </a>
              
              {/* Phone 2 */}
              <a
                href="tel:+9647701946364"
                className="flex items-center justify-center space-x-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg p-6 transition-all duration-300 group"
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
          <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
              <div className="w-full py-10 lg:py-24 lg:pr-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                  Learn a new language in an interactive way
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Join our live online Adult ESL classes and start speaking with confidence! Our 
                  courses—available for both small groups (3-5 students) and private study—are 
                  designed and taught interactively to maximize your real-life conversation time. 
                  We provide a thorough language placement test and use the Tutelage Method 
                  for a detailed, effective curriculum with continuous feedback on your progress. 
                  Private students get a dedicated instructor, flexible packages, and Tutelage AI, a 
                  personalized 24/7 practice partner outside of class. All participants receive a 
                  certificate of participation. Don't miss this chance to become one of our success 
                  stories!
                </p>
              </div>
            </div>

            {/* Right Image */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              About Tutelage's English for Adults courses
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
                  className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base font-semibold text-foreground pr-4">
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
                        <p className="text-muted-foreground leading-relaxed pl-9">
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
              How to Enroll?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join thousands of learners worldwide and learn the English language with 
              ease in the most fun and interactive ways.
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
              Request Pricing and Course Information
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, 
              and to get more information about our language programs.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* First Row: Country and Names */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="country" className="text-base font-medium">Country of Residence *</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Enter your country"
                    value={formData.countryOfResidence}
                    onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="firstName" className="text-base font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="lastName" className="text-base font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Second Row: Email, Phone, Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                <div className="sm:col-span-3 flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label htmlFor="zipCode" className="text-base font-medium">Zip Code</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Zip code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                </div>
              </div>

              {/* Third Row: Course Interest and Additional Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6">
                <div className="flex flex-col items-start justify-start gap-1">
                  <Label className="text-base font-medium">I'm Interested In *</Label>
                  <Select onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className={"w-full"} >
                      <SelectValue placeholder="Select a course" />
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
                  <div className="flex flex-col  items-start justify-start gap-1">
                    <Label className="text-base font-medium">Class Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('classType', value)}>
                      <SelectTrigger className={`w-full`} >
                        <SelectValue placeholder="Select class type" />
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
                  <div className="flex flex-col items-start justify-start gap-1">
                    <Label className="text-base font-medium">Test Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('testType', value)}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select test type" />
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
              <div className="flex flex-col items-start justify-start gap-1">
                <Label htmlFor="message" className="text-base font-medium">Message (Optional)</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us more about your learning goals or any questions you have..."
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full min-h-[100px] px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y"
                />
              </div>

              {/* Information Points */}
              <div className="">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">
                      Our enrollment team will respond to your inquiry via email or phone as soon as possible
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">
                      Please check your email and phone for our response within 24 hours
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
                  {formLoading ? 'Submitting Request...' : 'Request Pricing'}
                  <ChevronRight className="ml-2 w-5 h-5" />
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
