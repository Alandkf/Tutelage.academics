'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { X as XIcon, FileText as FileTextIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'
import { motion, AnimatePresence } from 'framer-motion'

// Helper: extract YouTube ID and build thumbnail/embed URLs
const parseYouTubeId = (url) => {
  if (!url) return null
  try {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/)
    return m && m[1] ? m[1] : null
  } catch {
    return null
  }
}

const getYouTubeEmbedUrl = (url) => {
  const id = parseYouTubeId(url)
  return id ? `https://www.youtube.com/embed/${id}` : null
}

const getYouTubeThumbnail = (url, preferMax = false) => {
  const id = parseYouTubeId(url)
  if (!id) return null
  return preferMax
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

const SingleVideoA2 = () => {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  // chosen thumbnail to display (after probing maxres/hq)
  const [displayThumb, setDisplayThumb] = useState(null)

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
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${BASE_URL}/api/speakings/${params.id}`,
          { credentials: 'include' }
        )
        const data = await response.json()
        if (data.success) {
          setVideo(data.data)
        }
      } catch (error) {
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) fetchVideo()
  }, [params.id])

  // Probe for the best available YouTube thumbnail after video loads
  useEffect(() => {
    if (!video) return
    // If an explicit thumbnailUrl is provided, use it immediately
    if (video.thumbnailUrl) {
      setDisplayThumb(video.thumbnailUrl)
      return
    }

    const id = parseYouTubeId(video.videoRef)
    if (!id) {
      setDisplayThumb(video.imageRef || null)
      return
    }

    let cancelled = false
    const maxUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    const hqUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`

    // Try maxres first
    const img = new window.Image()
    img.onload = () => { if (!cancelled) setDisplayThumb(maxUrl) }
    img.onerror = () => {
      // On error try hq
      const img2 = new window.Image()
      img2.onload = () => { if (!cancelled) setDisplayThumb(hqUrl) }
      img2.onerror = () => { if (!cancelled) setDisplayThumb(video.imageRef || null) }
      img2.src = hqUrl
    }
    img.src = maxUrl

    return () => { cancelled = true }
  }, [video])

  // helper to toggle task panels
  const toggleTask = (idx) => {
    setOpenTasks(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Do not block rendering with a full-screen loader.
  // Show "Video not found" only after loading completes and no data returned.
  const showNotFound = !loading && !video

  const embedUrl = getYouTubeEmbedUrl(video?.videoRef)
  const thumb = displayThumb || getYouTubeThumbnail(video?.videoRef) || video?.imageRef

  return (
    <div className="bg-background">
      {/* Header Section - Title and Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-row items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {video?.title || 'Loading...'}
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
          <p className="text-lg text-muted-foreground">Video not found</p>
        </div>
      )}

      {/* Proceed to render page even while loading; conditional pieces will handle missing data */}
      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          {thumb ? (
            <Image
              src={thumb}
              alt={video?.title || 'ESL Video'}
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
      {video?.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        </div>
      )}

      {/* Preparation Exercise (collapsible) */}
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
                  {video?.pdf ? (
                    // compact file card instead of full iframe — constrained width
                    <div className="w-fit">
                      <div className="flex items-center justify-between gap-6 p-4 border rounded-md bg-card">
                        <div className="flex items-center gap-3">
                          <FileTextIcon className="w-6 h-6 text-primary" />
                          <div>
                            <div className="font-semibold text-foreground">Preparation PDF</div>
                            <div className="text-sm text-muted-foreground">
                              {(() => {
                                try { return decodeURIComponent(new URL(video.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' }
                              })()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="cursor-pointer"
                            onClick={() => openPdfModal(video.pdf)}
                          >
                            <ExternalLinkIcon className="w-4 h-4" /> Open
                          </Button>
                          <a href={video.pdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" /><path d="M17 3h4v4" /><path d="M10 14L21 3" /></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                   ) : (
                     <p className="text-sm text-muted-foreground">No preparation PDF available.</p>
                   )}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>

      {/* Video Player Section (unchanged content, stays below prep) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {embedUrl ? (
            <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
              <iframe
                src={embedUrl}
                title={video?.title || 'ESL Video'}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-6">
              <p className="text-muted-foreground">Video URL is not embeddable.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transcript + Tasks + Language level section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Transcript */}
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
                  {video?.transcript ? (
                    <div className="text-foreground whitespace-pre-wrap leading-relaxed">{video.transcript}</div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Transcript will be added soon.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tasks (render stacked full-width boxes) */}
        <div className="grid grid-cols-1 gap-4">
          {Array.isArray(video?.tasks) && video.tasks.length > 0 ? (
            video.tasks.map((task, idx) => (
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
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={`task-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: ANIM_DURATION, ease: 'easeInOut' }}
                        className="overflow-hidden border-t bg-background"
                      >
                        <div className="px-4 py-3">
                          <div className="text-sm text-foreground leading-relaxed">
                            {task.content || 'Task details will be added here.'}
                          </div>
                          {video?.pdf && (
                            // task file-card (constrained width like prep)
                            <div className="mt-3 mx-auto max-w-3xl">
                              <div className="flex items-center justify-between gap-4 p-3 border rounded-md bg-card">
                                <div className="flex items-center gap-3">
                                  <FileTextIcon className="w-5 h-5 text-primary" />
                                  <div>
                                    <div className="font-medium">Task PDF</div>
                                    <div className="text-sm text-muted-foreground">
                                      {(() => {
                                        try { return decodeURIComponent(new URL(video.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' }
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button onClick={() => openPdfModal(video.pdf)} className="cursor-pointer">
                                    <ExternalLinkIcon className="w-4 h-4" /> Open
                                  </Button>
                                  <a href={video.pdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" /><path d="M17 3h4v4" /><path d="M10 14L21 3" /></svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                   )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            // fallback: show single task box using PDF if available
            <div className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleTask(0)}
                className="w-full flex items-center justify-between px-4 py-3 bg-card"
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
                      {video?.pdf && (
                        <div className="mt-3 w-fit">
                          <div className="flex items-center justify-between gap-6 p-3 border rounded-md bg-card">
                            <div className="flex items-center gap-3">
                              <FileTextIcon className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium">Task PDF</div>
                                <div className="text-sm text-muted-foreground">
                                  {(() => {
                                    try { return decodeURIComponent(new URL(video.pdf).pathname.split('/').pop()) } catch { return 'resource.pdf' }
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button onClick={() => openPdfModal(video.pdf)} className="cursor-pointer">
                                <ExternalLinkIcon className="w-4 h-4" /> Open
                              </Button>
                              <a href={video.pdf} target="_blank" rel="noreferrer" className="text-muted-foreground px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" /><path d="M17 3h4v4" /><path d="M10 14L21 3" /></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Language Level — bigger title and distinct boxed section at the end */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-foreground mb-6">Language Level</h3>
          <div className="p-6 rounded-md">
            <div className="flex flex-wrap gap-3">
              {(() => {
                const levels = Array.isArray(video?.level) ? video.level : (video?.level ? [video.level] : []);
                if (!levels.length) {
                  return (
                    <div className="px-4 py-3 bg-primary/90 border border-primary/30 text-lg font-semibold text-white">
                      Not specified
                    </div>
                  );
                }

                const mapToSlug = (lvl) => {
                  if (!lvl) return '/levels';
                  const key = String(lvl).toLowerCase();
                  if (key.includes('a1')) return '/levels/a1';
                  if (key.includes('a2')) return '/levels/a2';
                  if (key.includes('b1')) return '/levels/b1';
                  if (key.includes('b2')) return '/levels/b2';
                  if (key.includes('c1')) return '/levels/c1';
                  if (key.includes('c2')) return '/levels/c2';
                  // fallback to generic levels page
                  return '/levels';
                };

                return levels.map((lvl, i) => (
                  <Link key={`lvl-${i}`} href={mapToSlug(lvl)}                     
                        className="px-4 py-3 bg-primary/90 border border-primary/30 text-base font-semibold text-white rounded" title={lvl}>
                    {lvl}
                  </Link>
                ));
              })()}
            </div>
          </div>
        </div>
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

export default SingleVideoA2