'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X as XIcon, FileText as FileTextIcon } from 'lucide-react'
import BASE_URL from '@/app/config/url'

/**
 * Reusable PDF Modal Component
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Close handler
 * @param {string} pdfUrl - Raw PDF URL to display
 * @param {string} title - Modal title (optional, defaults to extracted filename)
 * @param {number} animationDuration - Animation duration in seconds (default: 0.3)
 */
export default function PdfModal({ 
  isOpen, 
  onClose, 
  pdfUrl, 
  title = null,
  animationDuration = 0.3 
}) {
  // Proxy URL for CORS bypass
  const toPdfView = (u) => `${BASE_URL}/api/pdf/view?url=${encodeURIComponent(u)}`
  const proxiedUrl = pdfUrl ? toPdfView(pdfUrl) : null

  // Extract filename from URL for display
  const extractFilename = (url) => {
    try {
      const u = new URL(proxiedUrl || url, 'http://localhost')
      const real = new URLSearchParams(u.search).get('url') || url
      return decodeURIComponent(new URL(real).pathname.split('/').pop())
    } catch {
      return 'document.pdf'
    }
  }

  const displayTitle = title || extractFilename(pdfUrl)

  return (
    <AnimatePresence>
      {isOpen && proxiedUrl && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="w-[90%] md:w-[80%] lg:w-[70%] bg-background rounded shadow-lg overflow-hidden" 
            initial={{ y: 20, scale: 0.98, opacity: 0 }} 
            animate={{ y: 0, scale: 1, opacity: 1 }} 
            exit={{ y: 20, scale: 0.98, opacity: 0 }} 
            transition={{ duration: animationDuration }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <FileTextIcon className="w-6 h-6 text-primary" />
                <div className="font-semibold truncate max-w-md">{displayTitle}</div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={proxiedUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  Open in new tab
                </a>
                <button 
                  className="p-2 hover:bg-accent rounded transition-colors" 
                  onClick={onClose}
                  aria-label="Close"
                  type="button"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Info message */}
            <div className="px-6 py-3 text-sm text-muted-foreground border-b">
              Note: some hosts block embedding. Use "Open in new tab" if preview fails.
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[70vh]">
              <iframe 
                src={proxiedUrl} 
                className="w-full h-full border-0" 
                title="PDF preview"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
