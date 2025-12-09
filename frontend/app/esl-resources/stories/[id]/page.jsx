'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'
import PdfModal from '@/components/ui/PdfModal'
import PdfButton from '@/components/ui/PdfButton'
import { usePdfModal } from '@/hooks/usePdfModal'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'

const SingleStoryPage = () => {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState(null)
  
  const [loading, setLoading] = useState(true)

  // Use the custom hook for PDF modal
  const { isOpen, pdfUrl, title, openPdf, closePdf } = usePdfModal()

  const ANIM_DURATION = 0.3

  // Prep & Tasks state for story page
  const [prepOpen, setPrepOpen] = useState(false)
  const [openTasks, setOpenTasks] = useState({})
  const toggleTask = (idx) => setOpenTasks(prev => ({ ...prev, [idx]: !prev[idx] }))

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/stories/${params.id}`,
          { credentials: 'include' }
        )
        const data = await response.json()
        if (data.success) {
          // Handle nested story object from API
          setStory(data.data.story || data.data)
        }
      } catch (error) {
        console.error('Error fetching story:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchStory()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Story not found</p>
      </div>
    )
  }

  return (
    <div className="bg-background">
      {/* Header Section - Title and Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-row items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {story.title}
          </h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero Image Section */}
      {story.imageUrl && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}

      {/* Description Section */}
      {story.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {story.description}
          </p>
        </div>
      )}

      {/* Preparation Exercise block BEFORE content */}
      {story.pdf && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border rounded-md overflow-hidden mb-6">
            <button onClick={() => setPrepOpen(p => !p)} className="w-full flex items-center justify-between px-6 py-4 bg-card">
              <span className="font-semibold text-foreground">Preparation exercise</span>
              <span className="text-muted-foreground">{prepOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
            </button>

            <AnimatePresence initial={false}>
              {prepOpen && (
                <motion.div key="prep" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }} className="overflow-hidden border-t bg-background">
                  <div className="px-6 py-4">
                    <PdfButton 
                      pdfUrl={story.pdf} 
                      onOpen={openPdf}
                      label="Preparation PDF"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Audio Player Section (if audioRef exists) */}
      {story.audioRef && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="w-full rounded-lg overflow-hidden border">
            <div className="p-6 bg-card rounded">
              <h2 className="text-xl font-semibold mb-4">Audio Story</h2>
              <CompactAudioPlayer src={story.audioRef} youtubeUrl={story.audioRef} />
            </div>
          </div>
        </div>
      )}

      {/* Reading Content Section - boxed, always open */}
      {story.contentText && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
          <div className="border rounded-md overflow-hidden bg-background">
            <div className="px-6 py-4 border-b bg-card">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Story Content</h2>
            </div>

            <div className="px-6 py-6">
              <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">
                {story.contentText}
              </div>
              {story.wordCount && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Word count: {story.wordCount}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task PDF (if taskPdf exists) */}
      {story.tasks && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 gap-4">
            {Array.isArray(story?.tasks) && story.tasks.length > 0 ? (
						<div className="grid grid-cols-1 gap-4">
							{story.tasks.map((task, idx) => {
							const taskPdf = task?.filePath
							return (
								<div key={idx} className="border rounded-md overflow-hidden">
								<button
									onClick={() => toggleTask(idx)}
									className="w-full flex items-center justify-between px-4 py-5 bg-card"
								>
									<span className="font-medium text-foreground">Task {idx + 1} {}</span>
									<span className="text-muted-foreground">
									{openTasks[idx] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
									</span>
								</button>
								<AnimatePresence initial={false}>
									{openTasks[idx] && (
									<motion.div
										key={`task-${idx}`}
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
										className="overflow-hidden border-t bg-background"
									>
										<div className="px-4 py-3">
										<div className="text-sm text-foreground leading-relaxed">{task?.content || ''}</div>
										{taskPdf && (
											<div className="mt-3">
											<PdfButton 
												pdfUrl={taskPdf} 
												onOpen={openPdf}
												label="Task PDF"
											/>
											</div>
										)}
										</div>
									</motion.div>
									)}
								</AnimatePresence>
								</div>
							)
							})}
						</div>
						) : null }
          </div>
        </div>
      )}

      {/* Tags section */}
      {Array.isArray(story?.tags) && story.tags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-6">
          <h3 className="text-3xl font-bold text-foreground mb-6">Tags</h3>
          <div className="p-6 rounded-md">
            <div className="flex flex-wrap gap-3">
              {story.tags.map((t, i) => (
                <span key={i} className="px-4 py-3 bg-black text-white text-base font-semibold rounded">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Language Level - clickable pills */}
      {story.level && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h3 className="text-3xl font-bold text-foreground mb-6">Language Level</h3>
          <div className="p-6 rounded-md">
            <div className="flex flex-wrap gap-3">
              {(() => {
                const levels = Array.isArray(story.level) ? story.level : [story.level];
                return levels.map((lvl, i) => {
                  const slug = String(lvl).toLowerCase().split(' ')[0];
                  return (
                    <Link key={i} href={`/levels/${slug}`} 
                          className="px-4 py-3 bg-primary/90 border border-primary/30 text-base font-semibold text-white rounded" title={lvl}>
                        {lvl}
                    </Link>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}

      

      {/* CTA Section */}
      <SingleSourceCTA />

      {/* PDF Modal - replaced with reusable component */}
      <PdfModal 
        isOpen={isOpen}
        onClose={closePdf}
        pdfUrl={pdfUrl}
        title={title}
        animationDuration={ANIM_DURATION}
      />

    </div>
  )
}

export default SingleStoryPage