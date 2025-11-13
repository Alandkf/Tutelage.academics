'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload } from 'lucide-react'

const LEVEL_OPTIONS = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Pre-intermediate' },
  { value: 'b1', label: 'B1 Intermediate' },
  { value: 'b2', label: 'B2 Upper-Intermediate' },
  { value: 'c1', label: 'C1 Advanced' },
  { value: 'c2', label: 'C2 Proficient' }
]

const AudioForm = ({ mode = 'create', initialValues = null, onSuccess, onCancel }) => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    imageUrl: '',
    transcript: '',
    audioRef: '',
    level: '',
    pdfFile: null,
    taskPdfFile: null
  })
  const [pdfPreview, setPdfPreview] = useState(null)
  const [taskPdfPreview, setTaskPdfPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      setValues(prev => ({
        ...prev,
        title: initialValues.title || '',
        description: initialValues.description || '',
        imageUrl: initialValues.imageUrl || initialValues.image || '',
        transcript: initialValues.transcript || '',
        audioRef: initialValues.audioRef || '',
        level: Array.isArray(initialValues.level) ? (initialValues.level[0]?.toLowerCase().split(' ')[0] || '') : (initialValues.level ? String(initialValues.level).toLowerCase().split(' ')[0] : ''),
        // keep pdfFile/taskPdfFile null in form — previews used instead
      }))
      setPdfPreview(initialValues.pdf || null)
      setTaskPdfPreview(initialValues.taskPdf || null)
    }
  }, [mode, initialValues])

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0] ?? null
    setValues(prev => ({ ...prev, [field]: file }))
    if (field === 'pdfFile') setPdfPreview(file ? file.name : null)
    if (field === 'taskPdfFile') setTaskPdfPreview(file ? file.name : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Return a plain object to the parent. Parent (admin page) will decide to send FormData or JSON.
      const payload = {
        title: values.title,
        description: values.description,
        imageUrl: values.imageUrl,
        transcript: values.transcript,
        audioRef: values.audioRef,
        level: values.level,
        pdfFile: values.pdfFile || null,
        taskPdfFile: values.taskPdfFile || null
      }
      await onSuccess(payload)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" value={values.title} onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={values.description} onChange={(e) => setValues(v => ({ ...v, description: e.target.value }))} rows={3} />
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" value={values.imageUrl} onChange={(e) => setValues(v => ({ ...v, imageUrl: e.target.value }))} placeholder="https://..." />
        </div>

        <div>
          <Label htmlFor="transcript">Transcript</Label>
          <Textarea id="transcript" value={values.transcript} onChange={(e) => setValues(v => ({ ...v, transcript: e.target.value }))} rows={8} />
        </div>

        <div>
          <Label htmlFor="audioRef">Audio Reference (URL) *</Label>
          <Input id="audioRef" value={values.audioRef} onChange={(e) => setValues(v => ({ ...v, audioRef: e.target.value }))} placeholder="https://youtu.be/..., or mp3 url" required />
        </div>

        <div>
          <Label htmlFor="level">Level</Label>
          <Select value={values.level} onValueChange={(val) => setValues(v => ({ ...v, level: val }))}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              {LEVEL_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>PDF File (optional)</Label>
          <div className="flex items-center gap-2">
            <input id="pdfFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pdfFile')} className="hidden" />
            <Button type="button" variant="outline" onClick={() => document.getElementById('pdfFile').click()} className="gap-2">
              <Upload className="h-4 w-4" />Choose PDF
            </Button>
            {pdfPreview && <span className="text-sm text-muted-foreground">{pdfPreview}</span>}
          </div>
        </div>

        <div>
          <Label>Task PDF File (optional)</Label>
          <div className="flex items-center gap-2">
            <input id="taskPdfFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'taskPdfFile')} className="hidden" />
            <Button type="button" variant="outline" onClick={() => document.getElementById('taskPdfFile').click()} className="gap-2">
              <Upload className="h-4 w-4" />Choose Task PDF
            </Button>
            {taskPdfPreview && <span className="text-sm text-muted-foreground">{taskPdfPreview}</span>}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </div>
  )
}

export default AudioForm
