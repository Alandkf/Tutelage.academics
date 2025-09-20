import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function VideoForm({ initialValues = {}, mode = 'create', onSuccess, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [videoRef, setVideoRef] = useState(initialValues?.videoRef || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSuccess({ title, videoRef, description })
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
        <label className="block mb-1 text-sm font-medium">Video URL</label>
        <Input value={videoRef} onChange={e => setVideoRef(e.target.value)} required maxLength={500} placeholder="https://..." />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} maxLength={5000} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Create Video')}
        </Button>
      </div>
    </form>
  )
}
