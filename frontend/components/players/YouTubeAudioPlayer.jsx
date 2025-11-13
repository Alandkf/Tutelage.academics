"use client"

import { useEffect, useRef, useState } from "react"

// Extract YouTube videoId from common URL shapes
function extractVideoId(input) {
  if (!input) return null
  try {
    // If a raw id is supplied
    if (/^[a-zA-Z0-9_-]{6,}$/.test(input)) return input
    const u = new URL(input)
    const host = u.hostname.toLowerCase()
    if (host.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null
    }
    if (host.includes("youtube.com")) {
      const v = u.searchParams.get("v")
      if (v) return v
      // shorts/<id> or embed/<id>
      const parts = u.pathname.split("/").filter(Boolean)
      const idx = parts.findIndex(p => ["shorts", "embed", "live"].includes(p))
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1]
    }
    return null
  } catch {
    return null
  }
}

// Load YouTube IFrame API once and return a promise when ready
let ytApiPromise = null
function loadYouTubeIframeAPI() {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"))
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.head.appendChild(tag)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev()
      resolve(window.YT)
    }
  })
  return ytApiPromise
}

export default function YouTubeAudioPlayer({ videoId, videoUrl, initialVolume = 60 }) {
  const resolvedId = videoId || extractVideoId(videoUrl)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [volume, setVolume] = useState(initialVolume)

  useEffect(() => {
    let intervalId = null
    let destroyed = false

    async function setup() {
      if (!resolvedId) return
      const YT = await loadYouTubeIframeAPI()
      if (!YT || destroyed) return

      playerRef.current = new YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: resolvedId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setReady(true)
            try { playerRef.current.setVolume(volume) } catch {}
            setDuration(playerRef.current.getDuration() || 0)
          },
          onStateChange: (e) => {
            const state = e?.data
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            setPlaying(state === 1)
            setDuration(playerRef.current.getDuration() || 0)
          },
        },
      })

      intervalId = window.setInterval(() => {
        try {
          const t = playerRef.current?.getCurrentTime?.() || 0
          setCurrent(t)
        } catch {}
      }, 500)
    }

    setup()

    return () => {
      destroyed = true
      if (intervalId) window.clearInterval(intervalId)
      try {
        playerRef.current?.destroy?.()
      } catch {}
    }
  }, [resolvedId])

  function togglePlay() {
    if (!ready || !playerRef.current) return
    try {
      if (playing) playerRef.current.pauseVideo()
      else playerRef.current.playVideo()
    } catch {}
  }

  function onSeek(pct) {
    if (!ready || !playerRef.current || !duration) return
    const target = Math.max(0, Math.min(duration, duration * pct))
    try { playerRef.current.seekTo(target, true) } catch {}
    setCurrent(target)
  }

  function onVolume(v) {
    const vol = Math.max(0, Math.min(100, v))
    setVolume(vol)
    try { playerRef.current?.setVolume?.(vol) } catch {}
  }

  const pct = duration ? current / duration : 0

  return (
    <div className="yt-audio-player" style={{ maxWidth: 520 }}>
      {/* Hidden/offscreen YouTube player (audio will play) */}
      <div ref={containerRef} style={{ position: "absolute", left: "-9999px", top: 0 }} />

      {/* Simple audio-like controls */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={togglePlay} disabled={!ready} style={{ padding: "6px 12px" }}>
          {playing ? "Pause" : "Play"}
        </button>
        <div style={{ flex: 1 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pct * 100)}
            onChange={(e) => onSeek(Number(e.target.value) / 100)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: 120, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>Vol</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            style={{ width: 80 }}
          />
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
        {ready ? `${Math.floor(current)}s / ${Math.floor(duration)}s` : "Loading YouTube…"}
      </div>
    </div>
  )
}