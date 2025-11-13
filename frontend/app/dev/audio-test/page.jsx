'use client'

import { useState } from 'react'
import CompactAudioPlayer from '@/components/players/CompactAudioPlayer'

export default function AudioTestPage() {
  const [url, setUrl] = useState('')
  const [resolveError, setResolveError] = useState(null)
  const [resolvedMeta, setResolvedMeta] = useState(null)

  // Fallback: derive YouTube embed URL when audio-only resolution fails
  const isYouTubeUrl = (u) => {
    if (!u) return false
    try {
      const host = new URL(u).hostname.toLowerCase()
      return host.includes('youtube.com') || host.includes('youtu.be') || host.includes('youtube-nocookie.com')
    } catch {
      return false
    }
  }

  const extractVideoId = (u) => {
    try {
      const parsed = new URL(u)
      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.replace('/', '')
      }
      if (parsed.searchParams.has('v')) {
        return parsed.searchParams.get('v')
      }
      const match = parsed.pathname.match(/\/embed\/([\w-]+)/)
      return match ? match[1] : null
    } catch {
      return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">YouTube Audio Test</h1>
        <p className="text-muted-foreground">
          Paste a YouTube video URL below and play the audio-only stream resolved via the backend.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 border rounded-md px-3 py-2 bg-card"
          />
        </div>

        <div className="border rounded-md">
          <CompactAudioPlayer
            src={null}
            youtubeUrl={url}
            onResolveSuccess={(meta) => { setResolvedMeta(meta); setResolveError(null) }}
            onResolveError={(msg) => { setResolveError(msg); setResolvedMeta(null) }}
          />
        </div>

        {/* Fallback embed if audio-only resolution fails or is not supported */}
        {isYouTubeUrl(url) && resolveError && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">
              Fallback: using YouTube embed if audio-only resolution fails.
            </p>
            {extractVideoId(url) ? (
              <div className="aspect-video w-full">
                <iframe
                  title="YouTube fallback"
                  className="w-full h-full rounded-md border"
                  src={`https://www.youtube.com/embed/${extractVideoId(url)}?autoplay=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline"
              >
                Open on YouTube
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}