import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

function TruncatedText({ text, maxLength = 120 }) {
  const [expanded, setExpanded] = useState(false)
  if (!text) return null
  const isLong = text.length > maxLength
  return (
    <div className="text-xs text-muted-foreground mb-1">
      {expanded || !isLong ? text : text?.slice(0, maxLength) + '...'}
      {isLong && (
        <button
          type="button"
          className="ml-1 underline text-gray-800 cursor-pointer focus:outline-none"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export function AudioRow({ audio, isLast, lastAudioRef, user, onEdit, onDelete }) {
  return (
    <div
      key={audio.id}
      ref={isLast ? lastAudioRef : null}
      className="group flex flex-col gap-2 py-4 px-2"
    >
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-semibold text-base truncate max-w-xs block">{audio.title}</span>
        {audio.pdfRef && (
          <a href={audio.pdfRef} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline ml-2">PDF</a>
        )}
      </div>
      <TruncatedText text={audio.content} />
      {audio.transcript && (
        <div className="text-xs text-muted-foreground mb-1">
          <span className="font-bold text-gray-700">Transcript:</span>{' '}
          <TruncatedText text={audio.transcript} />
        </div>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
        {audio.author && <span>By {audio.author.name}</span>}
        {audio.createdAt && <span>{new Date(audio.createdAt).toLocaleDateString()}</span>}
      </div>
      {audio.audioRef && (
        <audio controls className="w-full">
          <source src={audio.audioRef} />
          Your browser does not support the audio element.
        </audio>
      )}
      {user?.role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" onClick={() => onEdit(audio)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(audio)}>Delete</Button>
        </div>
      )}
    </div>
  )
}
