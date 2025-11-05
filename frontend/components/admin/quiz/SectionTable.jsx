'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SectionTable({ sections, onEdit, onDelete }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState(null)

  const handleDeleteClick = (section) => {
    setSectionToDelete(section)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (sectionToDelete) {
      onDelete(sectionToDelete.id)
      setDeleteDialogOpen(false)
      setSectionToDelete(null)
    }
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Quiz Limit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Stored Questions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Display Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sections.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
                    No sections found. Create your first section to get started.
                  </td>
                </tr>
              ) : (
                sections.map((section) => (
                  <tr key={section.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{section.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{section.slug}</td>
                    <td className="px-4 py-3 text-sm text-primary font-semibold">{section.questionCount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {section.currentQuestionCount || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{section.displayOrder}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        section.isActive
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {section.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEdit(section)}
                          className="cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteClick(section)}
                          className="cursor-pointer text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the section <strong>"{sectionToDelete?.name}"</strong>.
              <br />
              <br />
              <span className="text-destructive font-semibold">
                ⚠️ All questions in this section ({sectionToDelete?.currentQuestionCount || 0}) will also be deleted.
              </span>
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
