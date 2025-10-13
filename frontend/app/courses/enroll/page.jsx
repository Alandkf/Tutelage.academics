'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, GraduationCap, FileText, Target, Info } from 'lucide-react'
import Link from 'next/link'
import BASE_URL from '@/app/config/url'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Form validation schema
const enrollmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  age: z.string().min(1, 'Age is required').refine((val) => {
    const num = parseInt(val)
    return num >= 5 && num <= 100
  }, 'Age must be between 5 and 100'),
  profession: z.string().min(1, 'Please select your profession'),
  course: z.string().min(1, 'Please select a course')
})

// Available courses
const courses = [
  'English for Kids and Teens',
  'English for Adults',
  'Academic English',
  'English Proficiency Tests',
  'Business English'
]

// Profession options
const professionOptions = [
  'Kindergarten Student',
  'School Student',
  'Undergraduate',
  'Graduate',
  'Postgraduate',
  'Employed',
  'Unemployed'
]

const EnrollPage = () => {
  const searchParams = useSearchParams()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [preselectedCourse, setPreselectedCourse] = useState('')
  const [selectKey, setSelectKey] = useState(0) 
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      age: '',
      profession: '',
      course: ''
    }
  })

  // Get course from URL parameters
  useEffect(() => {
    const courseParam = searchParams.get('course')
    
    if (courseParam) {
      const decodedCourse = decodeURIComponent(courseParam)
      
      if (courses.includes(decodedCourse)) {
        setPreselectedCourse(decodedCourse)
        reset({
          name: '',
          email: '',
          phone: '',
          age: '',
          profession: '',
          course: decodedCourse
        })
        setSelectKey(prev => prev + 1)
      } else {
        const matchedCourse = courses.find(course => 
          course.toLowerCase() === decodedCourse.toLowerCase()
        )
        if (matchedCourse) {
          setPreselectedCourse(matchedCourse)
          reset({
            name: '',
            email: '',
            phone: '',
            age: '',
            profession: '',
            course: matchedCourse
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
      
      const response = await fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        toast("Enrollment Failed", {
          description: result.message || 'Please check your information and try again'
        });
        return;
      }
      
      if (result.warning) {
        toast("Enrollment Submitted", {
          description: result.message || 'Your application has been received successfully'
        });
      } else {
        toast("Enrollment Successful! 🎉", {
          description: "Check your email for confirmation details"
        });
      }
      
      setShowSuccessDialog(true)
      
      setValue('name', '')
      setValue('email', '')
      setValue('phone', '')
      setValue('age', '')
      setValue('profession', '')
      if (!preselectedCourse) {
        setValue('course', '')
      }
      
    } catch (error) {
      console.error('Enrollment error:', error)
      
      toast("Connection Error", {
        description: "Unable to submit enrollment. Please check your internet connection and try again."
      });
      
    } finally {
      setLoading(false)
    }
  }

  const redirectAfterSuccess = () => {
      setShowSuccessDialog(false)
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 sm:p-8">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Enroll {preselectedCourse ? `in ${preselectedCourse}` : 'in Course'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Take the first step towards mastering English. Fill out the form below and we'll get in touch with you soon.
                </p>
              </div>

              {/* Enrollment Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive focus:ring-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field - Full Width */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email')}
                    className={errors.email ? 'border-destructive focus:ring-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone and Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register('phone')}
                      className={errors.phone ? 'border-destructive focus:ring-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="5"
                      max="100"
                      placeholder="Enter your age"
                      {...register('age')}
                      className={errors.age ? 'border-destructive focus:ring-destructive' : ''}
                    />
                    {errors.age && (
                      <p className="text-sm text-destructive">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                {/* Profession and Course Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Profession with Tooltip */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Profession *</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-5 h-5 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center cursor-help hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors">
                              <Info className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Choose the option that best describes your current education or work status.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select onValueChange={(value) => setValue('profession', value)}>
                      <SelectTrigger className={errors.profession ? 'border-destructive focus:ring-destructive' : ''}>
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionOptions.map((profession) => (
                          <SelectItem key={profession} value={profession}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.profession && (
                      <p className="text-sm text-destructive">{errors.profession.message}</p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-2">
                    <Label>Course *</Label>
                    <Select 
                      key={selectKey}
                      onValueChange={(value) => setValue('course', value)} 
                      defaultValue={watch('course')}
                    >
                      <SelectTrigger className={errors.course ? 'border-destructive focus:ring-destructive' : ''}>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.course && (
                      <p className="text-sm text-destructive">{errors.course.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                </Button>
              </form>

              {/* Info Message */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Please fill out this form to enroll in your chosen course. Our team will contact you as soon as possible 
                  via email or phone to discuss your learning goals and schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Other Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Explore Other Courses
                </CardTitle>
                <CardDescription>
                  Discover more ways to improve your English
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.filter(course => course !== preselectedCourse).slice(0, 2).map((course) => {
                  const getHref = (courseName) => {
                    switch(courseName) {
                      case 'English for Kids and Teens':
                        return '/courses/englishforkids';
                      case 'English for Adults':
                        return '/courses/englishforadults';
                      case 'Academic English':
                        return '/courses/academicenglish';
                      case 'English Proficiency Tests':
                        return '/courses/Englishproficiencytests';
                      case 'Business English':
                        return '/courses/businessenglish';
                      default:
                        return '/courses';
                    }
                  };

                  const getImage = (courseName) => {
                    switch(courseName) {
                      case 'English for Kids and Teens':
                        return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80';
                      case 'English for Adults':
                        return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80';
                      case 'Academic English':
                        return 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&q=80';
                      case 'English Proficiency Tests':
                        return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80';
                      case 'Business English':
                        return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80';
                      default:
                        return '/hero.jpg';
                    }
                  };

                  const getDescription = (courseName) => {
                    switch(courseName) {
                      case 'English for Kids and Teens':
                        return 'Engaging and interactive English learning program designed specifically for young learners.';
                      case 'English for Adults':
                        return 'Comprehensive English language program tailored for adult learners with busy schedules.';
                      case 'Academic English':
                        return 'Master academic English skills for university study and professional research.';
                      case 'English Proficiency Tests':
                        return 'Prepare for IELTS, TOEFL, PTE, and other international English proficiency tests.';
                      case 'Business English':
                        return 'Master professional English communication for the global business world.';
                      default:
                        return 'Explore this English course to enhance your language skills.';
                    }
                  };

                  return (
                    <Link key={course} href={getHref(course)}>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 mb-2 rounded-lg hover:bg-muted/70 transition-colors duration-200 cursor-pointer">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={getImage(course)}
                            alt={`${course} course`}
                            fill
                            quality={100}
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
                            {course}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {getDescription(course)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
                <Link href="/courses">
                  <Button variant="outline" className="w-full mt-4">
                    View All Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tutelage AI CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Try Tutelage AI
                </CardTitle>
                <CardDescription>
                  Powerful tutoring AI designed for English learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Experience our AI-powered English tutor that helps you learn and speak more confidently. 
                  Practice conversations, get instant feedback, and improve faster.
                </p>
                <Link href="https://tutelage.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">
                    Launch Tutelage AI
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* English Level Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Find Your Level
                </CardTitle>
                <CardDescription>
                  Discover your English proficiency level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Take our comprehensive language placement test to determine your current English level 
                  and get personalized course recommendations.
                </p>
                <Link href="/tutelagetests/languageplacement">
                  <Button variant="outline" className="w-full mb-3">
                    Take Placement Test
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
                  Test your skills with our practice exams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/tutelagetests/practicetests">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Free Practice Tests
                  </Button>
                </Link>
                <Link href="/tutelagetests/mockexams">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    International Mock Tests
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-green-600 dark:text-green-400">
              Enrollment Successful! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-4">
              Thank you for enrolling with Tutelage! We have successfully received your application.
              <br /><br />
              Our team will be in touch with you via email or phone number within 24 hours to discuss 
              your learning goals and help you get started on your English learning journey.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={redirectAfterSuccess}>
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EnrollPage