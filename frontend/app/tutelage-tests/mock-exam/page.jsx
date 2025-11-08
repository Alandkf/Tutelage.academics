'use client'

import Image from "next/image"
import { ClipboardList, CreditCard, Video, BarChart3, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import BASE_URL from "@/app/config/url"
import { toast } from "sonner"


const MockExam = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4"> 
      <MockHero />
      <MoreAboutMock />
      <HowToTakeTest />
      <HowOurTestWorks />
      <MockFAQ /> 
      <BookingFormSection />
      {/* call other functions(components) here... */}
    </div>
  )
}

export default MockExam

const MockHero = () => {
  const title = "International / Mock Test"
  const heroImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1400"
  const description = "Simulated live speaking mock test to practice under exam conditions. 11–14 minutes focusing on fluency, pronunciation, grammar and vocabulary."
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



const MoreAboutMock = () => {

  
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
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Online Speaking Mock Test for IELTS & Academic Studies
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                Tutelage offers an online Speaking Mock Test designed to help you practice and assess your English speaking skills for IELTS or academic purposes.
              </p>

              <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-foreground mb-4">
                Live Speaking Mock Test
              </h3>

              <ul className="list-disc list-inside space-y-2 mb-6 text-sm sm:text-base lg:text-lg text-muted-foreground">
                <li>Conducted online with a live instructor.</li>
                <li>Evaluates your ability to understand spoken English and communicate effectively in real-time, following the IELTS speaking format.</li>
                <li>Duration: 11-14 minutes.</li>
                <li>Focus: Fluency, pronunciation, grammar, and vocabulary in speaking.</li>
              </ul>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                This mock test gives you a realistic practice experience, helping you identify strengths and areas to improve before your real IELTS or academic speaking assessment.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
                Registration is required, and a fee applies.
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
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80"
                alt="IELTS speaking mock test - online practice with instructor"
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

const HowToTakeTest = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "Fill the Registration Form",
      description: "Complete our online registration form with your details to book your speaking mock test session."
    },
    {
      icon: CreditCard,
      title: "Complete Payment",
      description: "Pay the test fee securely online to confirm your booking and reserve your spot."
    },
    {
      icon: Video,
      title: "Take the Test",
      description: "Join the online session with a live instructor and complete the speaking tasks in a simulated IELTS format."
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

const HowOurTestWorks = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('booking-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How Our Speaking Mock Test Works
          </h2>
          
          <div className="max-w-4xl text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4">
            <ul className="space-y-3 pl-0 mb-6">
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">No preparation needed</span> — the test provides an accurate snapshot of your current speaking level.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span>Make sure you are in a <span className="font-semibold text-foreground">quiet environment</span> with a <span className="font-semibold text-foreground">stable internet connection</span> and a device with a <span className="font-semibold text-foreground">microphone and camera</span>.</span>
              </li>
            </ul>
            
            <p className="font-semibold text-foreground pt-4 text-xl">
              Skills Assessed:
            </p>
            
            <ul className="space-y-2 pl-0">
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Fluency & Coherence</span> – How smoothly you speak and connect ideas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Pronunciation</span> – Clarity and correctness of spoken English.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Grammar</span> – Accuracy of sentence structures in speech.</span>
              </li>
              <li className="flex items-start">
                <span className="text-foreground mr-3">•</span>
                <span><span className="font-semibold text-foreground">Vocabulary</span> – Range and appropriateness of words used in communication.</span>
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

const MockFAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "Do I need to prepare?",
      answer: "No preparation is required — the mock test evaluates your current speaking skills."
    },
    {
      question: "How long does it take?",
      answer: "The speaking mock test takes 15–20 minutes."
    },
    {
      question: "Where and what do I need?",
      answer: "The test is online. You need a quiet environment, stable internet, and a device with microphone and camera."
    },
    {
      question: "What skills are tested?",
      answer: "Fluency, pronunciation, grammar, and vocabulary, aligned with IELTS and academic speaking requirements."
    },
    {
      question: "How do I register and get results?",
      answer: "Register online to book your speaking mock test, and receive a detailed evaluation of your performance afterward."
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
            Find answers to common questions about our speaking mock test
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

const BookingFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    testType: '',
    referralSource: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const TEST_TYPES = [
    'General English',
    'Mock Test'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${BASE_URL}/api/enrollment/mock-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Booking submitted successfully! Check your email for confirmation.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          testType: '',
          referralSource: ''
        })
      } else {
        toast.error(data.message || 'Failed to submit booking. Please try again.')
      }
    } catch (error) {
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
            Book Your Speaking Mock Test
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Fill out the form below to schedule your speaking mock test. Our team will contact you to confirm your booking.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))
                  }
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))
                  }
                  required
                  className="mt-2"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))
                }
                required
                className="mt-2"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))
                }
                required
                className="mt-2"
              />
            </div>

            {/* Country, City, and Test Type in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))
                  }
                  required
                >
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
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))
                  }
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="testType">Type of Test *</Label>
                <Select 
                  value={formData.testType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, testType: value }))
                  }
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Referral Source */}
            <div>
              <Label htmlFor="referralSource">How did you hear about us? *</Label>
              <Select 
                value={formData.referralSource} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, referralSource: value }))
                }
                required
              >
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
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Book Your Test'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}