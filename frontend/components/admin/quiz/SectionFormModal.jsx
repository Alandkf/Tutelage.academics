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

const sectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Max 100 characters'),
  slug: z.string().min(1, 'Slug is required').max(50, 'Max 50 characters').regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  questionCount: z.coerce.number().min(1, 'Must be at least 1').max(100, 'Max 100 questions per section'),
  displayOrder: z.coerce.number().min(0, 'Must be 0 or greater'),
  isActive: z.boolean()
})

export default function SectionFormModal({ open, onClose, section, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      questionCount: 10,
      displayOrder: 0,
      isActive: true
    }
  })

  const isActive = watch('isActive')

  useEffect(() => {
    if (section) {
      reset({
        name: section.name || '',
        slug: section.slug || '',
        description: section.description || '',
        questionCount: section.questionCount || 10,
        displayOrder: section.displayOrder || 0,
        isActive: section.isActive ?? true
      })
    } else {
      reset({
        name: '',
        slug: '',
        description: '',
        questionCount: 10,
        displayOrder: 0,
        isActive: true
      })
    }
  }, [section, reset])

  const onSubmit = async (values) => {
    try {
      const url = section
        ? `${BASE_URL}/api/admin/quiz/sections/${section.id}`
        : `${BASE_URL}/api/admin/quiz/sections`
      const method = section ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values)
      })

      const data = await res.json()
      if (data.success) {
        toast.success(section ? 'Section updated successfully' : 'Section created successfully')
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section ? 'Edit Section' : 'Create Section'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Section Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Grammar"
              {...register('name')}
              className="mt-1"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              placeholder="e.g., grammar"
              {...register('slug')}
              className="mt-1"
            />
            {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Optional section description"
              {...register('description')}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="questionCount">Question Limit *</Label>
            <Input
              id="questionCount"
              type="number"
              {...register('questionCount')}
              className="mt-1"
            />
            {errors.questionCount && <p className="text-sm text-destructive mt-1">{errors.questionCount.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              <strong>Quiz limit:</strong> How many questions from this section will appear in the quiz (you can store unlimited questions)
            </p>
          </div>

          <div>
            <Label htmlFor="displayOrder">Display Order *</Label>
            <Input
              id="displayOrder"
              type="number"
              {...register('displayOrder')}
              className="mt-1"
            />
            {errors.displayOrder && <p className="text-sm text-destructive mt-1">{errors.displayOrder.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">Lower values appear first</p>
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
                section ? 'Update Section' : 'Create Section'
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
