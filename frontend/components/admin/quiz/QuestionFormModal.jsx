'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import BASE_URL from '@/app/config/url'
import { Loader2 } from 'lucide-react'

const questionSchema = z.object({
  sectionId: z.coerce.number().min(1, 'Section is required'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], { required_error: 'Level is required' }),
  text: z.string().min(1, 'Question text is required').max(1000, 'Max 1000 characters'),
  optionA: z.string().min(1, 'Option A is required').max(500, 'Max 500 characters'),
  optionB: z.string().min(1, 'Option B is required').max(500, 'Max 500 characters'),
  optionC: z.string().min(1, 'Option C is required').max(500, 'Max 500 characters'),
  optionD: z.string().min(1, 'Option D is required').max(500, 'Max 500 characters'),
  correctAnswer: z.coerce.number().min(0, 'Must be 0-3').max(3, 'Must be 0-3'),
  displayOrder: z.coerce.number().min(0, 'Must be 0 or greater').optional(),
  isActive: z.boolean()
})

export default function QuestionFormModal({ open, onClose, question, sections, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      sectionId: '',
      level: 'A1',
      text: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0,
      displayOrder: 0,
      isActive: true
    }
  })

  const isActive = watch('isActive')
  const level = watch('level')
  const sectionId = watch('sectionId')

  useEffect(() => {
    if (question) {
      reset({
        sectionId: question.sectionId || '',
        level: question.level || 'A1',
        text: question.text || '',
        optionA: question.optionA || '',
        optionB: question.optionB || '',
        optionC: question.optionC || '',
        optionD: question.optionD || '',
        correctAnswer: question.correctAnswer ?? 0,
        displayOrder: question.displayOrder || 0,
        isActive: question.isActive ?? true
      })
    } else {
      reset({
        sectionId: sections[0]?.id || '',
        level: 'A1',
        text: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 0,
        displayOrder: 0,
        isActive: true
      })
    }
  }, [question, sections, reset])

  const onSubmit = async (values) => {
    try {
      const url = question
        ? `${BASE_URL}/api/admin/quiz/questions/${question.id}`
        : `${BASE_URL}/api/admin/quiz/questions`
      const method = question ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values)
      })

      const data = await res.json()
      if (data.success) {
        toast.success(question ? 'Question updated successfully' : 'Question created successfully')
        onSave()
      } else {
        toast.error(data.message || 'Operation failed')
      }
    } catch (error) {
      console.error(error)
      toast.error('Operation failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question ? 'Edit Question' : 'Create Question'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sectionId">Section *</Label>
              <Select value={sectionId?.toString()} onValueChange={(v) => setValue('sectionId', parseInt(v))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(s => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sectionId && <p className="text-sm text-destructive mt-1">{errors.sectionId.message}</p>}
            </div>

            <div>
              <Label htmlFor="level">Level *</Label>
              <Select value={level} onValueChange={(v) => setValue('level', v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="C1">C1</SelectItem>
                  <SelectItem value="C2">C2</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && <p className="text-sm text-destructive mt-1">{errors.level.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="text">Question Text *</Label>
            <Input
              id="text"
              placeholder="Enter the question text (use ______ for blanks)"
              {...register('text')}
              className="mt-1"
            />
            {errors.text && <p className="text-sm text-destructive mt-1">{errors.text.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="optionA">Option A *</Label>
              <Input id="optionA" {...register('optionA')} className="mt-1" />
              {errors.optionA && <p className="text-sm text-destructive mt-1">{errors.optionA.message}</p>}
            </div>
            <div>
              <Label htmlFor="optionB">Option B *</Label>
              <Input id="optionB" {...register('optionB')} className="mt-1" />
              {errors.optionB && <p className="text-sm text-destructive mt-1">{errors.optionB.message}</p>}
            </div>
            <div>
              <Label htmlFor="optionC">Option C *</Label>
              <Input id="optionC" {...register('optionC')} className="mt-1" />
              {errors.optionC && <p className="text-sm text-destructive mt-1">{errors.optionC.message}</p>}
            </div>
            <div>
              <Label htmlFor="optionD">Option D *</Label>
              <Input id="optionD" {...register('optionD')} className="mt-1" />
              {errors.optionD && <p className="text-sm text-destructive mt-1">{errors.optionD.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="correctAnswer">Correct Answer *</Label>
              <Select value={watch('correctAnswer')?.toString()} onValueChange={(v) => setValue('correctAnswer', parseInt(v))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">A</SelectItem>
                  <SelectItem value="1">B</SelectItem>
                  <SelectItem value="2">C</SelectItem>
                  <SelectItem value="3">D</SelectItem>
                </SelectContent>
              </Select>
              {errors.correctAnswer && <p className="text-sm text-destructive mt-1">{errors.correctAnswer.message}</p>}
            </div>

            <div>
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input id="displayOrder" type="number" {...register('displayOrder')} className="mt-1" />
              {errors.displayOrder && <p className="text-sm text-destructive mt-1">{errors.displayOrder.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="isActive">Status *</Label>
            <Select value={isActive ? 'active' : 'inactive'} onValueChange={(v) => setValue('isActive', v === 'active')}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                question ? 'Update Question' : 'Create Question'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
