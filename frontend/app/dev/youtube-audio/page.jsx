"use client"

import YouTubeAudioPlayer from "@/components/players/YouTubeAudioPlayer"

export default function DevYouTubeAudioPage() {
  // Example video: replace with your own ID or URL
  const videoId = "dQw4w9WgXcQ"

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>YouTube Audio-Only Player (Dev)</h1>
      <p style={{ marginBottom: 16, color: "#555" }}>
        This demo uses the official YouTube IFrame API. The video element is hidden, and custom controls
        drive playback. No server-side audio URL extraction is used.
      </p>
      <YouTubeAudioPlayer videoId={videoId} />
    </div>
  )
}