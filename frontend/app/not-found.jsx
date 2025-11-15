'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground px-4">
      <div className="text-[7rem] font-extrabold text-primary drop-shadow mb-2 select-none">404</div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8 text-center max-w-xl">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/seach" className="inline-block">
        <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-accent transition">
          go to search
        </button>
      </Link>
    </div>
  )
}
