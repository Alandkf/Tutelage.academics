'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight, Briefcase, Users, Phone, Presentation, Rocket, Handshake, MessageCircle, Type, HelpCircle, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'



const BusinessEnglishPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'

  const title = "Business English"
  const heroImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
  const description = "Enhance your professional communication skills with our Business English program. Learn to speak, write, and present confidently in meetings, emails, and international workplaces. Build the fluency and confidence you need to succeed in your career."
  const enrollButtonText = "Enroll Now"

  const handleEnrollClick = () => {
    router.push(`/courses/enroll?course=${encodeURIComponent(title)}`)
  }

  const businessLevels = [
    {
      title: "Business Preliminary B1 (Foundation Level)",
      description: "Focus on building a strong foundation in workplace English and essential business communication. This level helps learners gain confidence using English for everyday professional tasks and develop key vocabulary for office environments.",
      features: [
        "Write simple professional emails",
        "Introduce yourself and your company",
        "Take part in short meetings and conversations"
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80" // Office workspace/professional setting
    },
    {
      title: "Business Vantage B2 (Intermediate Level)",
      description: "Focus on developing fluency and accuracy in common business contexts. Learners improve their ability to communicate clearly in meetings, presentations, and negotiations, while expanding their professional vocabulary and understanding of workplace culture.",
      features: [
        "Lead and participate in meetings",
        "Give clear presentations",
        "Handle phone calls and negotiations confidently"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" // Business meeting/presentation
    },
    {
      title: "Business Higher C1 (Advanced Level)",
      description: "Focus on mastering professional, persuasive, and strategic communication skills. Learners refine their language for advanced business interactions, leadership roles, and international cooperation, gaining the ability to express complex ideas naturally and confidently.",
      features: [
        "Write detailed reports and proposals",
        "Negotiate and lead effectively",
        "Communicate with confidence in international settings"
      ],
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80" // International business/leadership
    }
  ]

  const publicClass = {
  title: "Small Group Classes (3 students)",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", 
  features: [
    "Live online classes", 
    "Interactive learning with peers for real conversation practice.", 
    "More personalized attention than larger groups.", 
    "Collaborative exercises to build confidence and fluency.",
    "32 lesson per course",
    "Tutelage’s certificate of participation",
  ],
  buttonText: "Request Price"
}

const privateClass = {
  title: "Private Classes",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", 
  features: [
    "Live online classes", 
    "One-on-one attention tailored to your individual goals and learning style.", 
    "Flexible pace to focus on your strengths and areas for improvement.", 
    "Personalized practice in speaking, writing, and professional communication.",
    "lesson per course",
    "Tutelage’s certificate of participation",
  ],
  buttonText: "Request Price"
}

const inPersonClass = {
  title: "in-Person Classes",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", 
  features: [
    "Face-to-face lessons", 
    "Direct interaction with instructors for immediate feedback.", 
    "Engaging classroom environment with hands-on activities.", 
    "Networking opportunities with other learners and professionals.",
    "32 lesson per course",
    "Tutelage’s certificate of participation",
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


  const skillsData = [
    { icon: Briefcase, title: "Business English" },
    { icon: Users, title: "Meetings" },
    { icon: Phone, title: "Telephoning" },
    { icon: Presentation, title: "Presentation" },
    { icon: Rocket, title: "Job Interviews" },
    { icon: Handshake, title: "Negotiation" },
    { icon: MessageCircle, title: "Socializing" },
    { icon: Type, title: "Vocabulary" }
  ]

  const SkillCard = ({ icon: Icon, title }) => (
    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 border border-border rounded-lg px-6 py-8 shadow-md hover:shadow-lg transition-all duration-300 text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-white/20 shadow-md">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-foreground">
        {title}
      </h3>
    </div>
  )

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Business English FAQs
  const businessFaqs = [
    {
      question: "Who is Business English for?",
      answer: "Business English is designed for professionals, students, or anyone who wants to improve their English for workplace, academic, or international business settings."
    },
    {
      question: "What levels are available?",
      answer: "We offer three levels: Preliminary (B1) to build a foundation in workplace communication, Vantage (B2) to develop fluency and confidence in practical business situations, and Higher (C1) to master professional and advanced communication for leadership roles."
    },
    {
      question: "What skills will I learn?",
      answer: "You will improve your speaking, writing, reading, and listening skills, with a focus on: emails, meetings, presentations, negotiations, reports, and professional vocabulary."
    },
    {
      question: "Are the courses online or in-person?",
      answer: "Both! You can choose flexible online learning or join in-person classes at select locations."
    },
    {
      question: "Do I get feedback on my progress?",
      answer: "Yes — our expert instructors provide continuous, detailed feedback to help you improve fluency, accuracy, and confidence."
    },
    {
      question: "Can these courses help me take official exams?",
      answer: "Absolutely! Our curriculum is aligned with international standards like CEFR and Cambridge Business English exams."
    },
    {
      question: "How long does each level take?",
      answer: "Course duration varies based on your starting level and pace, but each level is designed to build skills progressively and effectively."
    }
  ]

  
    // Form state - simplified for pricing request (matching Kids page)
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      interestedIn: '',
    })
    const [formLoading, setFormLoading] = useState(false)
  
    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
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

    const courseOptions = [
    'English for Kids and Teens',
    'English for Adults', 
    'Academic English',
    'Business English',
    'English Proficiency Tests'  
  ]

  return (
    <>
      <div className="relative min-h-screen bg-background pt-4" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header Section */}
        <div className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {title}
                </h1>
              </div>

              <div className="flex-shrink-0">
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={handleEnrollClick}
                      size="lg"
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

        {/* Business English Levels Section */}
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Business English Levels
              </h2>
            </div>

            <div className="space-y-4">
              {businessLevels.map((level, index) => {
                const isOdd = index % 2 !== 0
                return (
                  <div key={index} className={`pb-32`}>
                    <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
                      <div className={`flex flex-col-reverse items-stretch gap-0 ${
                        isRTL 
                          ? (isOdd ? 'lg:flex-row' : 'lg:flex-row-reverse')
                          : (isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row')
                      }`}>
                        {/* Content */}
                        <div className={`w-full lg:w-1/2 flex items-center px-4 sm:px-6 ${isRTL ? 'lg:mr-10' : 'lg:ml-10'}`}>
                          <div className={`w-full py-10 lg:py-24 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
                            <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 ${isRTL ? 'text-right' : ''}`}>
                              {level.title}
                            </h3>
                            
                            <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 ${isRTL ? 'text-right' : ''}`}>
                              {level.description}
                            </p>

                            <ul className="flex flex-col gap-2" dir="ltr">
                              {level.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start w-full">
                                  <div className={`w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`}></div>
                                  <span className={`text-foreground font-medium flex-1 ${isRTL ? 'text-right order-1' : 'order-2'}`}>
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
            
                        {/* Image */}
                        <div className="w-full lg:w-1/2">
                          <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                            <Image
                              src={level.image}
                              alt={level.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* course infomation cards ( triple cards ) */}
        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Class Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {classTypes.map((classType, index) => (
                <ClassCard key={index} classType={classType} />
              ))}
            </div>
          </div>
        </div>

        {/* Finish Our Course and You Can Section */}
        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Finish Our Course and You Can:
              </h2>
            </div>

            {/* Skills Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {skillsData.map((skill, index) => (
                <SkillCard
                  key={index}
                  icon={skill.icon}
                  title={skill.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Business English FAQ Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Business English – FAQ
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {businessFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Question Bar */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`${isRTL ? "flex-row-reverse" : ""} w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-muted/50`}
                  >
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-between' : ""} gap-4 flex-1`}>
                      <HelpCircle className={`w-5 h-5 text-primary flex-shrink-0 ${isRTL && "transform scale-x-[-1]"}`} />
                      <span className={`text-base font-semibold text-foreground pr-4`}>
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
              {/* First Row: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="firstName" className={`text-base font-medium ${isRTL ? 'self-end' : ''}`}>
                    {t('inglishForAdults.requestPricing.form.firstName')} {t('inglishForAdults.requestPricing.form.required')}
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
                    {t('inglishForAdults.requestPricing.form.lastName')} {t('inglishForAdults.requestPricing.form.required')}
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
                  {formLoading ? t('inglishForAdults.requestPricing.form.submittingButton') : t('inglishForAdults.requestPricing.form.submitButton')}
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

export default BusinessEnglishPage

