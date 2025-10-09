'use client'

import React, { useState } from 'react'
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

// Class type data
const classTypes = [
  {
    title: "Public Classes",
    image: "/hero.jpg",
    features: [
      "Live Online classes",
      "For ages 5-17",
      "Small groups (3-5 learners only)",
      "Practice with AI companion",
      "Fun games and interactive lessons backed by Tutelage Method",
      "Age-specific for top results",
      "Certificate of completion",
      "32 lessons per course"
    ]
  },
  {
    title: "Private Classes",
    image: "/hero.jpg",
    features: [
      "Live Online classes",
      "For ages 5-17",
      "One-on-one lessons (1 learner only)",
      "Designed course for each learner",
      "Practice with AI companion",
      "Fun games and interactive lessons backed by Tutelage Method",
      "Certificate of completion",
      "Flexibility in time and schedule",
      "16 lessons"
    ]
  }
]




// All available courses data
const allCourses = [
  {
    title: "English for Kids and Teens",
    description: "Engaging and interactive English learning program designed specifically for young learners.",
    image: "/hero.jpg",
    href: "/courses/englishforkids",
    level: "A1-B2",
    duration: "10-14 weeks"
  },
  {
    title: "English for Adults",
    description: "Comprehensive English language program tailored for adult learners with busy schedules.",
    image: "/hero.jpg",
    href: "/courses/englishforadults",
    level: "A1-C2",
    duration: "12-16 weeks"
  },
  {
    title: "Academic English",
    description: "Master academic English skills for university study and professional research.",
    image: "/hero.jpg", 
    href: "/courses/academicenglish",
    level: "B2-C2",
    duration: "16-20 weeks"
  },
  {
    title: "Business English",
    description: "Master professional English communication for the global business world.",
    image: "/hero.jpg",
    href: "/courses/businessenglish",
    level: "B1-C2", 
    duration: "12-16 weeks"
  }
]


const SingleCoursePage = ({ courseData }) => {
  const router = useRouter()
  
  const { 
    title, 
    heroImage, 
    description, 
    duration, 
    level, 
    maxStudents, 
    certificate,
    enrollButtonText = "Enroll Now",
    backLink = "/courses"
  } = courseData


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
      <Button 
        onClick={handleEnrollClick}
        size="lg" 
        className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Enroll Now
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
)


  const handleEnrollClick = () => {
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }


  // Filter out the current course from similar courses
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
  const whyBestChoice = [
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from qualified native English speakers with years of teaching experience and proven track records."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Choose from multiple time slots that fit your busy lifestyle with options for weekend and evening classes."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Join thousands of successful students who have achieved their English learning goals with our effective methods."
    },
    {
      icon: ChevronRight,
      title: "Interactive Learning",
      description: "Experience engaging lessons with modern teaching techniques, games, and real-world conversation practice."
    }
  ]

  // Reusable Enrollment Step Component
  const EnrollmentStep = ({ number, title, description }) => (
    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 border border-border rounded-lg px-6 py-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
      {/* Number Circle */}
      <div className="mb-10 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
          <span className="text-white text-2xl font-bold">
            {number}
          </span>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )

  // Enrollment steps data
  const enrollmentSteps = [
    {
      number: 1,
      title: "Register",
      description: "Create a free account as a student to access our platform and begin your English learning journey with us."
    },
    {
      number: 2,
      title: "Perform Placement Test",
      description: "Check your current level of English proficiency with our comprehensive assessment to find the perfect starting point."
    },
    {
      number: 3,
      title: "Arrange Lessons",
      description: "Buy the course and get full access to our platform with personalized learning materials and expert guidance."
    },
    {
      number: 4,
      title: "Start the Fun",
      description: "Join classes and learn according to your course schedule with interactive lessons and engaging activities."
    }
  ]

  // Form state for pricing request
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

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset class type and test type when course changes
      ...(field === 'interestedIn' && { classType: '', testType: '' })
    }))
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Basic validation
      const requiredFields = ['countryOfResidence', 'firstName', 'lastName', 'email', 'phone', 'interestedIn']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        toast("Please fill in all required fields", { variant: "destructive" })
        return
      }

      // Send to enrollment API (same as the enrollment form)
      const response = await fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          age: '18', // Default for pricing request
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

      // Reset form
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

  // Course options
  const courseOptions = [
    'English for Kids and Teens',
    'English for Adults', 
    'Academic English',
    'Business English',
    'English Proficiency Tests'
  ]

  // Class type options (for most courses except proficiency tests)
  const classTypeOptions = [
    'Private Classes',
    'Public Classes',
    'In-person Classes'
  ]

  // Test type options (for English Proficiency Tests)
  const testTypeOptions = [
    'IELTS Academic',
    'IELTS General',
    'IELTS for UKVI', 
    'IELTS Life Skills',
    'TOEFL',
    'PTE',
    'OET'
  ]

  // Check if selected course needs class type or test type
  const showClassType = formData.interestedIn && formData.interestedIn !== 'English Proficiency Tests'
  const showTestType = formData.interestedIn === 'English Proficiency Tests'

  return (
    <div className="relative min-h-screen bg-background pt-4">
       {/* Header Section */}
      <div className="bg-background ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            {/* Title */}
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
              Let English Language be their superpower
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Start your Language journey with Tutelage
            </p>
          </div>

          {/* Class Type Cards - Mapped */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {classTypes.map((classType, index) => (
              <ClassCard key={index} classType={classType} />
            ))}
          </div>
        </div>
      </div>

      {/* Learn a New Language the Fun Way Section */}
      <div className="py-10 bg-muted/20">
        <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
              <div className="w-full py-16 lg:py-24 lg:pr-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Learn a New Language the Fun Way
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Tutelage classes for kids and teens use research-proven methods to 
                  deliver age-specific, interactive lessons that make learning engaging 
                  and effective. Small groups of 3–5 students allow personalized 
                  attention from experienced teachers. Fun games, creative activities, 
                  and continuous feedback help every student reach their full 
                  potential. In a safe online environment with certificates of 
                  completion.
                </p>
              </div>
            </div>

            {/* Right Image */}
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
              Why we are the best choice
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
              Similar Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore other English courses that might interest you and complement your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCourses.map((course, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Course Image */}
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

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    {/* <div className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {course.level}
                    </div> */}
                  </div>

                  {/* View Course Button */}
                  <Link href={course.href} className="block">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors duration-200"
                      size="sm"
                    >
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Courses Button */}
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="px-8 py-3">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
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
      <div className="py-20 bg-muted/20">
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

              {/* Second Row: Email (full width), Phone, Zip Code */}
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

                {/* Conditional selectors based on course selection */}
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

export default SingleCoursePage
