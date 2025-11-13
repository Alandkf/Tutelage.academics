const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')
const youtubedl = require('youtube-dl-exec')

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

// Helper: pick audio-only format from yt-dlp JSON
function pickBestAudioFromYtDlp(formats = []) {
  const audioOnly = formats.filter(f => (
    (f.vcodec === 'none' || f.video_ext === 'none') && !!f.url
  ))
  if (audioOnly.length === 0) return null
  // Prefer higher abr (audio bitrate) falling back to tbr (total bitrate)
  return audioOnly.sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0))[0]
}

// GET /api/youtube-audio/resolve?url=...
router.get('/resolve', async (req, res) => {
  const url = req.query.url
  if (!url || !isYouTubeUrl(url)) {
    return res.status(400).json({ success: false, message: 'Provide a valid YouTube URL via url query param.' })
  }

  try {
    // Provide explicit request headers to improve reliability against YouTube restrictions
    const UA = process.env.YTDL_USER_AGENT ||
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': UA,
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }
    })
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
        source: 'ytdl-core'
      }
    })
  } catch (err) {
    console.error('YouTube resolve error (ytdl-core):', err)
    // Fallback: attempt resolution with yt-dlp via youtube-dl-exec
    try {
      const UA = process.env.YTDL_USER_AGENT ||
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

      const json = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
        format: 'bestaudio/best',
        userAgent: UA,
        referer: 'https://www.youtube.com',
      })

      const fmt = pickBestAudioFromYtDlp(json.formats || [])
      if (!fmt || !fmt.url) {
        return res.status(404).json({ success: false, message: 'No audio-only stream available for this video (yt-dlp).' })
      }

      // Derive mime and codec from yt-dlp format
      let mime = `audio/${fmt.ext || 'webm'}`
      const codec = fmt.acodec || undefined

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
          bitrate: fmt.abr || fmt.tbr || null,
          container: fmt.ext || null,
          expiresAt,
          title: json.title || null,
          videoId: json.id || null,
          source: 'yt-dlp'
        }
      })
    } catch (fallbackErr) {
      console.error('YouTube resolve error (yt-dlp fallback):', fallbackErr)
      return res.status(500).json({ success: false, message: 'Failed to resolve YouTube audio stream.' })
    }
  }
})

module.exports = router