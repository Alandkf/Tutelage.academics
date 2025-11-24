'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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

const KurdishLanguagePage = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'
  
  const title = t('KurdishCourse.title')
  const heroImage = "https://localization.saudisoft.com/wp-content/uploads/2022/11/Kurdish-blog.webp" 
  const description = t('KurdishCourse.description')
  const enrollButtonText = t('inglishForAdults.first.enrollButtonText')

  // Get class types from translation
  const publicClass = {
    title: t('KurdishCourse.classTypes.online.title'),
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", // Group learning/classroom
    features: t('KurdishCourse.classTypes.online.features', { returnObjects: true }),
    buttonText: t('KurdishCourse.classTypes.online.buttonText')
  }

  const privateClass = {
    title: t('KurdishCourse.classTypes.inPerson.title'),
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // One-on-one professional tutoring
    features: t('KurdishCourse.classTypes.inPerson.features', { returnObjects: true }),
    buttonText: t('KurdishCourse.classTypes.inPerson.buttonText')
  }
  const classTypes = [publicClass, privateClass]

  const kids = {
    title: t('KurdishCourse.thirdCard.kids.title'),
    description: t('KurdishCourse.thirdCard.kids.desc'),
  }
  const teens = {
    title: t('KurdishCourse.thirdCard.teens.title'),
    description: t('KurdishCourse.thirdCard.teens.desc'),
    }
    const adults = {
    title: t('KurdishCourse.thirdCard.adults.title'),
    description: t('KurdishCourse.thirdCard.adults.desc'),
    }

    const CardTypes = [ kids, teens, adults ]

    const CardItem = ({ cardType }) => (
        <div className="bg-card border border-border  rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6">
            <div className='text-center flex flex-col items-center '>
                <h3 className='text-lg text-primary-foreground font-bold bg-primary w-fit p-2 rounded-xs'>{cardType.title}</h3>
                <p className="text-sm text-muted-foreground mt-4">{cardType.description}</p>
            </div>
        </div>
    )
  // Reusable Class Card Component
  const ClassCard = ({ classType }) => (
    <div className="bg-card border border-border rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-72 sm:h-96 md:h-60 lg:h-96">
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
            className="w-full cursor-pointer py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {classType.buttonText}
            <ChevronRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </Link>
      </div>
    </div>
  )





  // Form state - simplified for Arabic enrollment
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    classType: '',
    phone: '',
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
      const requiredFields = ['firstName', 'lastName', 'age', 'country', 'classType', 'phone', 'email', 'interestedIn']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        toast("Please fill in all required fields", { variant: "destructive" })
        return
      }

      const response = await fetch(`${BASE_URL}/api/enrollment/kurdish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          country: formData.country,
          classType: formData.classType,
          phone: formData.phone,
          email: formData.email,
          interestedIn: formData.interestedIn,
          course: 'Arabic Language Classes'
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
        age: '',
        country: '',
        classType: '',
        phone: '',
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



  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const faqs = t('KurdishCourse.faq.questions', { returnObjects: true })

  return (
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
                    <Link href={"#form-section"}>
                        <Button 
                            size={"lg"} 
                            className=" md:px-12 py-4 flex items-center justify-center md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {enrollButtonText}
                            <ChevronDown className={`w-6 h-6 ${isRTL ? 'mr-3' : 'ml-3'}`} />
                        </Button>
                    </Link>
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

      {/* Course Information Cards */}
      <div className="bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Subtitle Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('KurdishCourse.secondTitle')}
            </h2>
          </div>

          {/* Class Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {classTypes.map((classType, index) => (
              <ClassCard key={index} classType={classType} />
            ))}
          </div>
        </div>
      </div>

      {/* 3 types course support section */}
      <div className="py-16">
        <div className="max-w-7xl h-full mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('KurdishCourse.secondTitle')}
            </h2>
          </div>
          <div className={`flex flex-col-reverse items-stretch gap-0 ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            {CardTypes.map((cardType, index) => (
              <div key={index} className="w-full lg:w-1/3 p-4">
                <CardItem cardType={cardType} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('KurdishCourse.faq.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t('KurdishCourse.faq.subtitle')}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs?.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Question Bar */}
                <button
                  onClick={() => toggleFaq(index)}
                  className={` ${isRTL ? "flex-row-reverse" : ""} w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-muted/50`}
                >
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-between' : ""} gap-4 flex-1 `}>
                    <HelpCircle className={`w-5 h-5 text-primary flex-shrink-0 ${isRTL && "transform scale-x-[-1]" }`} />
                    <span className={`text-base font-semibold text-foreground pr-4 `}>
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
      <div className="py-20" id="form-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('KurdishCourse.enrollForm.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('KurdishCourse.enrollForm.subtitle')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* First Row: First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="firstName" className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.firstName')} {t('KurdishCourse.enrollForm.required')}
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
                  <Label htmlFor="lastName" className={`text-base font-medium ${isRTL ? 'self' : ''}`}>
                    {t('KurdishCourse.enrollForm.lastName')} {t('KurdishCourse.enrollForm.required')}
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

              {/* Second Row: Age and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="age" className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.age')} {t('KurdishCourse.enrollForm.required')}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.country')} {t('KurdishCourse.enrollForm.required')}
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Third Row: Class Type and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.classType')} {t('KurdishCourse.enrollForm.required')}
                  </Label>
                  <Select value={formData.classType} onValueChange={(value) => handleInputChange('classType', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('KurdishCourse.enrollForm.selectClassType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">{t('KurdishCourse.enrollForm.online')}</SelectItem>
                      <SelectItem value="In-person">{t('KurdishCourse.enrollForm.inPerson')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="phone" className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.phone')} {t('KurdishCourse.enrollForm.required')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className={isRTL ? 'text-right' : ''}
                  />
                </div>
              </div>

              {/* Fourth Row: Email and Interested In */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 items-start">
                  <Label htmlFor="email" className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.email')} {t('KurdishCourse.enrollForm.required')}
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
                  <Label className={`text-base font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('KurdishCourse.enrollForm.interestedIn')} {t('KurdishCourse.enrollForm.required')}
                  </Label>
                  <Select value={formData.interestedIn} onValueChange={(value) => handleInputChange('interestedIn', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('KurdishCourse.enrollForm.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kurdish">{t('KurdishCourse.enrollForm.kurdish')}</SelectItem>
                      <SelectItem value="Arabic">{t('KurdishCourse.enrollForm.arabic')}</SelectItem>
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
                  {formLoading ? t('KurdishCourse.enrollForm.submittingButton') : t('KurdishCourse.enrollForm.submitButton')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KurdishLanguagePage
