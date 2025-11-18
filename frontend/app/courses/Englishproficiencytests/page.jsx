'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'

const EnglishProficiencyTestsPage = () => {
  const router = useRouter()
  
  const title = "English Proficiency Tests"
  const heroImage = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
  const description = "Tutelage's specialized English proficiency tests preparations are designed to secure your personal and academic future abroad. We provide strategies and expert coaching you need to achieve your target scores for university admissions outside your country, professional registration or UKVI. Our comprehensive programs ensure you're fully prepared for success."
  const enrollButtonText = "Enroll Now"

  const handleEnrollClick = () => {
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }

  // Test preparation courses
  const testCourses = [
    {
      title: "IELTS Academic",
      description: "Comprehensive preparation for IELTS Academic test covering all four skills with expert strategies and practice materials.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
      href: "/courses/Englishproficiencytests/ieltsacademic",
      features: [
        "Comprehensive coverage of all four IELTS sections",
        "Practice with authentic IELTS materials",
        "Personalized feedback from expert instructors",
        "Proven strategies for each test component"
      ]
    },
    {
      title: "IELTS General Training",
      description: "Targeted preparation for IELTS General Training with focus on practical English skills for work and migration.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      href: "/courses/Englishproficiencytests/ieltsgeneral",
      features: [
        "Focus on practical English for everyday situations",
        "Targeted preparation for migration and work visa requirements",
        "Expert guidance on all four test components",
        "Practice with authentic General Training materials"
      ]
    },
    {
      title: "TOEFL Preparation Course",
      description: "Complete TOEFL iBT preparation with proven strategies for Reading, Listening, Speaking, and Writing sections.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
      href: "/courses/Englishproficiencytests/toeflpreparationcourse",
      features: [
        "Master the computer-based TOEFL format",
        "Comprehensive training in all four sections",
        "Proven test-taking strategies",
        "Extensive practice with authentic materials"
      ]
    },
    {
      title: "PTE Preparation Course",
      description: "Expert coaching for PTE Academic with computer-based practice and scoring strategies for all test sections.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      href: "/courses/Englishproficiencytests/ptepreparationcourse",
      features: [
        "Specialized computer-based testing preparation",
        "Understanding of automated scoring algorithm",
        "Practice with PTE-style questions",
        "Fast results and global recognition"
      ]
    }
  ]

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestedIn: '',
    testType: '',
    classPreference: ''
  })
  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'interestedIn', 'testType', 'classPreference']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        toast("Please fill in all required fields", { variant: "destructive" })
        return
      }

      const response = await fetch(`${BASE_URL}/api/enrollment/pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          course: `${formData.interestedIn} - ${formData.testType} - ${formData.classPreference}`
        })
      })

      const result = await response.json()

      if (!response.ok) {
        toast("Request Failed", {
          description: result.message || 'Please check your information and try again'
        })
        return
      }

      toast("Pricing Information Sent! 🎉", {
        description: "Check your email for detailed course information and pricing"
      })

      setFormData({ firstName: '', lastName: '', email: '', interestedIn: '', testType: '', classPreference: '' })

    } catch (error) {
      toast("Connection Error", {
        description: "Unable to submit request. Please try again later."
      })
    } finally {
      setFormLoading(false)
    }
  }

  const courseOptions = [
    'English Proficiency Test Preparation'
  ]

  const testTypeOptions = [
    'IELTS Academic',
    'IELTS General',
    'TOEFL',
    'PTE'
  ]

  const classPreferenceOptions = [
    'Group class',
    'Private classes'
  ]

  return (
    <div className="relative min-h-screen bg-background pt-4">
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
            <div className="flex-shrink-0">
              <div className="p-4">
                <Button
                  onClick={handleEnrollClick}
                  size="lg"
                  className="md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {enrollButtonText}
                  <ChevronRight className="w-6 h-6 ml-3" />
                </Button>
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

      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Test Preparation
          </h2>
        </div>
      </div>

      {/* Test Courses Sections */}
      {testCourses.map((course, index) => {
        const isEven = index % 2 === 0
        return (
          <div key={index} className="py-10 px-4">
            <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem]">
              <div className={`flex flex-col-reverse ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-0`}>
                {/* Content */}
                <div className={`w-full lg:w-1/2 flex items-center px-4 sm:px-6 ${isEven ? 'lg:ml-10' : 'lg:mr-10'}`}>
                  <div className={`w-full py-10 lg:py-0 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                      {course.title}
                    </h2>
                    
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {course.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-foreground font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Button */}
                    <Link href={course.href}>
                      <Button 
                        size="lg" 
                        className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
        
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className={`object-cover ${isEven ? 'lg:rounded-tr-[4rem]' : 'lg:rounded-tl-[4rem]'} max-lg:rounded-tl-[2rem]`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Request Pricing Section */}
      <div className="py-20 bg-background" id="form-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Request Pricing and Course Information
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our test preparation programs.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="firstName" className="text-base font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="lastName" className="text-base font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <Label className="text-base font-medium">
                    I'm Interested In *
                  </Label>
                  <Select value={formData.interestedIn} onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select course" />
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label className="text-base font-medium">
                    Test Type *
                  </Label>
                  <Select value={formData.testType} onValueChange={(value) => handleInputChange('testType', value)}>
                    <SelectTrigger className="w-full">
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

                <div className="flex flex-col gap-1 items-start">
                  <Label className="text-base font-medium">
                    I Prefer *
                  </Label>
                  <Select value={formData.classPreference} onValueChange={(value) => handleInputChange('classPreference', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {classPreferenceOptions.map((preference) => (
                        <SelectItem key={preference} value={preference}>
                          {preference}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 py-4 cursor-pointer text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={formLoading}
                >
                  {formLoading ? 'Submitting Request...' : 'Request Pricing'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnglishProficiencyTestsPage
