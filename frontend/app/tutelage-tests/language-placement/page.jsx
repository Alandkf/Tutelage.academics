'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, ClipboardList, CreditCard, Video, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const LanguagePlacementPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4"> 
      <LanguagePlacementHero />
      <MoreAboutLanguagePlacement />
      <HowOurTestWorks />
      <HowToTakeTest /> 
      <LanguagePlacementFAQ />
      <BookingFormSection />
    </div>
  )
}

export default LanguagePlacementPage

const LanguagePlacementHero = () => {
  const title = "Free Practice Test"
  const heroImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1400"
  const description = "Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development."
  

  return (
    <>
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6 py-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl flex items-center justify-between font-bold text-foreground mb-2">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  )
}


const MoreAboutLanguagePlacement = () => {

  const scrollToForm = () => {
    const formSection = document.getElementById('booking-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="py-16 md:py-20 px-4">
      <div className="max-w-7xl h-full mx-auto border border-border rounded-sm shadow-lg">
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:ml-10">
            <div className="w-full py-10 lg:py-0 lg:pr-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Language Placement Test
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                Tutelage offers online English placement tests designed to give you a clear understanding of your language proficiency. The <span className="font-semibold text-foreground">Live Speaking & Comprehension Test</span> is conducted online with a live instructor and evaluates your ability to understand spoken English and communicate effectively in real-time. This test takes approximately 15–20 minutes and helps measure your practical speaking and listening skills.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                In addition, the <span className="font-semibold text-foreground">Detailed Listening, Reading & Writing Test</span> is a self-paced online assessment focused on your reading comprehension and writing abilities. It includes interactive exercises and short writing tasks, taking 15 minutes to complete.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
                Taking both tests provides a comprehensive evaluation of your English level, helping you choose the most suitable course to improve your skills efficiently. Registration is required, and a fee applies for each test. Book your placement tests today and take the first step toward advancing your English!
              </p>

              {/* Book Your Test Button */}
                <Button 
                  size="" 
                  onClick={scrollToForm}
                  className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Book Your Test
                </Button>
            </div>
          </div>
  
          {/* Right Image - Increased height */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[32rem] sm:h-[36rem] md:h-[40rem] lg:h-[44rem] xl:h-[48rem]">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Language placement test - professional assessment"
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
}

const HowOurTestWorks = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('booking-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How Our English Level Test Works
          </h2>
          
          <div className="max-w-4xl text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              <span className="font-semibold text-foreground">No preparation is needed</span> for our online English test — it's designed to evaluate your current level of proficiency as it is today.
            </p>
            <p>
              Before you begin, make sure you are in a <span className="font-semibold text-foreground">quiet environment</span> where you can focus uninterrupted for approximately <span className="font-semibold text-foreground">30 minutes</span>.
            </p>
            
            <p className="font-semibold text-foreground pt-4">
              It assesses key areas of English language skills:
            </p>
            
            <ul className="space-y-2 pl-0">
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Vocabulary</span> – Measures your familiarity with a broad range of English words.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Listening</span> – Using audio technology, you will listen to questions in English and respond under time constraints, showing how well you understand spoken English.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Reading</span> – You will read passages and questions in English, interpreting and selecting the correct answers to demonstrate comprehension.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Writing</span> – You will complete short writing tasks to show how well you can construct sentences, use correct grammar, and express your ideas in written English.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Grammar</span> – Tests your knowledge of English grammar rules and your ability to apply them accurately.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-start mt-12">
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Book Your Test Today
          </Button>
        </div>
      </div>
    </div>
  )
}

const HowToTakeTest = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "Fill the Registration Form",
      description: "Complete our online registration form with your details to book your test"
    },
    {
      icon: CreditCard,
      title: "Complete Payment",
      description: "Pay the test fee securely online to confirm your booking and reserve your spot."
    },
    {
      icon: Video,
      title: "Take the Test",
      description: "Live speaking & comprehension test (with a ive instructor), includes detailed Listening, Reading, & Writing test (self-paced)."
    },
    {
      icon: BarChart3,
      title: "Get Your Results",
      description: "Receive a detailed evaluation of your speaking performance, highlighting strengths and areas for improvement."
    }
  ]

  return (
    <div className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 sm:mb-16">
          How to Take the Speaking Mock Test
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="mb-4">
                  <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 text-primary" strokeWidth={1.5} />
                </div>

                {/* Step Number */}
                <div className="text-sm font-semibold text-primary mb-3">
                  Step {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const LanguagePlacementFAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "Do I need to prepare?",
      answer: "No preparation is required — the test evaluates your current English level."
    },
    {
      question: "How long does it take?",
      answer: "The live speaking test takes 15–20 minutes, and the listening, reading & writing test takes 15 minutes."
    },
    {
      question: "Where and what do I need?",
      answer: "Both tests are online. You need a quiet environment, stable internet, and a device with audio (and a camera for the live test)."
    },
    {
      question: "What skills are tested?",
      answer: "Vocabulary, listening, reading, writing, and grammar."
    },
    {
      question: "How do I register and get results?",
      answer: "Register online to book your test, and receive a detailed evaluation of your English level afterward."
    }
  ]

  return (
    <div className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Find answers to common questions about our language placement tests
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              {/* Question Button */}
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

              {/* Answer (Collapsible) */}
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
  )
}

const placementTestSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must not exceed 15 digits"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "City is required").min(2, "City must be at least 2 characters"),
  referralSource: z.string().min(1, "Please select how you heard about us")
})

const BookingFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(placementTestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      referralSource: ''
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

  const REFERRAL_SOURCES = [
    'Google Search',
    'Social Media (Facebook, Instagram, etc.)',
    'Friend or Family Recommendation',
    'Advertisement',
    'School or University',
    'Previous Student',
    'Other'
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await fetch(`${BASE_URL}/api/enrollment/placement-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Booking submitted successfully! We will contact you soon.')
        reset()
      } else {
        toast.error(result.message || 'Failed to submit booking. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="booking-form" className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Book Your Placement Test
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below to schedule your English placement test. Our team will contact you to confirm your booking.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="mt-2"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="mt-2"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="mt-2"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="mt-2"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Country and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
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
                  <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city")}
                  className="mt-2"
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Referral Source */}
            <div>
              <Label htmlFor="referralSource">How did you hear about us? *</Label>
              <Controller
                name="referralSource"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {REFERRAL_SOURCES.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.referralSource && (
                <p className="text-sm text-red-500 mt-1">{errors.referralSource.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}