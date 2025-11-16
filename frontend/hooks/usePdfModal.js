'use client'

import { useState } from 'react'

/**
 * Custom hook to manage PDF modal state
 * @returns {Object} { isOpen, pdfUrl, title, openPdf, closePdf }
 */
export function usePdfModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [title, setTitle] = useState(null)

  const openPdf = (url, modalTitle = null) => {
    setPdfUrl(url)
    setTitle(modalTitle)
    setIsOpen(true)
  }

  const closePdf = () => {
    setIsOpen(false)
    setPdfUrl(null)
    setTitle(null)
  }

  return {
    isOpen,
    pdfUrl,
    title,
    openPdf,
    closePdf
  }
}
