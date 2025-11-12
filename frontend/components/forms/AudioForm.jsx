import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AudioForm({ initialValues = {}, mode = 'create', onSuccess, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [transcript, setTranscript] = useState(initialValues?.transcript || '')
  const [audioRef, setAudioRef] = useState(initialValues?.audioRef || '')
  const [pdf, setPdf] = useState(initialValues?.pdf || '')
  const [pdfFile, setPdfFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSuccess({ title, description, transcript, audioRef, pdf, pdfFile })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <Input value={title} onChange={e => setTitle(e.target.value)} required maxLength={250} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} maxLength={5000} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Transcript</label>
        <Input value={transcript} onChange={e => setTranscript(e.target.value)} maxLength={10000} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Audio URL (YouTube or direct)</label>
        <Input
          value={audioRef}
          onChange={e => setAudioRef(e.target.value)}
          required
          maxLength={500}
          placeholder="Paste a YouTube link or an audio URL"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          YouTube links are supported. We extract and stream audio-only, hiding all visuals.
        </p>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">PDF URL</label>
        <Input value={pdf} onChange={e => setPdf(e.target.value)} maxLength={500} placeholder="https://..." />
        <div className="mt-3">
          <label className="block mb-1 text-sm font-medium">Or upload PDF file</label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            If a file is selected, it will be uploaded to RestPDF. Otherwise, the URL above is saved.
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Create Audio')}
        </Button>
      </div>
    </form>
  )
}
