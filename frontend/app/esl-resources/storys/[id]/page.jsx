'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import SingleSourceCTA from '@/components/esl-resources/SingleSourceCTA'

const SingleStoryPage = () => {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/blogs/${params.id}`,
          { credentials: 'include' }
        )
        const data = await response.json()

        if (data.success) {
          setStory(data.data)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={story.imageRef || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description Section */}
      {story.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {story.description}
          </p>
        </div>
      )}

      {/* Reading Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Reading Text
          </h2>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {story.content || 'No content available.'}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <SingleSourceCTA />
    </div>
  )
}

export default SingleStoryPage