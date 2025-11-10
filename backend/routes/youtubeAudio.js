const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

// Helper: basic check for YouTube URLs
function isYouTubeUrl(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.toLowerCase()
    return (
      host.includes('youtube.com') ||
      host.includes('youtu.be') ||
      host.includes('youtube-nocookie.com')
    )
  } catch {
    return false
  }
}

// Helper: pick highest-bitrate audio-only format
function pickBestAudioFormat(formats) {
  const audioOnly = formats.filter(f => f.hasAudio && !f.hasVideo)
  if (audioOnly.length === 0) return null
  return audioOnly.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0]
}

// GET /api/youtube-audio/resolve?url=...
router.get('/resolve', async (req, res) => {
  const url = req.query.url
  if (!url || !isYouTubeUrl(url)) {
    return res.status(400).json({ success: false, message: 'Provide a valid YouTube URL via url query param.' })
  }

  try {
    const info = await ytdl.getInfo(url)
    const fmt = pickBestAudioFormat(info.formats)
    if (!fmt || !fmt.url) {
      return res.status(404).json({ success: false, message: 'No audio-only stream available for this video.' })
    }

    // Derive mime and codec
    let mime = 'audio/webm'
    let codec = undefined
    if (fmt.mimeType) {
      const parts = fmt.mimeType.split(';')
      mime = (parts[0] || mime).trim()
      const codecPart = parts[1] || ''
      const match = codecPart.match(/codecs\s*=\s*"?([^";]+)"?/i)
      if (match && match[1]) codec = match[1]
    }

    // Attempt to parse expiry from the googlevideo URL
    let expiresAt = null
    try {
      const u = new URL(fmt.url)
      const expire = u.searchParams.get('expire')
      if (expire) {
        const ts = parseInt(expire, 10)
        if (!Number.isNaN(ts)) {
          expiresAt = new Date(ts * 1000).toISOString()
        }
      }
    } catch {}

    return res.json({
      success: true,
      data: {
        src: fmt.url,
        mime,
        codec,
        bitrate: fmt.audioBitrate || null,
        container: fmt.container || null,
        expiresAt,
        title: info.videoDetails?.title || null,
        videoId: info.videoDetails?.videoId || null,
      }
    })
  } catch (err) {
    console.error('YouTube resolve error:', err)
    return res.status(500).json({ success: false, message: 'Failed to resolve YouTube audio stream.' })
  }
})

module.exports = router