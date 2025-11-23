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
import { BASE_URL_PROD } from '@/app/config/url'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslation } from 'react-i18next'

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
];

const ContactPage = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'
  const searchParams = useSearchParams()
  const [preselectedCourse, setPreselectedCourse] = useState('')
  const [selectKey, setSelectKey] = useState(0) 

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



 


  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 sm:p-8">
              <div className="mb-8">
                <h1 className={`text-3xl sm:text-4xl font-bold text-foreground mb-2 ${isRTL ? 'text-right' : ''}`}>
                  {t('enroll.title')} {preselectedCourse ? `${t('enroll.titleWithCourse')} ${preselectedCourse}` : ''}
                </h1>
                <p className={`text-muted-foreground text-lg ${isRTL ? 'text-right' : ''}`}>
                  {t('enroll.subtitle')}
                </p>
              </div>

              {/* Enrollment Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className={isRTL ? 'text-right block' : ''}>
                    {t('enroll.form.fullName')} {t('enroll.form.required')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('enroll.form.fullNamePlaceholder')}
                    {...register('name')}
                    className={`${errors.name ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}
                  />
                  {errors.name && (
                    <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field - Full Width */}
                <div className="space-y-2">
                  <Label htmlFor="email" className={isRTL ? 'text-right block' : ''}>
                    {t('enroll.form.email')} {t('enroll.form.required')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('enroll.form.emailPlaceholder')}
                    {...register('email')}
                    className={`${errors.email ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}
                  />
                  {errors.email && (
                    <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.email.message}</p>
                  )}
                </div>

                {/* Phone and Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={isRTL ? 'text-right block' : ''}>
                      {t('enroll.form.phone')} {t('enroll.form.required')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('enroll.form.phonePlaceholder')}
                      {...register('phone')}
                      className={`${errors.phone ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}
                    />
                    {errors.phone && (
                      <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className={isRTL ? 'text-right block' : ''}>
                      {t('enroll.form.age')} {t('enroll.form.required')}
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      min="5"
                      max="100"
                      placeholder={t('enroll.form.agePlaceholder')}
                      {...register('age')}
                      className={`${errors.age ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}
                    />
                    {errors.age && (
                      <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.age.message}</p>
                    )}
                  </div>
                </div>

                {/* Profession and Course Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Profession with Tooltip */}
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Label className={isRTL ? 'text-right' : ''}>{t('enroll.form.profession')} {t('enroll.form.required')}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-5 h-5 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center cursor-help hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors">
                              <Info className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{t('enroll.form.professionTooltip')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select onValueChange={(value) => setValue('profession', value)}>
                      <SelectTrigger className={`${errors.profession ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}>
                        <SelectValue placeholder={t('enroll.form.professionPlaceholder')} />
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
                      <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.profession.message}</p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-2">
                    <Label className={isRTL ? 'text-right block' : ''}>{t('enroll.form.course')} {t('enroll.form.required')}</Label>
                    <Select 
                      key={selectKey}
                      onValueChange={(value) => setValue('course', value)} 
                      defaultValue={watch('course')}
                    >
                      <SelectTrigger className={`${errors.course ? 'border-destructive focus:ring-destructive' : ''} ${isRTL ? 'text-right' : ''}`}>
                        <SelectValue placeholder={t('enroll.form.coursePlaceholder')} />
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
                      <p className={`text-sm text-destructive ${isRTL ? 'text-right' : ''}`}>{errors.course.message}</p>
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
                  {isSubmitting ? t('enroll.form.submittingButton') : t('enroll.form.submitButton')}
                </Button>
              </form>

              {/* Info Message */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className={`text-sm text-muted-foreground text-center ${isRTL ? 'text-right' : ''}`}>
                  {t('enroll.infoMessage')}
                </p>
              </div>
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





