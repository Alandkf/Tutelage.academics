'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Loader2, Clock, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


// Comprehensive list of world countries
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

export default function FreePracticeTestPage() {
  const router = useRouter()
  
  // Quiz flow state
  const [stage, setStage] = useState('instructions') // 'instructions' | 'quiz' | 'form' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    yearOfBirth: ''
  })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('')

  // Fetch quiz config and questions from API
  const [quizConfig, setQuizConfig] = useState(null)
  const [quizQuestions, setQuizQuestions] = useState([])  
  const [loading, setLoading] = useState(true)

  // Section tracking state
  const [sections, setSections] = useState([])
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [sectionProgress, setSectionProgress] = useState({})

  // ✅ Use ref to track if data has been fetched (prevent infinite loop)
  const hasFetchedData = useRef(false)

  // ✅ Fetch quiz data ONCE on mount
  useEffect(() => {
    if (hasFetchedData.current) return // ✅ Prevent refetching
    
    const fetchQuizData = async () => {
      try {
        setLoading(true)
        
        const configRes = await fetch(`${BASE_URL}/api/quiz/config`)
        const configData = await configRes.json()
        if (configData.success) {
          const config = configData.data
          setQuizConfig(config)
          setTimeLeft(config.timeLimitMinutes * 60)
        } else {
          toast.error('Quiz is currently unavailable. Please try again later.')
          return
        }

        const sectionsRes = await fetch(`${BASE_URL}/api/admin/quiz/sections`, {
          credentials: 'include'
        })
        const sectionsData = await sectionsRes.json()

        const questionsRes = await fetch(`${BASE_URL}/api/quiz/questions`)
        const questionsData = await questionsRes.json()
        
        if (questionsData.success) {
          const questions = questionsData.data
          setQuizQuestions(questions)
          
          if (sectionsData.success && Array.isArray(sectionsData.data)) {
            let questionOffset = 0
            const sectionArray = sectionsData.data
              .filter(s => s.isActive)
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((s, idx) => {
                const limit = s.questionCount || 0
                const section = {
                  number: idx + 1,
                  name: s.name,
                  slug: s.slug,
                  questionCount: limit,
                  startIndex: questionOffset,
                  endIndex: questionOffset + limit - 1,
                  isCompleted: false
                }
                questionOffset += limit
                return section
              })
            
            setSections(sectionArray)
            
            const initialProgress = {}
            sectionArray.forEach((s, idx) => {
              initialProgress[idx] = { completed: false }
            })
            setSectionProgress(initialProgress)
          }
        } else {
          toast.error('Failed to load quiz questions.')
        }
        
        hasFetchedData.current = true // ✅ Mark as fetched
      } catch (error) {
        console.error('Error fetching quiz data:', error)
        toast.error('Failed to load quiz. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuizData()
  }, []) // ✅ Empty dependency array - only run once on mount

  // Timer countdown
  useEffect(() => {
    if (stage !== 'quiz' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleQuizComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [stage, timeLeft])

  // ✅ FIX: Check section completion WITHOUT circular dependencies
  useEffect(() => {
    if (sections.length === 0) return
    
    const currentSection = sections[currentSectionIndex]
    if (!currentSection) return
    
    // Check if all questions in current section are answered
    let allAnswered = true
    for (let i = currentSection.startIndex; i <= currentSection.endIndex; i++) {
      if (answers[i] === undefined) {
        allAnswered = false
        break
      }
    }
    
    // ✅ Only update if status actually changed (prevents infinite loop)
    const isAlreadyCompleted = sectionProgress[currentSectionIndex]?.completed
    if (allAnswered && !isAlreadyCompleted) {
      setSectionProgress(prev => ({
        ...prev,
        [currentSectionIndex]: { completed: true }
      }))
    }
  }, [answers, currentSectionIndex]) // ✅ Removed sections and sectionProgress from deps

  // ✅ FIX: Update current section index WITHOUT circular dependencies
  useEffect(() => {
    if (sections.length === 0) return
    
    const nextSectionIndex = sections.findIndex(s => 
      currentQuestionIndex >= s.startIndex && currentQuestionIndex <= s.endIndex
    )
    
    // ✅ Only update if index actually changed (prevents infinite loop)
    if (nextSectionIndex !== -1 && nextSectionIndex !== currentSectionIndex) {
      setCurrentSectionIndex(nextSectionIndex)
    }
  }, [currentQuestionIndex]) // ✅ Removed sections and currentSectionIndex from deps

  const handleStartQuiz = () => {
    setStage('quiz')
    setTimeLeft(quizConfig?.timeLimitMinutes * 60 || 30 * 60) // reset timer from config
  }

  const handleSelectAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const handleFinishQuiz = () => {
    setStage('form')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    
    // ✅ Use ACTUAL number of questions fetched, not config limit
    const totalQuestions = quizQuestions.length
    const percentage = Math.round((correct / totalQuestions) * 100)
    
    // ✅ Dynamic level calculation based on percentage of fetched questions
    let calculatedLevel = ''
    const ranges = [
      { min: 0, max: Math.floor(totalQuestions * 0.10), level: 'A1 Beginner' },
      { min: Math.floor(totalQuestions * 0.10) + 1, max: Math.floor(totalQuestions * 0.30), level: 'A2 Pre-intermediate' },
      { min: Math.floor(totalQuestions * 0.30) + 1, max: Math.floor(totalQuestions * 0.53), level: 'B1 Intermediate' },
      { min: Math.floor(totalQuestions * 0.53) + 1, max: Math.floor(totalQuestions * 0.77), level: 'B2 Upper-Intermediate' },
      { min: Math.floor(totalQuestions * 0.77) + 1, max: Math.floor(totalQuestions * 0.90), level: 'C1 Advanced' },
      { min: Math.floor(totalQuestions * 0.90) + 1, max: totalQuestions, level: 'C2 Proficient' }
    ]
    
    for (const range of ranges) {
      if (correct >= range.min && correct <= range.max) {
        calculatedLevel = range.level
        break
      }
    }
    
    if (!calculatedLevel) calculatedLevel = 'A1 Beginner'
    
    setScore(percentage)
    setLevel(calculatedLevel)
    
    try {
      const response = await fetch(`${BASE_URL}/api/enrollment/testresult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          yearOfBirth: formData.yearOfBirth,
          score: percentage,
          level: calculatedLevel,
          totalQuestions: totalQuestions,
          correctAnswers: correct
        })
      })

      if (response.ok) {
        toast.success('Results sent to your email!')
      } else {
        toast.error('Could not send email, but you can still view your results.')
      }
    } catch (error) {
      console.error('Error sending test result email:', error)
      toast.error('Could not send email, but you can still view your results.')
    }

    setStage('results')
  }

  const handleSkipForm = async () => {
    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    
    // ✅ Use ACTUAL number of questions fetched
    const totalQuestions = quizQuestions.length
    const percentage = Math.round((correct / totalQuestions) * 100)
    
    let calculatedLevel = ''
    const ranges = [
      { min: 0, max: Math.floor(totalQuestions * 0.10), level: 'A1 Beginner' },
      { min: Math.floor(totalQuestions * 0.10) + 1, max: Math.floor(totalQuestions * 0.30), level: 'A2 Pre-intermediate' },
      { min: Math.floor(totalQuestions * 0.30) + 1, max: Math.floor(totalQuestions * 0.53), level: 'B1 Intermediate' },
      { min: Math.floor(totalQuestions * 0.53) + 1, max: Math.floor(totalQuestions * 0.77), level: 'B2 Upper-Intermediate' },
      { min: Math.floor(totalQuestions * 0.77) + 1, max: Math.floor(totalQuestions * 0.90), level: 'C1 Advanced' },
      { min: Math.floor(totalQuestions * 0.90) + 1, max: totalQuestions, level: 'C2 Proficient' }
    ]
    
    for (const range of ranges) {
      if (correct >= range.min && correct <= range.max) {
        calculatedLevel = range.level
        break
      }
    }
    
    if (!calculatedLevel) calculatedLevel = 'A1 Beginner'
    
    setScore(percentage)
    setLevel(calculatedLevel)

    setStage('results')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Show loading state while fetching quiz data
  if (loading) {
    return (
      <div className="min-h-screen md:min-h-[80vh] bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  // INSTRUCTIONS STAGE
  if (stage === 'instructions') {
    return (
      <div className="min-h-screen md:min-h-[80vh] bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-6">Test Instructions</h1>
          <div className="space-y-4 text-muted-foreground mb-8">
            <p>• Find a quiet place to take the test without distractions</p>
            <p>• You will have <strong className="text-foreground">{quizConfig?.timeLimitMinutes || 30} minutes</strong> to complete {quizQuestions?.length} questions</p>
            <p>• Each question has 4 options (A, B, C, D) — choose the best answer</p>
            <p>• You cannot go back to previous questions</p>
            <p>• Answer honestly to get an accurate assessment of your level</p>
            <p>• After finishing, you'll fill out a short form and see your results</p>
          </div>
          <Button onClick={handleStartQuiz} size="lg" className="w-full">
            Start The Test
          </Button>
        </div>
      </div>
    )
  }

  // QUIZ STAGE
  if (stage === 'quiz') {
    const question = quizQuestions[currentQuestionIndex]
    const userAnswer = answers[currentQuestionIndex]

    const currentQuestion = quizQuestions[currentQuestionIndex]
    const currentSection = sections[currentSectionIndex]
    const isLastQuestionInSection = currentSection && currentQuestionIndex === currentSection.endIndex
    const isSectionCompleted = sectionProgress[currentSectionIndex]?.completed
    
    // Calculate progress percentage
    const totalQuestions = quizQuestions.length
    const progressPercentage = totalQuestions > 0 
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100 
      : 0

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Top bar: Progress + Timer */}
          <div className="mb-6 flex items-center justify-between gap-4">
            {/* Progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{currentQuestionIndex + 1}/{quizQuestions.length}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Timer (circular border effect approximated with border + padding) */}
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-primary rounded-full">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Section Progress Circles - No Card Wrapper */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {sections.map((section, idx) => {
              const isActive = idx === currentSectionIndex
              const isCompleted = sectionProgress[idx]?.completed
              
              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 border-green-600'
                        : isActive
                        ? 'bg-primary border-primary'
                        : 'bg-background border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    ) : (
                      <span className={`text-lg sm:text-xl font-bold ${
                        isActive ? 'text-white' : 'text-muted-foreground'
                      }`}>
                        {section.number}
                      </span>
                    )}
                  </motion.div>
                  
                  {/* Section Name Below Circle */}
                  <span className={`text-xs sm:text-sm font-medium text-center max-w-[80px] ${
                    isActive ? 'text-primary font-bold' : 'text-muted-foreground'
                  }`}>
                    {section.name}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Instruction text */}
          <div className="mb-6 text-center">
            <p className="text-lg text-muted-foreground">
              Choose the word or phrase that best completes each sentence
            </p>
          </div>

          {/* Question card */}
          <div className="bg-muted border border-border rounded-lg p-6 mt-2 shadow-sm mb-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {question?.text}
            </h2>

            <div className="space-y-3">
              {question?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left transition-all cursor-pointer group bg-background rounded-sm"
                >
                  {/* Custom radio indicator */}
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    userAnswer === idx
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground group-hover:border-primary'
                  }`}>
                    {userAnswer === idx && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {/* Option text */}
                  <div className={`flex-1 transition-colors ${
                    userAnswer === idx ? 'text-foreground font-semibold' : 'text-foreground'
                  }`}>
                    <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </div>
                </button>
              ))}

              {/* Debug: Show correct answer */}
              {false && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <strong>Debug Info:</strong> Correct answer is {String.fromCharCode(65 + question?.correctAnswer)}.
                </div>
              )}
            </div>
          </div>

          {/* Next button */}
          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              disabled={userAnswer === undefined}
              size="lg"
              className="px-8 cursor-pointer"
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // FORM STAGE
  if (stage === 'form') {
    return (
      <div className="p-10 bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-6">Your Information</h1>
          
          {/* Explanatory message */}
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground">
              📧 <strong>Optional:</strong> Fill out this form to receive your detailed test results via email. 
              You can also skip this step and view your results immediately.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="yearOfBirth">Year of Birth</Label>
                <Input
                  id="yearOfBirth"
                  type="number"
                  min="1900"
                  max="2024"
                  value={formData.yearOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearOfBirth: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="w-full">
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

            {/* Two buttons: Submit form OR Skip */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1 cursor-pointer"
                disabled={!formData.firstName || !formData.lastName || !formData.email}
              >
                📧 Send Results & View
              </Button>
              <Button 
                type="button"
                onClick={handleSkipForm}
                variant="outline" 
                size="lg" 
                className="flex-1 cursor-pointer"
              >
                Skip & View Results
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // RESULTS STAGE
  if (stage === 'results') {
    return (
      <div className="min-h-screen md:min-h-[80vh] bg-background p-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Results</h1>
          </div>

          {/* Two-column layout: Score (left 1/4) + Explanation (right 3/4) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Score circle (1 column on desktop, full-width on mobile) */}
            <div className="lg:col-span-1 bg-background border border-border rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Your Score</h2>
              <div
                className="relative w-40 h-40 rounded-full flex items-center justify-center "
                style={{
                  background: `conic-gradient(rgb(234, 179, 8) ${score * 3.6}deg, rgb(229, 231, 235) ${score * 3.6}deg)`
                }}
              >
                <div className="absolute inset-3 bg-background rounded-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-foreground">{score}%</div>
                  <div className="text-xs text-muted-foreground mt-1">{level}</div>
                </div>
              </div>
            </div>

            {/* Right: Score explanation (3 columns on desktop, full-width on mobile) */}
            <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Score Explained</h2>
              <p className="text-muted-foreground leading-relaxed">
                Based on your performance, you have been assessed at the <strong className="text-foreground">{level}</strong> level. 
                This means you have {score < 40 ? 'basic' : score < 60 ? 'intermediate' : 'advanced'} proficiency in English. 
                Continue practicing to improve your skills and reach the next level!
              </p>
            </div>
          </div>

          {/* Comparison table (full-width below) */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Score Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-foreground font-semibold">Level</th>
                    <th className="py-3 px-4 text-foreground font-semibold">Score Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">A1 Beginner</td>
                    <td className="py-3 px-4 text-muted-foreground">0-13%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">A2 Pre-intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">14-29%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B1 Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">30-46%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B2 Upper-Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">47-63%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">C1 Advanced</td>
                    <td className="py-3 px-4 text-muted-foreground">64-80%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">C2 Proficient</td>
                    <td className="py-3 px-4 text-muted-foreground">81-100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className={"cursor-pointer"} onClick={() => router.push('/tutelage-tests/free-practice-test')} variant="outline" size="lg">
              Back to Test Page
            </Button>
            <Button className={"cursor-pointer"} onClick={() => window.location.reload()} size="lg">
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

