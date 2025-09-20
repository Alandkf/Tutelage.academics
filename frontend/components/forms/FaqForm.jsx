import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function FaqForm({ initialValues = {}, mode = 'create', onSuccess, onCancel }) {
  const [question, setQuestion] = useState(initialValues?.question || '')
  const [answer, setAnswer] = useState(initialValues?.answer || '')
  const [orderNumber, setOrderNumber] = useState(initialValues?.orderNumber || '')
  const [category, setCategory] = useState(initialValues?.category || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSuccess({ question, answer, orderNumber, category })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Question</label>
        <Input value={question} onChange={e => setQuestion(e.target.value)} required maxLength={500} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Answer</label>
        <Input value={answer} onChange={e => setAnswer(e.target.value)} required maxLength={5000} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Order Number</label>
        <Input type="number" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} min={0} />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Category</label>
        <Input value={category} onChange={e => setCategory(e.target.value)} maxLength={120} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? (mode === 'edit' ? 'Saving...' : 'Creating...') : (mode === 'edit' ? 'Save Changes' : 'Create FAQ')}
        </Button>
      </div>
    </form>
  )
}
