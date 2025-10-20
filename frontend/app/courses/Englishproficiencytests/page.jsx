'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight, ArrowRight } from 'lucide-react'
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
      href: "/courses/Englishproficiencytests/ieltsacademic"
    },
    {
      title: "IELTS General",
      description: "Targeted preparation for IELTS General Training with focus on practical English skills for work and migration.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      href: "/courses/Englishproficiencytests/ieltsgeneral"
    },
    {
      title: "TOEFL Preparation Course",
      description: "Complete TOEFL iBT preparation with proven strategies for Reading, Listening, Speaking, and Writing sections.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
      href: "/courses/Englishproficiencytests/toeflpreparationcourse"
    },
    {
      title: "PTE Preparation Course",
      description: "Expert coaching for PTE Academic with computer-based practice and scoring strategies for all test sections.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      href: "/courses/Englishproficiencytests/ptepreparationcourse"
    }
  ]

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestedIn: '',
  })
  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'interestedIn']
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
          course: formData.interestedIn
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

      setFormData({ firstName: '', lastName: '', email: '', interestedIn: '' })

    } catch (error) {
      toast("Connection Error", {
        description: "Unable to submit request. Please try again later."
      })
    } finally {
      setFormLoading(false)
    }
  }

  const courseOptions = [
    'IELTS Academic',
    'IELTS General',
    'TOEFL Preparation Course',
    'PTE Preparation Course'
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

      {/* Test Courses Section */}
      <div className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Test Preparation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testCourses.map((course, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={`${course.title} preparation`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <Link href={course.href} className="block">
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors duration-200"
                      size="sm"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                      <SelectValue placeholder="Select a test" />
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

              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
