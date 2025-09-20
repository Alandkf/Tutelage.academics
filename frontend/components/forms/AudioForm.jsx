import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AudioForm({ initialValues = {}, mode = 'create', onSuccess, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [content, setContent] = useState(initialValues?.content || '')
  const [transcript, setTranscript] = useState(initialValues?.transcript || '')
  const [audioRef, setAudioRef] = useState(initialValues?.audioRef || '')
  const [pdfRef, setPdfRef] = useState(initialValues?.pdfRef || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSuccess({ title, content, transcript, audioRef, pdfRef })
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
        <Input value={content} onChange={e => setContent(e.target.value)} maxLength={5000} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Transcript</label>
        <Input value={transcript} onChange={e => setTranscript(e.target.value)} maxLength={10000} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Audio URL</label>
        <Input value={audioRef} onChange={e => setAudioRef(e.target.value)} required maxLength={500} placeholder="https://..." />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">PDF URL</label>
        <Input value={pdfRef} onChange={e => setPdfRef(e.target.value)} maxLength={500} placeholder="https://..." />
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
