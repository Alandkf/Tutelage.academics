'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'

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

const SingleVideo = () => {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  // chosen thumbnail to display (after probing maxres/hq)
  const [displayThumb, setDisplayThumb] = useState(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${BASE_URL}/api/esl-videos/${params.id}`,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Video not found</p>
      </div>
    )
  }

  const embedUrl = getYouTubeEmbedUrl(video.videoRef)
  // use resolved displayThumb (probed), fallback to quick extractor if needed
  const thumb = displayThumb || getYouTubeThumbnail(video.videoRef) || video.imageRef

  return (
    <div className="bg-background">
      {/* Header Section - Title and Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-row items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {video.title}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          {thumb ? (
            <Image
              src={thumb}
              alt={video.title}
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
      {video.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        </div>
      )}

      {/* Video Player Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {embedUrl ? (
            <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
              <iframe
                src={embedUrl}
                title={video.title || 'ESL Video'}
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

      {/* CTA Section */}
      <SingleSourceCTA />
    </div>
  )
}

export default SingleVideo