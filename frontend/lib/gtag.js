// lib/gtag.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const pageview = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return

  const isLocalhost = window.location.hostname === 'localhost'

  // Config for GA
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: document.title || url,
    // Only mark traffic_type on live domain
    ...(isLocalhost ? {} : { traffic_type: 'internal' })
  })

  // Also send page_view event
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: document.title || url,
    ...(isLocalhost ? {} : { traffic_type: 'internal' })
  })
}

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
