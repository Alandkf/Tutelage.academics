import React from 'react'
import { Button } from '@/components/ui/button'

export function FaqRow({ faq, isLast, lastFaqRef, user, onEdit, onDelete }) {
  return (
    <div
      key={faq.id}
      ref={isLast ? lastFaqRef : null}
      className="group flex flex-col gap-2 py-4 px-2 border-b border-border"
    >
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-semibold text-base truncate max-w-xs block">Q: {faq.question}</span>
        {faq.category && <span className="text-xs text-secondary-foreground bg-secondary rounded px-2 py-0.5">{faq.category}</span>}
      </div>
      <div className="text-xs text-muted-foreground mb-1">
        <span className="font-bold text-gray-700">A:</span> {faq.answer}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
        {faq.orderNumber !== undefined && faq.orderNumber !== null && <span>Order: {faq.orderNumber}</span>}
      </div>
      {user?.role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" onClick={() => onEdit(faq)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(faq)}>Delete</Button>
        </div>
      )}
    </div>
  )
}
