'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight, Pen, MessageCircle, BookOpen, Headphones, BookMarked, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { useTranslation } from 'react-i18next'

const AcademicEnglishPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'


  const title = "Academic English"
  const heroImage = "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1200&q=80" 
  const description = "Master academic English skills essential for university success. Our comprehensive program prepares you for academic writing, research, presentations, and critical analysis in English. Perfect for students planning to study abroad or pursue higher education in English-speaking institutions."
  const enrollButtonText = "Enroll Now"


    // Get class types from translation
const publicClass = {
  title: "Group Classes",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", 
  features: [
    "Live online academic sessions", 
    "Small groups of 3 learners only", 
    "Focus on writing", 
    "reading, and speaking",
    "Placement test for accurate level",
    "Continuous feedback on performance",
    "Five-week structured course",
    "Tutelage certificate awarded"
  ],
  buttonText: "Request Price"
}

const privateClass = {
  title: "Private Classes",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", 
  features: [
    "One-on-one academic instruction", 
    "Personalized study plan and guidance", 
    "Daily materials and feedback", 
    "Flexible scheduling options",
    "Tutelage AI for 24/7 practice",
    "Progress tracking and support",
    "Tutelage certificate awarded",
  ],
  buttonText: "Request Price"
}

const inPersonClass = {
  title: "in-Person Classes",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", 
  features: [
    "Face-to-face academic learning", 
    "Small, interactive classroom setting", 
    "Emphasis on real communication skills", 
    "Academic writing and discussion focus",
    "Immediate instructor support and feedback",
    "Immersive, collaborative environment",
    "Tutelage certificate upon completion",
  ],
  buttonText: "Request Price"
}

    const classTypes = [publicClass, privateClass, inPersonClass]

    const ClassCard = ({ classType }) => (
    <div className="bg-card border border-border rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-72 sm:h-60">
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

   const ProgramCoverItems = [
      { title : "Academic Writing", description: "Develop clear and effective essays, reports, and academic projects."},
      { title : "Speaking Skills", description: " Gain confidence in presentations, discussions, and interviews." },
      { title : "Reading Comprehension", description: "Learn to analyze and understand academic texts and articles." },
      { title : "Listening Skills", description: "Improve your ability to follow lectures and professional conversations." },
      { title : "Vocabulary Development", description: "Expand your academic and workplace vocabulary." },
      { title : "Grammar and Accuracy", description: "Refine your communication for clarity and correctness." },
   ]
  const ProgramCover = [
    { icon: Pen, ...ProgramCoverItems[0] },
    { icon: MessageCircle, ...ProgramCoverItems[1] },
    { icon: BookOpen, ...ProgramCoverItems[2] },
    { icon: Headphones, ...ProgramCoverItems[3] },
    { icon: BookMarked, ...ProgramCoverItems[4] },
    { icon: CheckCircle, ...ProgramCoverItems[5] }
  ]
  
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

   // Form state - simplified for pricing request
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestedIn: '',
  })
  const [formLoading, setFormLoading] = useState(false)

    const courseOptions = [
    'English for Kids and Teens',
    'English for Adults', 
    'Academic English',
    'Business English',
    'English Proficiency Tests'
  ]
  
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
        headers: {
          'Content-Type': 'application/json',
        },
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

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        interestedIn: '',
      })

    } catch (error) {
      toast("Connection Error", {
        description: "Unable to submit request. Please try again later."
      })
    } finally {
      setFormLoading(false)
    }
  }

  
  return (
    <>
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


        {/* Tutelage acdemic english program section */}
              <div className="py-10 p-4">
                <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
                  <div className={`flex flex-col-reverse items-stretch gap-0 ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                    {/* Content */}
                    <div className={`w-full lg:w-1/2 flex items-center px-4 sm:px-6 ${isRTL ? 'lg:mr-10' : 'lg:ml-10'}`}>
                      <div className={`w-full py-10 lg:py-24 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
                        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6 ${isRTL ? 'text-right' : ''}`}>
                            Tutelage’s Academic English Program
                        </h2>
                        
                        <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                            Tutelage’s Academic English Program provides deep and practical insight into your
                            academic and professional journey. It is designed to help learners strengthen their
                            English proficiency for both workplace communication and higher-education
                            success, ensuring you can confidently express ideas in any academic or
                            professional setting. With personalized guidance, engaging lessons, and
                            continuous feedback, you’ll develop the skills needed to excel in university
                            studies, research, and English-speaking work environments.
                        </p>
                      </div>
                    </div>
        
                    {/* Image - Academic studying/research */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                        <Image
                          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                          alt="Academic English Program - University studying"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Information Cards */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Subtitle Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Start your Academic Journey with Tutelage
            </h2>
          </div>

          {/* Class Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {classTypes.map((classType, index) => (
              <ClassCard key={index} classType={classType} />
            ))}
          </div>
        </div>
      </div>


      {/* Why We Are The Best Choice Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                What the Program Covers?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {ProgramCover.map((item, index) => (
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
              {/* First Row: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="firstName" className={`text-base font-medium ${isRTL ? 'self-end' : ''}`}>
                    {t('inglishForKids.requestPricing.form.firstName')} {t('inglishForKids.requestPricing.form.required')}
                  </Label>
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
                  <Label htmlFor="lastName" className={`text-base font-medium ${isRTL ? 'self-end' : ''}`}>
                    {t('inglishForKids.requestPricing.form.lastName')} {t('inglishForKids.requestPricing.form.required')}
                  </Label>
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

              {/* Second Row: Email and Course Interest (side by side on md+) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="email" className={`text-base font-medium ${isRTL ? 'self-end' : ''}`}>
                    {t('inglishForKids.requestPricing.form.email')} {t('inglishForKids.requestPricing.form.required')}
                  </Label>
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
                  <Label className={`text-base font-medium ${isRTL ? 'self-end' : ''}`}>
                    {t('inglishForKids.requestPricing.form.interestedIn')} {t('inglishForKids.requestPricing.form.required')}
                  </Label>
                  <Select value={formData.interestedIn} onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className="w-full">
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
    </>
  )

}

export default AcademicEnglishPage
