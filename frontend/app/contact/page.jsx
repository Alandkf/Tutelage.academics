// Contact page component - handles contact form submissions and displays contact information
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, GraduationCap, FileText, Target, Info } from 'lucide-react'
import Link from 'next/link'
import BASE_URL from '@/app/config/url'
import { BASE_URL_PROD } from '@/app/config/url'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Contact form schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
  topic: z.string().min(1, "Topic is required").min(5, "Topic must be at least 5 characters"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters")
})

const ContactPage = () => {
  const searchParams = useSearchParams()
  const [preselectedCourse, setPreselectedCourse] = useState('')
  const [selectKey, setSelectKey] = useState(0) 
  const [loading, setLoading] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      topic: '',
      message: ''
    }
  })

  const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
    'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
    'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ]

  // Get course from URL parameters
  useEffect(() => {
    const courseParam = searchParams.get('course')
    
    if (courseParam) {
      const decodedCourse = decodeURIComponent(courseParam)
      
      if (courses.includes(decodedCourse)) {
        setPreselectedCourse(decodedCourse)
        reset({
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          topic: '',
          message: decodedCourse
        })
        setSelectKey(prev => prev + 1)
      } else {
        const matchedCourse = courses.find(course => 
          course.toLowerCase() === decodedCourse.toLowerCase()
        )
        if (matchedCourse) {
          setPreselectedCourse(matchedCourse)
          reset({
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            topic: '',
            message: matchedCourse
          })
          setSelectKey(prev => prev + 1)
        }
      }
    }
  }, [searchParams, reset])

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      
      const response = await fetch(`${BASE_URL}/api/enrollment/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        toast("Message Failed", {
          description: result.message || 'Please check your information and try again'
        });
        return;
      }
      
      if (result.warning) {
        toast("Message Submitted", {
          description: result.message 
        });
      } else {
        toast("Message sent Successfully", {
          description: "Check your email for confirmation details"
        });
      }
      
      setShowSuccessDialog(true)
      
      setValue('firstName', '')
      setValue('lastName', '')
      setValue('email', '')
      setValue('country', '')
      setValue('topic', '')
      if (!preselectedCourse) {
        setValue('message', '')
      }
      
    } catch (error) {
      console.error('Contact error:', error)
      
      toast("Connection Error", {
        description: "Unable to submit contact form. Please check your internet connection and try again."
      });
      
    } finally {
      setLoading(false)
    }
  }



 


  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 sm:p-8">
              <div className="mb-8">
                <h1 className={`text-3xl sm:text-4xl font-bold text-foreground mb-2`}>
                  Enroll Now{preselectedCourse ? ` for ${preselectedCourse}` : ''}
                </h1>
                <p className={`text-muted-foreground text-lg`}>
                  Fill out the form below to get started with your English learning journey.
                </p>
              </div>

              {/* Enrollment Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      {...register('firstName')}
                      className={`${errors.firstName ? 'border-destructive focus:ring-destructive' : ''}`}
                    />
                    {errors.firstName && (
                      <p className={`text-sm text-destructive`}>{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      {...register('lastName')}
                      className={`${errors.lastName ? 'border-destructive focus:ring-destructive' : ''}`}
                    />
                    {errors.lastName && (
                      <p className={`text-sm text-destructive`}>{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email and Country Field - Full Width */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country *
                    </Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.country && (
                      <p className={`text-sm text-destructive`}>{errors.country.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="email">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email')}
                      className={`${errors.email ? 'border-destructive focus:ring-destructive' : ''}`}
                    />
                    {errors.email && (
                      <p className={`text-sm text-destructive`}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Topic Field */}
                <div className="space-y-2">
                  <Label htmlFor="topic">
                    Topic *
                  </Label>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="What would you like to discuss?"
                    {...register('topic')}
                    className={`${errors.topic ? 'border-destructive focus:ring-destructive' : ''}`}
                  />
                  {errors.topic && (
                    <p className={`text-sm text-destructive`}>{errors.topic.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    {...register('message')}
                    className={`w-full mt-2 rounded-md border border-border bg-background text-foreground p-2 min-h-[120px] resize-none ${errors.message ? 'border-destructive focus:ring-destructive' : ''}`}
                    placeholder="Tell us more about your inquiry"
                  />
                  {errors.message && (
                    <p className={`text-sm text-destructive`}>{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Tutelage AI CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Try Tutelage AI
                </CardTitle>
                <CardDescription>
                  Experience our advanced AI-powered learning platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enhance your learning with intelligent assistance, smart recommendations, and real-time guidance.
                </p>
                <Link href={BASE_URL_PROD} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">
                    Launch AI Platform
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* English Level Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Find Your English Level
                </CardTitle>
                <CardDescription>
                  Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/tutelage-tests/free-practice-test">
                  <Button variant="outline" className="w-full mb-3">
                    Take Free Test
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Other Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Practice Tests
                </CardTitle>
                <CardDescription>
                  Improve your skills with our comprehensive test collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/tutelage-tests/language-placement">
                  <Button variant="ghost" className="w-full text-sm justify-start">
                    Language Placement Test
                  </Button>
                </Link>
                <Link href="/tutelage-tests/mock-exam">
                  <Button variant="ghost" className="w-full text-sm justify-start">
                    Mock Exams
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Course Enrollment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Enroll in Courses
                </CardTitle>
                <CardDescription>
                  Start your English learning journey today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose from our wide range of English courses designed for all levels and purposes.
                </p>
                <Link href="/courses">
                  <Button variant="outline" className="w-full">
                    Browse Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      
    </div>
    
  )
}

export default ContactPage





