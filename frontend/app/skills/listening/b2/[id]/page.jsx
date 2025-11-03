'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { X as XIcon, FileText as FileTextIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'
import { motion, AnimatePresence } from 'framer-motion'

const SingleAudioB2 = () => {
  const params = useParams()
  const router = useRouter()
  const [audio, setAudio] = useState(null)
  console.log('audio', audio);
  
  const [loading, setLoading] = useState(true)

  // chosen thumbnail to display (after probing maxres/hq)
  const [displayThumb, setDisplayThumb] = useState(null) // now just a passthrough from audio.imageUrl

  // modal for displaying PDFs
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [pdfModalUrl, setPdfModalUrl] = useState(null)

  // animation duration (slower)
  const ANIM_DURATION = 0.3

  // Re-add collapsible UI state (was removed accidentally)
  const [prepOpen, setPrepOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [openTasks, setOpenTasks] = useState({}) // map index -> boolean

  const openPdfModal = (url) => {
    setPdfModalUrl(url)
    setPdfModalOpen(true)
  }
  const closePdfModal = () => {
    setPdfModalOpen(false)
    // keep url for now; you can clear it if needed
  }

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${BASE_URL}/api/audios/${params.id}`,
          { credentials: 'include' }
        )
        const data = await response.json()
        if (data.success) {
          setAudio(data.data)
          setDisplayThumb(data.data?.imageUrl || data.data?.image || null)
        }
      } catch (error) {
        console.error('Error fetching audio:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) fetchAudio()
  }, [params.id])

  // no YouTube thumbnail probing — only use provided imageUrl

  // helper to toggle task panels
  const toggleTask = (idx) => {
    setOpenTasks(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Do not block rendering with a full-screen loader.
  // Show "Video not found" only after loading completes and no data returned.
  const showNotFound = !loading && !audio

  const audioSrc = audio?.audioRef
  const thumb = displayThumb || audio?.imageUrl || audio?.image

  return (
    <div className="bg-background">
      {/* Header Section - Title and Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-row items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {audio?.title || 'Loading...'}
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

      {/* Show not-found message if appropriate */}
      {showNotFound && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Audio not found</p>
        </div>
      )}

      {/* Proceed to render page even while loading; conditional pieces will handle missing data */}
      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          {thumb ? (
            <Image
              src={thumb}
              alt={audio?.title || 'ESL Audio'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description Section */}
      {audio?.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {audio.description}
          </p>
        </div>
      )}

      {/* Preparation exercise (show when audio.pdf exists) */}
      {audio?.pdf && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border rounded-md overflow-hidden mb-2">
            <button
              onClick={() => setPrepOpen(p => !p)}
              className="w-full flex items-center justify-between px-6 py-5 bg-card"
            >
              <span className="font-semibold text-foreground">Preparation exercise</span>
              <span className="text-muted-foreground">
                {prepOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {prepOpen && (
                <motion.div
                  key="prep"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
                  className="overflow-hidden border-t bg-background"
                >
                  <div className="px-6 py-4">
                    <div className="w-fit">
                      <div className="flex items-center justify-between gap-6 p-4 border rounded-md bg-card">
                        <div className="flex items-center gap-3">
                          <FileTextIcon className="w-6 h-6 text-primary" />
                          <div>
                            <div className="font-semibold text-foreground">Preparation PDF</div>
                            <div className="text-sm text-muted-foreground">
                              {(() => { try { return decodeURIComponent(new URL(audio.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' } })()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="cursor-pointer" onClick={() => openPdfModal(audio.pdf)}>
                            <ExternalLinkIcon className="w-4 h-4" /> Open
                          </Button>
                          <a href={audio.pdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">
                              <ExternalLink />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Audio Player Section (always below prep) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <div className="w-full rounded-lg overflow-hidden border">
          {audioSrc ? (
            <div className="p-6 bg-card rounded">
              <audio controls src={audioSrc} className="w-full">
                Your browser does not support the audio element. <a href={audioSrc} target="_blank" rel="noreferrer">Open audio</a>
              </audio>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-muted-foreground">Audio file is not available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transcript + Tasks + Language level section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Transcript */}
        {audio?.transcript && (
          <div className="border rounded-md overflow-hidden">
            <button
              onClick={() => setTranscriptOpen(s => !s)}
              className="w-full flex items-center justify-between px-6 py-5 bg-card"
            >
              <span className="font-semibold text-foreground">Transcript</span>
              <span className="text-muted-foreground">
                {transcriptOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {transcriptOpen && (
                <motion.div
                  key="transcript"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden border-t bg-background"
                >
                  <div className="px-6 py-4">
                    <div className="text-foreground whitespace-pre-wrap leading-relaxed">{audio.transcript}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Tasks (render stacked full-width boxes) */}
        {Array.isArray(audio?.tasks) && audio.tasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {audio.tasks.map((task, idx) => {
              const taskPdf = task?.pdf || audio?.pdf || null;
              return (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleTask(idx)}
                    className="w-full flex items-center justify-between px-4 py-5 bg-card"
                  >
                    <span className="font-medium text-foreground">Task {idx + 1}</span>
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
                            <div className="mt-3 mx-auto max-w-3xl">
                              <div className="flex items-center justify-between gap-4 p-3 border rounded-md bg-card">
                                <div className="flex items-center gap-3">
                                  <FileTextIcon className="w-5 h-5 text-primary" />
                                  <div>
                                    <div className="font-medium">Task PDF</div>
                                    <div className="text-sm text-muted-foreground">{(() => { try { return decodeURIComponent(new URL(taskPdf).pathname.split('/').pop()) } catch { return 'resource.pdf' } })()}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button onClick={() => openPdfModal(taskPdf)} className="cursor-pointer"><ExternalLinkIcon className="w-4 h-4" /> Open</Button>
                                  <a href={taskPdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">Open in new tab</a>
                                </div>
                              </div>
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
        ) : audio?.pdf ? (
          // No explicit tasks — show single Task 1 using audio.pdf
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleTask(0)}
                className="w-full flex items-center justify-between px-4 py-5 bg-card"
              >
                <span className="font-medium text-foreground">Task 1</span>
                <span className="text-muted-foreground">
                  {openTasks[0] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openTasks[0] && (
                  <motion.div
                    key="task-0"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
                    className="overflow-hidden border-t bg-background"
                  >
                    <div className="px-4 py-3">
                      <div className="text-sm text-foreground leading-relaxed">{/* no task content */}</div>
                      <div className="mt-3 w-fit">
                        <div className="flex items-center justify-between gap-6 p-3 border rounded-md bg-card">
                          <div className="flex items-center gap-3">
                            <FileTextIcon className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Task PDF</div>
                              <div className="text-sm text-muted-foreground">{(() => { try { return decodeURIComponent(new URL(audio.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' } })()}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button onClick={() => openPdfModal(audio.pdf)} className="cursor-pointer"><ExternalLinkIcon className="w-4 h-4" /> Open</Button>
                            <a href={audio.pdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2"><ExternalLink /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : null }

        {/* Language Level — accept string or array and render when present */}
        {(() => {
          const levels = Array.isArray(audio?.level) ? audio.level : (audio?.level ? [audio.level] : []);
          if (!levels.length) return null;
          return (
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Language Level</h3>
              <div className="p-6 rounded-md">
                <div className="flex flex-wrap gap-3">
                  {levels.map((lvl, i) => (
                    <Link key={`lvl-${i}`} href={`/levels/${String(lvl).toLowerCase().split(' ')[0]}`} className="px-4 py-3 bg-primary/90 border border-primary/30 text-base font-semibold text-white rounded" title={lvl}>
                      {lvl}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* CTA Section */}
      <SingleSourceCTA />

      {/* PDF Modal */}
      <AnimatePresence>
        {pdfModalOpen && pdfModalUrl && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[90%] md:w-[80%] lg:w-[70%] bg-background rounded shadow-lg overflow-hidden"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ duration: ANIM_DURATION }}
            >
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-3">
                  <FileTextIcon className="w-6 h-6 text-primary" />
                  <div className="font-semibold">{(() => {
                    try { return decodeURIComponent(new URL(pdfModalUrl).pathname.split('/').pop()) } catch { return 'document.pdf' }
                  })()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={pdfModalUrl} target="_blank" rel="noreferrer" className="px-3 py-1 text-sm text-muted-foreground">Open in new tab</a>
                  <button className="p-2" onClick={closePdfModal}><XIcon className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="px-6 py-3 text-sm text-muted-foreground border-b">
                Note: if the PDF does not load, you can open it in a new tab using the button on the right.
              </div>
              <div className="w-full h-[70vh]">
                <iframe src={pdfModalUrl} className="w-full h-full border-0" title="PDF preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
     </div>

 )
}

export default SingleAudioB2