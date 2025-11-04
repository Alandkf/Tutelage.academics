'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { quizQuestions } from '@/data/quizQuestions'
import { Clock, CheckCircle2 } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import { toast } from 'sonner'

const TOTAL_TIME = 20 * 60 // 20 minutes in seconds

const Start = () => {
  const router = useRouter()
  
  // Quiz flow state
  const [stage, setStage] = useState('instructions') // 'instructions' | 'quiz' | 'form' | 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
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

  // Timer countdown
  useEffect(() => {
    if (stage !== 'quiz') return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          handleFinishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [stage])

  const handleStartQuiz = () => {
    setStage('quiz')
    setTimeLeft(TOTAL_TIME)
  }

  const handleSelectAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const handleFinishQuiz = () => {
    setStage('form')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    // Calculate score first
    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    const percentage = Math.round((correct / quizQuestions.length) * 100)
    
    // Map score to CEFR level
    let calculatedLevel = ''
    if (percentage < 20) calculatedLevel = 'A1 Beginner'
    else if (percentage < 40) calculatedLevel = 'A2 Pre-intermediate'
    else if (percentage < 60) calculatedLevel = 'B1 Intermediate'
    else if (percentage < 75) calculatedLevel = 'B2 Upper-Intermediate'
    else if (percentage < 90) calculatedLevel = 'C1 Advanced'
    else calculatedLevel = 'C2 Proficient'
    
    setScore(percentage)
    setLevel(calculatedLevel)
    
    // Send email with results
    try {
      const response = await fetch(`${BASE_URL}/api/enrollment/testresult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          yearOfBirth: formData.yearOfBirth,
          score: percentage,
          level: calculatedLevel,
          totalQuestions: quizQuestions.length,
          correctAnswers: correct
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success('Results sent to your email!')
      } else {
        toast.error('Could not send email, but you can still view your results.')
      }
    } catch (error) {
      console.error('Error sending test result email:', error)
      toast.error('Could not send email, but you can still view your results.')
    }
    
    // Show results page
    setStage('results')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100

  // INSTRUCTIONS STAGE
  if (stage === 'instructions') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-6">Test Instructions</h1>
          <div className="space-y-4 text-muted-foreground mb-8">
            <p>• Find a quiet place to take the test without distractions</p>
            <p>• You will have <strong className="text-foreground">20 minutes</strong> to complete {quizQuestions.length} questions</p>
            <p>• Each question has 4 options (A, B, C, D) — choose the best answer</p>
            <p>• You cannot go back to previous questions</p>
            <p>• Answer honestly to get an accurate assessment of your level</p>
            <p>• After finishing, you'll fill out a short form and see your results</p>
          </div>
          <Button onClick={handleStartQuiz} size="lg" className="w-full">
            Start Test
          </Button>
        </div>
      </div>
    )
  }

  // QUIZ STAGE
  if (stage === 'quiz') {
    const question = quizQuestions[currentQuestion]
    const userAnswer = answers[currentQuestion]

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          {/* Top bar: Progress + Timer */}
          <div className="mb-6 flex items-center justify-between gap-4">
            {/* Progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{currentQuestion + 1}/{quizQuestions.length}</span>
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

          {/* Instruction text */}
          <div className="mb-6 text-center">
            <p className="text-lg text-muted-foreground">
              Choose the word or phrase that best completes each sentence
            </p>
          </div>

          {/* Question card */}
          <div className="bg-muted border border-border rounded-lg p-6 mt-2 shadow-sm mb-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
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
            </div>
          </div>

          {/* Next button */}
          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              disabled={userAnswer === undefined}
              size="lg"
              className="px-8"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
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
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
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
                required
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
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              View Results
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // RESULTS STAGE
  if (stage === 'results') {
    return (
      <div className="min-h-screen bg-background p-4 py-12">
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
                    <td className="py-3 px-4 text-muted-foreground">0-20%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">A2 Pre-intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">21-40%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B1 Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">41-60%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B2 Upper-Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">61-75%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">C1 Advanced</td>
                    <td className="py-3 px-4 text-muted-foreground">76-90%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">C2 Proficient</td>
                    <td className="py-3 px-4 text-muted-foreground">91-100%</td>
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
            <Button className={"cursor-pointer"} onClick={() => router.push('/courses')} size="lg">
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Start